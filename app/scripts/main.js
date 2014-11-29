(function ($) {
    'use strict';

    var $window = $(window);
    var $navbar = $('.navbar');

    /**
     * Bootstrap's Scrollspy for 'active' navigation links.
     * @(@link  http://getbootstrap.com/javascript/#scrollspy}
     */
    $('body').scrollspy({
        offset: $navbar.height(),
        target: '.navbar-default'
    });

    /**
     * Navbar scrolling and clicking.
     */
    var NAVBAR_SCROLLED_CLASS = 'is-scrolled';
    var $homeIntro = $('.home-intro');
    var scrollHandler = function () {
        if ($window.scrollTop() >= $homeIntro.height() / 2) {
            $navbar.addClass(NAVBAR_SCROLLED_CLASS);
        } else {
            $navbar.removeClass(NAVBAR_SCROLLED_CLASS);
        }
    };
    var navbarScroller = function (e) {
        var $target = $(e.target.hash);

        if ($target.length) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $target.offset().top - $navbar.height()
            }, 'fast');
        }
    };

    if ($homeIntro.length) {
        scrollHandler();
        $window.scroll($.throttle(250, scrollHandler));
    }
    $navbar.find('.nav a').click(navbarScroller);
}(jQuery));
