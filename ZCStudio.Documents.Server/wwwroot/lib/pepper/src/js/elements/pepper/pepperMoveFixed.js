(function($) {
    'use strict';

    /**
     * Init the move-fixed support
     */
    $.pepperMoveFixed = function() {

        $(window).load(function() {
            if($('.move-fixed').length > 0) {
                $('.move-fixed').each(function() {
                    if($('body').hasClass('header-fixed')) {
                        $(this).attr('data-startTop', 0);
                    } else {
                        $(this).attr('data-startTop', $(this).offset().top);
                    }
                });

                moveFixed();

                $(window).scroll(function() {
                    moveFixed();
                });

                $(window).resize(function() {
                    moveFixed();
                });
            }
        });
    };

    var moveFixed = function() {

        var scrollTop = $(window).scrollTop();

        if($('.move-fixed').length > 0) {
            $('.move-fixed').each(function() {
                if(scrollTop > $(this).attr('data-startTop')) {
                    $(this).css('width', 'auto');
                    $(this).css('width', $(this).parent().width() - 1);
                    $(this).css('position', 'fixed');

                    if($('body').hasClass('header-fixed')) {
                        $(this).css('top', $('.header').outerHeight(true));
                    } else {
                        $(this).css('top', '0px');
                    }

                    $(this).find('.to-top').css('display', 'block');
                } else {
                    $(this).css('position', 'static');
                    $(this).css('width', '');
                    $(this).find('.to-top').hide();
                }
            });
        }

    }

}(jQuery));

