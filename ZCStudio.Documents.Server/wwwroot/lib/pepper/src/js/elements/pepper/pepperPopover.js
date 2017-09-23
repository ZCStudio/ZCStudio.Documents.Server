(function($) {
    'use strict';


    /**
     * Default Options
     *
     * @type {{text: string, title: string, placement: string, arrowSize: number}}
     */
    var defaultOptions = {
        'text': '',
        'title': '',
        'placement': 'top',
        'arrowSize': 10
    };

    /**
     * Init the tooltip support
     */
    $.pepperPopoverInit = function() {
        $(document).ready(function() {
            $('[data-popover]').each(function () {
                $(this).click(function(event) {
                    event.preventDefault();
                    $(this).pepperPopover();
                });
            });
        });
    };

    /**
     * Popover function
     *
     * @param type show/hide/toggle the popover
     * @param options Override the default options
     */
    $.fn.pepperPopover = function(type, options) {
        if(type == 'show') {

            $(this).pepperPopoverShow(options);

        } else if (type == 'hide') {

            $(this).pepperPopoverHide();

        } else {

            if(isDefined($(this).data('is-shown'))) {
                $(this).pepperPopoverHide();
            } else {
                $(this).pepperPopoverShow(options);
            }

        }

    };

    /**
     * Shows a Popover
     *
     * @param options
     */
    $.fn.pepperPopoverShow = function(options) {
        var self = $(this);

        setTimeout(function () {
            if(isDefined(self.data('is-shown'))) {
                return;
            }

            var data = {
                'text': self.data('popover'),
                'title': self.data('popover-title'),
                'placement': getPopoverPlacement(self)
            };
            var settings = $.extend({}, defaultOptions, data, options);

            self.data('is-shown', true);

            var popover = $('<div/>', {
                'class': 'popover-overlay popover-' + settings.placement,
                'style': 'display: none;'
            }).appendTo('body');

            self.data('popover-overlay', popover);

            if(settings.title != '') {
                $('<div/>', {
                    'class': 'popover-title',
                    'html': settings.title
                }).appendTo(popover);
            }

            $('<div/>', {
                'class': 'popover-content',
                'html': settings.text
            }).appendTo(popover);

            var pos = getPopoverPosition(self, popover, settings);
            popover.css({top: pos.top, left: pos.left}).fadeIn(200);
        }, 60);

    };

    /**
     * Removes a Popover
     *
     * @param time Remove-Animation time in ms
     */
    $.fn.pepperPopoverHide = function(time) {
        if(!isDefined(time)) {
            time = 250;
        }

        var overlay = $(this).data('popover-overlay');
        if(isDefined($(this).data('popover-overlay'))) {
            $(this).removeData('popover-overlay');
            $(this).removeData('is-shown');
            overlay.fadeOut(time, function() {
                overlay.remove();
            });
        }
    };

    var getPopoverPlacement = function(element) {
        var placement = element.data('placement');

        if(!isDefined(placement)) {
            placement = 'top';
        }

        return placement;
    };

    var getPopoverPosition = function(element, popover, settings) {
        var placement = getPopoverPlacement(element);
        var position = element.offset();
        var yOffset = (element.outerHeight() - popover.outerHeight()) / 2;
        var xOffset = (element.outerWidth() - popover.outerWidth()) / 2;
        var pos;

        if(!isDefined(placement) || placement == 'top') {
            pos = {
                'top': position.top - (popover.outerHeight() + settings.arrowSize),
                'left': position.left + xOffset
            };
        } else if (placement == 'right') {
            pos = {
                'top': position.top + yOffset,
                'left':position.left + (element.outerWidth() + settings.arrowSize)
            };
        } else if (placement == 'bottom') {
            pos = {
                'top': position.top + (element.outerHeight() + settings.arrowSize),
                'left': position.left + xOffset
            };
        } else if (placement == 'left') {
            pos = {
                'top': position.top + yOffset,
                'left': position.left - (popover.outerWidth() + settings.arrowSize)
            };
        }

        return pos;
    };

}(jQuery));

