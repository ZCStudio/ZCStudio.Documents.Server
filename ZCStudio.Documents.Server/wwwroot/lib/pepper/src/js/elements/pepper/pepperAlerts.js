(function($) {
    'use strict';

    /**
     * Init the alert support
     */
    $.pepperAlerts = function() {

        $('body').on('click', '.alert-closeable .close', function() {
            $(this).closest('.alert').fadeOut(250, function() {
                $(this).remove();
            });
        });

    };

}(jQuery));

