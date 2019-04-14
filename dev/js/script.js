"use strict";
// https://codepen.io/riogrande/pen/QEGmRL?editors=1010
// http://www.mloncarek.com/blog/css-animation-with-display-property-using-jquery-trick

$(document).ready(function() {

  //Mask
  var $formInputPhone = $('.js-formInputPhone');
  $formInputPhone.mask("+7 (000) 000 00 00", {
    placeholder: "+7 (___) ___ __ __"}
  );

  // Popup
  var $page = $('#page');
  var $videoPlayButton = $('.js-videoPlayButton');
  var $popupOverlay = $('.js-popupOverlay');
  var $popupContent = $('.js-popupContent');
  var $closeButton = $('.js-closeButton');
  var $loadIframe = $('.js-loadIframe');

  function closePopup() {
    $('.js-playIframe').prop('src', 'https://www.youtube.com/embed/MQuaMlj1rXg?autoplay=0');
    $page.removeClass('blur');
    $popupOverlay.fadeOut();
  }

  $videoPlayButton.on('click', function() {
    $page.addClass('blur');
    $popupOverlay.fadeIn();

    if( $loadIframe.has('.js-playIframe').length == 0 ) {
      $loadIframe.html('<iframe class="play__iframe js-playIframe" src="https://www.youtube.com/embed/MQuaMlj1rXg?autoplay=1" allowfullscreen></iframe>');
    }
    else {
      var $playIframeVideoURL = $('.js-playIframe').prop('src').replace("?autoplay=0", "?autoplay=1");
      $('.js-playIframe').prop('src', $playIframeVideoURL);
    }
  });

  $closeButton.on('click', function() {
    closePopup();
  });

  $popupOverlay.on('click', function() {
    closePopup();
  });

  $popupContent.on('click', function() {
    event.stopPropagation();
  });
});

