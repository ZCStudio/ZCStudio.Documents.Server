(function($) {
    'use strict';

    /**
     * Calculate all Equalizer Elements
     *
     * @param type Set to 'init' if first call
     */
    $.pepperEqualizer = function(type) {
        if(type == 'init') {
            $(window).load(function() {
                equalize();
            });
            $(window).resize(function() {
                equalize();
            });
        }

        equalize();
    };

    /**
     * Run the Equalize
     */
    var equalize = function() {
        $('[data-equalizer]').each(function() {
            var target = $(this).attr('data-equalizer');

            var elements = $(this).find('[data-equalizer-element="' + target + '"]');
            elements.css('height', '');
            var height = 0;

            elements.each(function() {
                height = Math.max(height, $(this).outerHeight());
            });

            elements.outerHeight(height);
        });
    }

}(jQuery));

