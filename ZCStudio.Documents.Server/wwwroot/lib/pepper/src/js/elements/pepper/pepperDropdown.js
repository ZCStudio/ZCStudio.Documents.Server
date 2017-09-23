(function($) {
    'use strict';

    /**
     * Init the dropdown support
     */
    $.pepperDropdown = function() {
        var lastDropdown = null;

        $('body').on('click', '.dropdown-toggle', function (event) {
            event.stopPropagation();
            var self = $(this);
            var menu = $(this).parent().find('.dropdown-menu');

            if(lastDropdown != null && lastDropdown[0] != self[0]) {
                lastDropdown.removeClass('active');
                lastDropdown.parent().find('.dropdown-menu').removeClass('is-open');
            }

            menu.toggleClass('is-open');
            self.toggleClass('active');
            lastDropdown = self;

            $(document).bind('click', function() {
                $(document).unbind('click');
                menu.removeClass('is-open');
                self.removeClass('active');
            });
        });
    };

}(jQuery));

