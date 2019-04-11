"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

//browserSync
gulp.task("browserSync", () => {
  browserSync({
    server: {
      baseDir: "./prod"
    },
    tunnel: true
  });
});

//pug
const pug = require("gulp-pug");
gulp.task("pug", () => {
  gulp
    .src("dev/pug/*.pug")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dev/html"))
    .pipe(reload({ stream: true }));
});

//html
const htmlmin = require("gulp-htmlmin");
gulp.task("html", () => {
  gulp
    .src("dev/html/*.html")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("prod"));
});

//style
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("style", () => {
  gulp
    .src("dev/style/style.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gutil.env.type === "build" ? gutil.noop() : sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(gutil.env.type === "build" ? gutil.noop() : sourcemaps.write())
    .pipe(gulp.dest("prod/css"))
    .pipe(reload({ stream: true }));
});

//js
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const obfuscator = require('gulp-javascript-obfuscator');
// для сборки в продакшен gulp --type=build

gulp.task("js", () => {
  gulp
    .src([
      "dev/libs/jquery/jquery-3.3.1.min.js",
      "dev/libs/**/*.js",
      "dev/js/*.js"
    ])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gutil.env.type === "build" ? gutil.noop() : sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("script.js"))
    .pipe(gutil.env.type === "build" ? gutil.noop() : sourcemaps.write())
    .pipe(gutil.env.type === "build" ? obfuscator({compact: true, sourceMap: false}) : gutil.noop())
    .pipe(gulp.dest("prod/js"))
    .pipe(reload({ stream: true }));
});

//image
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

const pngquant = require("imagemin-pngquant");
const optipng = require("imagemin-optipng");

const mozjpeg = require("imagemin-mozjpeg");
const jpegtran = require("imagemin-jpegtran");

const svgo = require("imagemin-svgo");

gulp.task("image", () => {
  gulp
    .src("dev/img/**/*.*")

    .pipe(
      cache(
        imagemin(
          [
            pngquant(),
            optipng({ progressive: true }),

            mozjpeg({ progressive: true }),
            jpegtran(),

            svgo({ removeViewBox: false })
          ],
          { verbose: true }
        )
      )
    )
    .pipe(gulp.dest("prod/img/"));
});

//cache clear
gulp.task("clear", () => {
  cache.clearAll();
});

//favicon
gulp.task("favicon", () => {
  gulp.src("dev/favicon/**/*.*").pipe(gulp.dest("prod/favicon/"));
});

//libs
gulp.task("libs", () => {
  gulp
    .src(["dev/libs/**/*.*", "!dev/libs/**/*.js"])
    .pipe(gulp.dest("prod/libs/"));
});

//fonts
gulp.task("fonts", () => {
  gulp.src("dev/fonts/**/*.*").pipe(gulp.dest("prod/fonts"));
});

//videos
gulp.task("video", () => {
  gulp.src("dev/video/**/*.*").pipe(gulp.dest("prod/video"));
});

// default
gulp.task("default", [
  "pug",
  "html",
  "style",
  "js",
  "image",
  "favicon",
  "fonts",
  "video",
  "libs",
  "del"
]);

gulp.task("dev", ["default", "watcher", "browserSync"]);

//watcher
gulp.task("watcher", () => {
  gulp.watch("dev/**/*.pug", ["pug"]);

  gulp.watch("dev/**/*.html", ["html"]);

  gulp.watch("dev/style/**/*.scss", ["style"]);

  gulp.watch("dev/js/**/*.js", ["js"]);

  gulp.watch("dev/img/**/*", ["image"]);

  gulp.watch("dev/favicon/**/*", ["favicon"]);

  gulp.watch("dev/fonts/**/*", ["fonts"]);

  gulp.watch("dev/video/**/*", ["video"]);
});

//clean
const clean = require("gulp-clean");
gulp.task("clean", () => {
  gulp.src("prod", { read: false }).pipe(clean());
});

//del
const del = require("del");
gulp.task("del", () => {
  del.sync("prod");
});
