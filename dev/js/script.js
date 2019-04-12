"use strict";


if (!Element.prototype.requestFullscreen) {
  Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}

var videoDiv = document.querySelector('.js-videoDiv');
var videoBtn = videoDiv.querySelector('.js-videoButton');
videoBtn.addEventListener('click', () => {
  videoDiv.classList.add('hide-pseudo');
  videoDiv.innerHTML = '<iframe class="video__iframe" src="https://www.youtube.com/embed/98qgCnn1SfI?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  videoDiv.querySelector('.video__iframe').requestFullscreen();
});

