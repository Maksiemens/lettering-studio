'use strict';

$(document).ready(function() {
  // window.open('mailto:me@http://stackoverflow.com/');
  // Popup
  var $messengerButton = $('.js-messengerButton');
  // var $calculateCostButton = $('.js-calculateCostButton');
  var $popupOverlay = $('.js-popupOverlay');
  var $popupContent = $('.js-popupContent');
  var $closeButton = $('.js-closeButton');

  $messengerButton.on('click', function() {
    $(document).on('keydown', closeByEsc);
    $popupOverlay.css('display', 'flex').hide().fadeIn();
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

  function closePopup() {
    $(document).off('keydown', closeByEsc);
    $popupOverlay.fadeOut();
  }

  function closeByEsc(event) {
    if (event.which == 27) {
      closePopup();
    }
  }

  // Hamburger
  var $hamburger = $('.js-hamburger');
  var $communication = $('.js-communication');
  $hamburger.on('click', function(event) {
    $communication.fadeToggle(150);
    $hamburger.toggleClass('is-active');
  });

  // function scrollbarWidth() {
  //   var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
  //   // Append our div, do our calculation and then remove it
  //   $('body').append(div);
  //   var w1 = $('div', div).innerWidth();
  //   div.css('overflow-y', 'scroll');
  //   var w2 = $('div', div).innerWidth();
  //   $(div).remove();
  //   return (w1 - w2);
  // }

  $(window ).on('resize', function(event) {
    var $windowWidth = $(window).width();
    if($windowWidth >= 600) {
      $communication.css('display', 'flex');
      $hamburger.removeClass('is-active');
      $hamburger.hide();
    }
    if($windowWidth <= 600) {
      $communication.css('display', 'none');
      $hamburger.removeClass('is-active');
      $hamburger.show();
    }
  });

  // FancyBox
  var $worksButton = $('.js-worksButton');
  var $fancyboxGallery = $('[data-fancybox="gallery"]');
  $worksButton.on('click', function(event) {
    $('body').addClass('full-height');
  });

  $fancyboxGallery.fancybox({
    // Options will go here
    loop: false,
    keyboard: true,
    wheel: false,
    afterClose: function(instance, slide) {
      $('body').removeClass('full-height');
    }
  });


  // Input, prevent letters
  var $formInput = $('.js-formInput');
  $formInput.on('keypress', function(event) {

    console.log('event.which ====>', event.which);
    // if ( event.which != 8 && event.which != 0 && (event.which < 46 || event.which > 57)	) {

    if ((event.which < 32 || event.which > 57) && (event.which !== 13 && event.which !== 8)) {
      return false;
    }
  });


  // AJAX
  var $form =  $('.js-form');
  var $order =  $('.js-order');
  var $loader =  $('.blind-loader');
  var $done = $('.blind-success');
	var $warning = $('.blind-error');

  $form.on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      url: 'php/sendcall.php',
      method: 'POST',
      data: $form.serialize(),

      beforeSend: function() {
        $order.addClass('blind-parent');
        $loader.fadeIn();
      },

      success: function() {
        $loader.fadeOut();
        $done.fadeIn(function() {
					setTimeout(function() {
						$done.fadeOut();
					}, 3000);
				});
      },

      complete: function() {
        $form[0].reset();

        setTimeout(function() {
          closePopup();
        }, 2000);

        setTimeout(function() {
          $order.removeClass('blind-parent');
        }, 2500);
      },

      error: function(){
        $loader.fadeOut();
        $warning.fadeIn(function() {
					setTimeout(function() {
						$warning.fadeOut();
					}, 3000);
				});
      }
    });
  });

});
