(function() {
  //main vars
  var $mainHeader = $('.mainHeader'),
    mainHeaderPosY = $mainHeader.offset().top,
    $scrollDownBtn = $('button.scrollDown'),
    $topLogo = $('.topLogo');


  //scroll (might need to debounce)
  $(window).scroll(function() {
    var windowY = $(this).scrollTop();

    //manage fixed header
    if(windowY >= mainHeaderPosY && !$mainHeader.hasClass('mainHeader--fixed')) {
      $mainHeader.addClass('mainHeader--fixed');
    } else if(windowY < mainHeaderPosY && $mainHeader.hasClass('mainHeader--fixed')) {
      console.log('remove')
      $mainHeader.removeClass('mainHeader--fixed');
    }

  });

  //basic parallax
  $('[data-parallax]').each(function() {
    var $el = $(this);

    $(window).scroll(function() {
      var windowY = $(this).scrollTop();
      var transform = windowY/$el.attr('data-parallax');

      if(windowY > window.innerHeight) {
        (windowY-$el.offset().top)/$el.attr('data-parallax')
      }

      $el.css('transform', 'translateY(' + transform + 'px)' )
    });
  });

  $scrollDownBtn.click(function() {
    $('html, body').animate({
      scrollTop: mainHeaderPosY
    }, 2000);
  });

})();
