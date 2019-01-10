import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import '@fortawesome/fontawesome-free';
import 'owl.carousel2';
import '@fancyapps/fancybox';

var app = {
  'config': {
    'search': {
      'open': '.js-search-panel',
      'group': '.search__group',
      'btn': ''
    },
    'mainSlide': {
      'btn': '.main-slide__link',
      'event': 'mouseover click',
      'activeClass': 'active',
      'bgContainer': '.main-slide',
      'img': '',
    },
    'burger': {
      'btn': '.burger',
      'event': 'click touchend',
      'nav': '.mobile',
      'openClass': 'mobile--is-open',
      'close': '.mobile__close',
    },
  },
};

((window, document, $, app) => {

  var $doc = $(document);

  /**
   * Parallax
   */
  app.parallax = {
    init: (el, speed) => {
      $(window).on('scroll', function() {
        var scroll = $(document).scrollTop();
        $(el).css({
          'background-position': '50% ' + (-speed * scroll) + 'px'
        });
      });
    },
  };

  /**
   * Start carousel
   */
  app.carousel = {
    init: (el, conf) => {
      $(el).owlCarousel(conf);
    },
  };

  /**
   * Search panel open and close
   */
  app.search = {
    init: () => {
      if ($(app.config.search.open).length) {
        $doc.on('click touchend', app.config.search.open, () => {
          if ($(app.config.search.group).is(':visible')) {
            app.search.close();
          } else {
            app.search.open();
          }
        });
      }
    },
    // function open search panel and switch button
    open: () => {
      $(app.config.search.group).show().animate({
        opacity: '1'
      }, 150);
      $(app.config.search.open).addClass('active');
    },
    // function close search panel and switch button
    close: () => {
      $(app.config.search.group).animate({
        opacity: '0'
      }, 150, () => {
        $(app.config.search.group).hide();
      });
      $(app.config.search.open).removeClass('active');
    }
  };

  /**
   * Main slide background swich
   * app.config.mainSlide.btn
   * app.config.mainSlide.event
   * app.config.mainSlide.activeClass
   */
  app.mainSlide = {
    init: () => {
      $doc.on(app.config.mainSlide.event, app.config.mainSlide.btn, function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(app.config.mainSlide.btn).removeClass(app.config.mainSlide.activeClass);
        $(this).addClass(app.config.mainSlide.activeClass);
        app.mainSlide.imgSwich($(this).data('slide'));
      });
    },
    imgSwich: (slide) => {
      if (slide) {
        $('[data-img]').removeClass(app.config.mainSlide.activeClass);
        $('[data-img="' + slide + '"]').addClass(app.config.mainSlide.activeClass);
      }
    }
  };


  /**
   * Location href to data attribute
   * data-fakehref
   */
  app.fakeHref = {
    init: () => {
      $doc.on('click touchend', '[data-fakehref]', function(e) {
        e.preventDefault();
        window.location.pathname = $(this).data('fakehref');
      });
    }
  };

  /**
   * burger menu
   */
  app.burger = {
    init: () => {
      $doc.on(app.config.burger.event, app.config.burger.btn, function(e) {
        e.preventDefault();
        $(app.config.burger.nav).addClass(app.config.burger.openClass);
        app.burger.addOverlay();
      }).on(app.config.burger.event, app.config.burger.close, function(e) {
        e.preventDefault();
        $(app.config.burger.nav).removeClass(app.config.burger.openClass);
        app.burger.removeOverlay();
      });
    },
    addOverlay: () => {
      //window.nav.height = $(app.config.burger.nav).height();
      $('body').css({
        'overflow': 'hidden',
        'height': $(app.config.burger.nav).height()
      });
    },
    removeOverlay: () => {
      $('body').css({
        'overflow': '',
        'height': '',
      });
    },
  };

  app.fancy = {
    init: () => {
      $('[data-fancybox]').fancybox({
        slideShow  : true,
        fullScreen : true,
        thumbs     : true,
        closeBtn   : true,
      });
    }
  };




  $doc.ready(() => {
    /**
     * Init top search panel
     */
    app.search.init();
    /**
     * Init slide to main page
     */
    app.mainSlide.init();
    /**
     * Init 
     */
    app.fakeHref.init();
    /**
     * Init carousel main page
     */
    app.carousel.init('.project-slider', {
      dots: false,
      nav: true,
      items: 1,
      navText: ['<svg><use xlink: href = "img/sprite.svg#icon-back"></use></svg>', '<svg><use xlink: href = "img/sprite.svg#icon-back"></use></svg>'],
    });
    /**
     * Parallax init
     */
    app.parallax.init('.jumbotron', '0.25');
    /**
     * Burger init
     */
    app.burger.init();
    /**
     * Fancybox me app init
     */
    //app.fancy.init();
  });


})(window, document, $, app);


/**
 * Scroll to anchor
 */
$(document).ready(function() {
  $('a[href*=#]').on('click', function(e) {
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 777);
    e.preventDefault();
    return false;
  });
});
