'use strict';
// https://codepen.io/riogrande/pen/QEGmRL?editors=1010
// http://www.mloncarek.com/blog/css-animation-with-display-property-using-jquery-trick
// https://jonsuh.com/hamburgers/

$(document).ready(function() {

  // Popup
  var $calculateCostButton = $('.js-calculateCostButton');
  var $popupOverlay = $('.js-popupOverlay');
  var $popupContent = $('.js-popupContent');
  var $closeButton = $('.js-closeButton');

  function closePopup() {
    $popupOverlay.fadeOut();
  }

  $calculateCostButton.on('click', function() {
    $popupOverlay.fadeIn().css('display', 'flex');
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

