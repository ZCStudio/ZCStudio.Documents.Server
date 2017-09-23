(function($) {
    'use strict';

    /**
     * Init the accordion support
     */
    $.pepperAccordion = function() {

        $('body').on('click', '.accordion .accordion-element .accordion-title', function () {
            var accordion = $(this).closest('.accordion');
            var element = $(this).closest('.accordion-element');
            var content = element.find('.accordion-content');

            if(isDefined(accordion.data('accordion-single'))) {
                accordion.find('.accordion-element').each(function() {
                    var self = $(this);
                    if(self[0] != element[0]) {
                        self.find('.accordion-content').slideUp(250, function() {
                            self.removeClass('is-open');
                        });
                    }
                });
            }

            if(element.hasClass('is-open')) {
                element.find('.accordion-content').slideUp(250, function() {
                    element.removeClass('is-open');
                });
            } else {
                element.addClass('is-open');
                element.find('.accordion-content').show().hide().slideDown(250);
            }
        });

    };

}(jQuery));

