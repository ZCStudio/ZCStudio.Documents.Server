(function($) {
    'use strict';

    /**
     * Init pepper select support
     */
    $.pepperSelectInit = function() {
        $('body').click(function() {
            $('.input-select-holder').removeClass('open');
        });

        $('.input-select').each(function() {
            $(this).pepperSelect();
        });
    };

    /**
     * Rebuild select box
     */
    $.fn.pepperSelect = function() {
        var parseElement = function(element) {
            return {
                'type': 'option',
                'html': element.html(),
                'val': element.val(),
                'disabled': element.attr('disabled')
            };
        };

        var selectValue = function(value, html) {
            select.removeClass('default');
            select.html(html);
            self.val(value);
        };

        var addOption = function(data, holder) {
            if(data.type == 'option') {
                if(data.html == '') { return; }
                var option = $('<div/>', {
                    'html': data.html,
                    'class': 'input-select-option'
                }).appendTo(holder);

                if(isDefined(data.disabled)) {
                    option.addClass('disabled');
                } else {
                    option.data('value', data.val);
                    option.click(function() {
                        selectValue(data.val, data.html)
                    });
                }
            } else {
                var optgroup = $('<div/>', {
                    'html': '<div class="input-select-optgroup">' + data.html + '</div>',
                    'class': 'input-select-optgroup-holder'
                }).appendTo(holder);

                $.each(data.elements, function(key, value) {
                    addOption(value, optgroup);
                });
            }
        };

        var self = $(this);
        var parent = $(this).parent();
        var elementsArray = [];
        $(this).find('> option').each(function() {
            elementsArray.push(parseElement($(this)));
        });
        $(this).find('> optgroup').each(function() {
            var optgroupArray = {
                'type': 'optgroup',
                'html': $(this).attr('label'),
                'elements': []
            };
            var elements = $(this).find('> option');
            elements.each(function() {
                optgroupArray.elements.push(parseElement($(this)));
            });
            elementsArray.push(optgroupArray);
        });

        parent.find('.input-select-holder').remove();

        var holder = $('<div/>', {
            'class': 'input-select-holder'
        }).appendTo(parent);

        var select = $('<div/>', {
            'html': $(this).find('option:selected').text(),
            'class': 'input-select-add'
        }).appendTo(holder);

        if(select.html() == '') {
            if($(this).data('placeholder')) {
                select.addClass('default');
                select.html($(this).data('placeholder'));
            }else {
                select.html('&nbsp;');
            }
        }

        holder.click(function(event) {
            event.stopPropagation();
            if($(this).hasClass('open')) {
                $(this).removeClass('open');
            } else {
                $('.input-select-holder').removeClass('open');
                $(this).addClass('open');
            }
        });

        var options = $('<div/>', {
            'class': 'input-select-options'
        }).appendTo(holder);

        $.each(elementsArray, function(key, value) {
            addOption(value, options);
        });
    };

}(jQuery));

