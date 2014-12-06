/* global Modernizr */
(function (window, $) {
    'use strict';

    var SCREEN_SMALL = 768;
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
     * Mobile menu opening/closing.
     *
     * Re-collapse the mobile menu when an in-page link is clicked.
     */
    var $navbarCollapse = $navbar.find('.collapse');

    $navbar.find('a').click(function (e) {
        if (e.target.getAttribute('href').indexOf('#') === 0) {
            $navbarCollapse.collapse('hide');
        }
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
        var offset;

        if ($target.length) {
            e.preventDefault();

            if ($window.width() >= SCREEN_SMALL) {
                offset = $target.offset().top - $navbar.height();
            } else {
                offset = $target.offset().top - $navbar.find('.navbar-header').height();
            }

            $('html, body').animate({
                scrollTop: offset
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

    if (! Modernizr.touch && $window.width() >= SCREEN_SMALL) {
        $animationSections.waypoint(triggerAnimation, {
            offset: function () {
                return Math.floor($window.height() - 0.5 * $(this).height());
            }
        });
    } else {
        $animationSections.addClass(ANIMATION_CLASS);
    }
}(window, jQuery));
