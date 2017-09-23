(function($) {
    'use strict';

    /**
     * Init the tooltip support
     */
    $.pepperTooltipInit = function() {
        $(document).ready(function() {
            var arrowSize = 9;

            $('[data-tooltip]').each(function () {
                var tooltip;
                var text = $(this).data('tooltip');
                var placement = $(this).data('placement');

                if(!isDefined(placement)) {
                    placement = 'top';
                }

                $(this).hover(function() {
                    var position = $(this).offset();
                    tooltip = $('<div/>', {
                        'class': 'tooltip-overlay tooltip-' + placement,
                        'style': 'display: none;',
                        'html': text
                    }).appendTo('body');

                    var yOffset = ($(this).outerHeight() - tooltip.outerHeight()) / 2;
                    var xOffset = ($(this).outerWidth() - tooltip.outerWidth()) / 2;

                    if(placement == 'top') {
                        var height = tooltip.outerHeight() + arrowSize;
                        tooltip.css({top: position.top - height, left: position.left + xOffset});
                    } else if (placement == 'right') {
                        var width = $(this).outerWidth() + arrowSize;
                        tooltip.css({top: position.top + yOffset, left: position.left + width});
                    } else if (placement == 'bottom') {
                        var height = $(this).outerHeight() + arrowSize;
                        tooltip.css({top: position.top + height, left: position.left + xOffset});
                    } else if (placement == 'left') {
                        var width = tooltip.outerWidth() + arrowSize;
                        tooltip.css({top: position.top + yOffset, left: position.left - width});
                    }
                    tooltip.fadeIn(250);
                }, function() {
                    tooltip.fadeOut(250, function() {
                        tooltip.remove();
                    });
                });
            });
        });
    };

}(jQuery));

