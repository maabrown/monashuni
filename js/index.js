(function() {

  //main vars
  var $mainHeader = $('.mainHeader'),
    mainHeaderPosY = $mainHeader.offset().top,
    $scrollDownBtn = $('button.scrollDown'),
    $topLogo = $('.topLogo');


  var setLayout = function() {

    //make sure we get a tasty full size splash view
    $('.section[data-name="preheader"]').height(window.innerHeight - $('nav').height());
    mainHeaderPosY = $mainHeader.offset().top
  }


  var setFixedHeader = function(windowY) {

    //manage fixed header
    if(windowY >= mainHeaderPosY && !$mainHeader.hasClass('mainHeader--fixed')) {
      $mainHeader.addClass('mainHeader--fixed');
    } else if(windowY < mainHeaderPosY && $mainHeader.hasClass('mainHeader--fixed')) {
      $mainHeader.removeClass('mainHeader--fixed');
    }
  }


  var setLocation = function(windowY) {
    var cur = $('body').attr('data-scrolllocation');
    if(cur == "") cur = 'preheader';

    $('.section').each(function() {
      if(
        windowY > $(this).offset().top && 
        windowY < $(this).offset().top + $(this).height()
      ) $('body').attr('data-scrolllocation', $(this).attr('data-name'));
    });
  }

  //scroll (might need to debounce)
  $(window).scroll(function() {
    var windowY = $(this).scrollTop();

    setFixedHeader(windowY);
    setLocation(windowY);
  });


  $(window).resize(function() {
    setLayout();
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



  //jump off
  $(window).trigger('resize');
})();
