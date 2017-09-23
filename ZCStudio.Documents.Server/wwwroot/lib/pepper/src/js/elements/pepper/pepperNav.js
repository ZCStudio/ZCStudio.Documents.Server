(function($) {
    'use strict';

    /**
     * Init the responsive navigation support
     */
    $.pepperNav = function() {
        $('body').on('click', '.nav-toggle-btn', function(event) {
            event.preventDefault();

            var nav = $($(this).data('target'));

            if(nav.length > 0) {
                if(nav.is(':visible')) {
                    nav.slideUp(150);
                } else {
                    nav.slideDown(150);
                }
            }
        });
    };

}(jQuery));

