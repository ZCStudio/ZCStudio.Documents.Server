(function($) {
    'use strict';

    var subNavItems = [];

    /**
     * Init the sub-nav support
     */
    $.pepperSubNav = function() {
        $('.subnav').find('a').each(function(){
            if($($(this).attr('href')).length > 0) {
                subNavItems.push($($(this).attr('href')));
            }
        });

        $('body').on('click', '.subnav a', function(event) {
            event.preventDefault();
            if($(this).parent().hasClass('to-top')) {
                $('html, body').animate({
                    scrollTop: 0
                }, 200);
            } else {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 5 - parseInt($('.content').css('padding-top'))
                }, 200);
            }
        });

        $(window).scroll(function() {

            var scrollTop = $(window).scrollTop();

            if(subNavItems.length > 0) {
                var currentElement = subNavItems[0];

                $.each(subNavItems, function() {

                    if(scrollTop < this.offset().top - 20 - parseInt($('.content').css('padding-top'))) {
                        return false;
                    }
                    currentElement = $(this);
                });

                if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    currentElement = subNavItems[subNavItems.length - 1];
                }

                var id = currentElement.attr('id');

                var menuElements = $('.subnav').find('a');
                menuElements.parent().removeClass('active');

                var linkElement = menuElements.filter("[href=#" + id  +"]");
                linkElement.parent().addClass('active');
                if(!linkElement.closest('ul').hasClass('subnav')) {
                    linkElement.parent().parent().parent().addClass('active');
                }
            }

        });
    };

}(jQuery));

