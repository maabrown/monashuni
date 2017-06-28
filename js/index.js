(function() {

  //main vars
  var $mainHeader = $('.mainHeader'),
    // jQuery method offset returns current position relative to the document
    mainHeaderPosY = $mainHeader.offset().top,
    $scrollDownBtn = $('button.scrollDown'),
    $topLogo = $('.topLogo'),
    $mobileMenu = $('[data-name="mobile-menu"]');


  // this function is called by window.scroll() method
  var setLayout = function() {

    //make sure we get a tasty full size splash view
    $('.section[data-name="preheader"]').height(window.innerHeight - $('nav').height());
    mainHeaderPosY = $mainHeader.offset().top

    // if this variable returns true, it means the user is on mobile
    var mq = window.matchMedia("(max-width: 767px)");

    if (mq) {
      // this is when it is mobile
      $('.section[data-name="preheader"]').height(window.innerHeight + $mobileMenu.height());
      mainHeaderPosY = $mainHeader.offset().top
    }
  }

  // called by window.scroll function()
  // windowY is the vertical position of the Window
  var setFixedHeader = function(windowY) {

    //manage fixed header

    // if window Y position is greater than mainHeader's position (aka you've scrolled past the navbar)
    // and doesn't have the class mainHeader--fixed add it
    // mainHeader--fixed
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

    // gives you the value of vertical position of scrollbar of selected
    // element, 'this' refers to the Window
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
