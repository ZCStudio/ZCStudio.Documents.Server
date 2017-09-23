(function($) {
    'use strict';

    /**
     * Init the layout checks
     */
    $.pepperLayout = function() {
        fixedCheck();

        $(window).load(function() {
            fixedCheck();
        });

    };

    var fixedCheck = function() {
        if($('body').hasClass('header-fixed')) {
            $('.wrap > .content').css('padding-top', $('.header').outerHeight(true));
        }
        if($('body').hasClass('footer-fixed') || $('body').hasClass('footer-bottom')) {
            $('.wrap .footer-push').css('height', $('.wrap > .footer').outerHeight(true));
        }
    }

}(jQuery));

