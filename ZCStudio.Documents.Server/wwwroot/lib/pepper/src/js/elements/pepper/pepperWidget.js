(function($) {
    'use strict';

    /**
     * Init the widget support
     */
    $.pepperWidget = function() {

        $('.widget').each(function() {
            if($(this).hasClass('widget-collapsed')) {
                $(this).find('[data-action="collapse"]').hide();
            } else {
                $(this).find('[data-action="expand"]').hide();
            }
        });

        $('body').on('click', '.widget [data-action]', function(event) {
            event.preventDefault();
            var action = $(this).data('action');
            var widget = $(this).closest('.widget');

            if(action == 'collapse') {
                widget.find('.widget-content').slideUp(250, function() {
                    widget.addClass('widget-collapsed');
                    widget.find('[data-action="collapse"]').hide();
                    widget.find('[data-action="expand"]').show();
                });
            } else if (action == 'expand') {
                widget.find('.widget-content').slideDown(250);
                widget.removeClass('widget-collapsed');
                widget.find('[data-action="collapse"]').show();
                widget.find('[data-action="expand"]').hide();
            }
        });

    };

}(jQuery));

