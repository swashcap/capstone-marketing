/* global Modernizr */
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
     * Navbar scrolling.
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

    if ($homeIntro.length) {
        scrollHandler();
        $window.scroll($.throttle(250, scrollHandler));
    }

    /**
     * In-page hash link clicking.
     */
    var $links = $('a').filter(function (index, el) {
        return el.getAttribute('href').indexOf('#') === 0;
    });
    var linkScroller = function (e) {
        var $target = $(e.target.hash);

        if ($target.length) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $target.offset().top - $navbar.height()
            }, 'fast');
        }
    };

    $links.click(linkScroller);

    /**
     * Animation firing with WaypointsJS.
     * @{@link  http://imakewebthings.com/jquery-waypoints/}
     */
    var ANIMATION_CLASS = 'is-animated';
    var $animationSections = $('.animation');
    var triggerAnimation = function () {
        var $el = $(this);

        setTimeout(function () {
            $el.addClass(ANIMATION_CLASS);
        }, 50);
    };

    if (! Modernizr.touch && $window.width() >= 768) {
        $animationSections.waypoint(triggerAnimation, {
            offset: function () {
                return Math.floor($window.height() - 0.5 * $(this).height());
            }
        });
    }
}(jQuery));
