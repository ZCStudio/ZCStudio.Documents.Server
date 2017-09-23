/*! Pepper CSS Framework - v1.3.1
* 2014-12-07
* https://github.com/wuifdesign/pepper
* Copyright (c) 2014 - Michael Wohlfahrter 
*/ 

(function($) {

    $(document).ready(function() {
        $.pepperEqualizer('init');
        $.pepperNav();
        $.pepperSubNav();
        $.pepperLayout();
        $.pepperMoveFixed();
        $.pepperDropdown();
        $.pepperAccordion();
        $.pepperWidget();
        $.pepperAlerts();
        $.pepperTabInit();
        $.pepperTooltipInit();
        $.pepperPopoverInit();
        $.pepperParallax();
        $.pepperSelectInit();
    });

}(jQuery));

function isDefined(variable) {
    if(typeof variable === 'undefined') {
        return false;
    }
    return true;
}


;

/*
How to use:

var Person = Class.extend({
    name: '',
    init: function (name) {
        this.name = name;
    },
    test: function () {
        console.log('This is a Test');
    }
});

var Ninja = Person.extend({
    test: function () {
        this._super();
    }
});

var p = new Person('Bob');
*/

(function(global) {
    'use strict';

    if (!Object.create) {
        Object.create = (function(){
            function F(){}
            return function(o){
                if (arguments.length != 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F()
            }
        })()
    }

    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    /**
     * A BaseClass you can extend for new classes
     * var newClass = Class.extend({
     *     init: function () {
     *     }
     * });
     *
     * @constructor
     */
    function BaseClass(){}
    BaseClass.extend = function(props) {
        var _super = this.prototype;
        var proto = Object.create(_super);

        for (var name in props) {
            proto[name] = typeof props[name] === "function" && typeof _super[name] == "function" && fnTest.test(props[name])
                ? (function(name, fn){
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, props[name])
                : props[name];
        }

        var newClass = typeof proto.init === "function"
            ? proto.hasOwnProperty("init") ? proto.init : function SubClass(){ _super.init.apply(this, arguments); }
            : function EmptyClass(){};

        newClass.prototype = proto;
        proto.constructor = newClass;
        newClass.extend = BaseClass.extend;

        return newClass;
    };

    global.Class = BaseClass;
})(window);;

(function ($) {
    'use strict';

    /**
     * Override for the magnificPopup open dialog
     *
     * @param data
     */
    $.magnificPopup.instance.open = function (data) {
        if(data.type == 'inline') {
            data.removalDelay = 300;
            data.mainClass ='pepper-overlay-zoom-in';
        }
        var scrollBarWidth = $.magnificPopup.instance._getScrollbarSize();
        $('.header-fixed .header').css('padding-right', scrollBarWidth + 'px');
        $('.footer-fixed .footer').css('padding-right', scrollBarWidth + 'px');
        $.magnificPopup.proto.open.call(this, data);
    };

    /**
     * Override for the magnificPopup close dialog
     *
     * @param data
     */
    $.magnificPopup.instance.close = function () {
        var removalDelay = $.magnificPopup.instance.st.removalDelay;
        if(removalDelay) {
            setTimeout(function() {
                $('.header-fixed .header').css('padding-right', '');
                $('.footer-fixed .footer').css('padding-right', '');
            }, removalDelay);
        } else {
            $('.header-fixed .header').css('padding-right', '');
            $('.footer-fixed .footer').css('padding-right', '');
        }
        $.magnificPopup.proto.close.call(this);
    };

}(jQuery));;

(function ($) {
    'use strict';

    /**
     * Class for Page Transitions
     *
     * @constructor
     */
    function PageTransitions() {
        this.holder = $('#pt-main');
        this.pages = this.holder.children('div.pt-page');
        this.pagesCount = this.pages.length;
        this.current = 0;
        this.isAnimating = false;
        this.endCurrPage = false;
        this.endNextPage = false;
        this.animationSupport = detectCSSFeature('animation');
        this.endEvent = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';
        this.init();
    }

    PageTransitions.prototype = {
        init: function() {
            this.pages.each(function () {
                $(this).data('originalClass', $(this).attr('class'));
            });
            this.pages.eq(this.current).addClass('pt-page-current');
        },
        nextPage: function(pageIndex, animationNumber) {
            var animation = (isDefined(animationNumber)) ? animationNumber : 1;

            if (this.isAnimating) {
                return false;
            }
            this.isAnimating = true;

            var currPage = this.pages.eq(this.current);

            var tempCurrent = 0;
            if (isDefined(pageIndex)) {
                if (pageIndex < this.pagesCount - 1) {
                    tempCurrent = pageIndex;
                }
            }
            else {
                if (this.current < this.pagesCount - 1) {
                    tempCurrent = this.current + 1;
                }
            }

            if (this.current == tempCurrent || animation > 18) {
                this.isAnimating = false;
                return false;
            }
            this.current = tempCurrent;

            var nextPage = this.pages.eq(this.current).addClass('pt-page-current');
            var outClass = '';
            var inClass =  '';

            switch(animation) {
                case 1:
                    outClass = 'pt-page-moveToLeft';
                    inClass =  'pt-page-moveFromRight';
                    break;
                case 2:
                    outClass = 'pt-page-moveToRight';
                    inClass =  'pt-page-moveFromLeft';
                    break;
                case 3:
                    outClass = 'pt-page-moveToTop';
                    inClass =  'pt-page-moveFromBottom';
                    break;
                case 4:
                    outClass = 'pt-page-moveToBottom';
                    inClass =  'pt-page-moveFromTop';
                    break;
                case 5:
                    outClass = 'pt-page-scaleDown';
                    inClass =  'pt-page-scaleUpDown pt-page-delay-300';
                    break;
                case 6:
                    outClass = 'pt-page-scaleDownUp';
                    inClass =  'pt-page-scaleUp pt-page-delay-300';
                    break;
                case 7:
                    outClass = 'pt-page-flipOutRight';
                    inClass =  'pt-page-flipInLeft pt-page-delay-500';
                    break;
                case 8:
                    outClass = 'pt-page-flipOutLeft';
                    inClass =  'pt-page-flipInRight pt-page-delay-500';
                    break;
                case 9:
                    outClass = 'pt-page-flipOutTop';
                    inClass =  'pt-page-flipInBottom pt-page-delay-500';
                    break;
                case 10:
                    outClass = 'pt-page-flipOutBottom';
                    inClass =  'pt-page-flipInTop pt-page-delay-500';
                    break;
                case 11:
                    outClass = 'pt-page-rotatePushLeft';
                    inClass =  'pt-page-moveFromRight';
                    break;
                case 12:
                    outClass = 'pt-page-rotatePushRight';
                    inClass =  'pt-page-moveFromLeft';
                    break;
                case 13:
                    outClass = 'pt-page-rotatePushTop';
                    inClass =  'pt-page-moveFromBottom';
                    break;
                case 14:
                    outClass = 'pt-page-rotatePushBottom';
                    inClass =  'pt-page-moveFromTop';
                    break;
                case 15:
                    outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
                    inClass =  'pt-page-rotateCubeLeftIn';
                    break;
                case 16:
                    outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
                    inClass =  'pt-page-rotateCubeRightIn';
                    break;
                case 17:
                    outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
                    inClass =  'pt-page-rotateCubeTopIn';
                    break;
                case 18:
                    outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
                    inClass =  'pt-page-rotateCubeBottomIn';
                    break;
            }

            currPage.addClass(outClass).on(this.endEvent, function () {
                currPage.off(this.endEvent);
                this.endCurrPage = true;
                if (this.endNextPage) {
                    this.onEndAnimation(currPage, nextPage);
                }
            }.bind(this));

            nextPage.addClass(inClass).on(this.endEvent, function () {
                nextPage.off(this.endEvent);
                this.endNextPage = true;
                if (this.endCurrPage) {
                    this.onEndAnimation(currPage, nextPage);
                }
            }.bind(this));

            if (!this.animationSupport) {
                this.onEndAnimation(currPage, nextPage);
            }

            return true;
        },
        onEndAnimation: function(outPage, inPage) {
            this.endCurrPage = false;
            this.endNextPage = false;
            this.resetPage(outPage, inPage);
            this.isAnimating = false;
        },
        resetPage: function (outPage, inPage) {
            this.pages.each(function () {
                $(this).attr('class', $(this).data('originalClass'));
            });
            console.log(inPage);
            inPage.addClass('pt-page-current');
        }
    };
    window.PageTransitions = PageTransitions;
    $.pageTransitions = PageTransitions;
}(jQuery));

/**
 * Returns true if the browser supports the given feature
 *
 * @param featurename
 * @returns {boolean}
 */
function detectCSSFeature(featurename) {
    var feature = false,
        domPrefixes = 'Webkit Moz ms O'.split(' '),
        elm = document.createElement('div'),
        featurenameCapital = null;

    featurename = featurename.toLowerCase();
    if (elm.style[featurename]) {
        feature = true;
    }
    if (feature === false) {
        featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
        for (var i = 0; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + featurenameCapital ] !== undefined) {
                feature = true;
                break;
            }
        }
    }
    return feature;
};

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

;

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

;

(function($) {
    'use strict';

    /**
     * Set the 'animated' class for an element
     *
     * @param show
     */
    $.fn.pepperAnimate = function(show) {
        if(!isDefined(show)) {
            show = !$(this).hasClass('animated');
        }
        if(show) {
            $(this).addClass('animated');
            $(this).addPepperAnimationClass();
        } else {
            $(this).removeClass('animated');
            $(this).removePepperAnimationClass();
        }
    };

    $.fn.addPepperAnimationClass = function() {
        if(isDefined($(this).data('animation'))) {
            $(this).addClass($(this).data('animation'));
        } else {
            $(this).addClass('fadeIn');
        }
    };

    $.fn.removePepperAnimationClass = function() {
        if(isDefined($(this).data('animation'))) {
            $(this).removeClass($(this).data('animation'));
        } else {
            $(this).removeClass('fadeIn');
        }
    };

    var scrollAnimations = function() {
        $('.pepper-animation-auto').each(function() {
            if(!$(this).hasClass('animated')) {
                var documentBottom = $(window).scrollTop() + $(window).height();
                var elementTop = $(this).offset().top + ($(this).height() / 2);

                if(elementTop <= documentBottom) {
                    $(this).addClass('animated');
                    $(this).addPepperAnimationClass();
                }
            }
        });

        $('[data-counter-animation]').each(function() {
            if(!isDefined($(this).data('data-animated'))) {
                var documentBottom = $(window).scrollTop() + $(window).height();
                var elementTop = $(this).offset().top + ($(this).height() / 2);

                if(elementTop <= documentBottom) {
                    var element = $(this).find('[data-counter-animation-element]');
                    var targetValue = $(this).data('counter-value');
                    var currentValue = $(this).data('counter-current-value');
                    var currentDirection = 'up';

                    if(!isDefined(currentValue)) {
                        currentValue = 0;
                        $(this).data('counter-current-value', 0)
                    }

                    if(targetValue < currentValue) {
                        currentDirection = 'down';
                    }

                    $(this).data('data-animated', 'true')
                    getCountAnimationValue(targetValue, currentValue, element, currentDirection);
                }
            }
        });
    };

    $(window).scroll(function() {
        scrollAnimations();
    });

    var getCountAnimationValue = function(targetValue, currentValue, element, currentDirection) {
        element.html(currentValue);
        setTimeout(function() {
            if(currentDirection == 'up') {
                if(targetValue > currentValue) {
                    getCountAnimationValue(targetValue, currentValue + 1, element, currentDirection);
                }
            } else {
                if(targetValue < currentValue) {
                    getCountAnimationValue(targetValue, currentValue - 1, element, currentDirection);
                }
            }
        }, 10);
    };

}(jQuery));

;

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

;

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

;

(function($) {
    'use strict';

    /**
     * Init the layout checks
     */
    $.pepperLayout = function() {
        fixedCheck();

        $(window).load(function() {
            fixedCheck();
        });

    };

    var fixedCheck = function() {
        if($('body').hasClass('header-fixed')) {
            $('.wrap > .content').css('padding-top', $('.header').outerHeight(true));
        }
        if($('body').hasClass('footer-fixed') || $('body').hasClass('footer-bottom')) {
            $('.wrap .footer-push').css('height', $('.wrap > .footer').outerHeight(true));
        }
    }

}(jQuery));

;

(function($) {
    'use strict';

    /**
     * Init the move-fixed support
     */
    $.pepperMoveFixed = function() {

        $(window).load(function() {
            if($('.move-fixed').length > 0) {
                $('.move-fixed').each(function() {
                    if($('body').hasClass('header-fixed')) {
                        $(this).attr('data-startTop', 0);
                    } else {
                        $(this).attr('data-startTop', $(this).offset().top);
                    }
                });

                moveFixed();

                $(window).scroll(function() {
                    moveFixed();
                });

                $(window).resize(function() {
                    moveFixed();
                });
            }
        });
    };

    var moveFixed = function() {

        var scrollTop = $(window).scrollTop();

        if($('.move-fixed').length > 0) {
            $('.move-fixed').each(function() {
                if(scrollTop > $(this).attr('data-startTop')) {
                    $(this).css('width', 'auto');
                    $(this).css('width', $(this).parent().width() - 1);
                    $(this).css('position', 'fixed');

                    if($('body').hasClass('header-fixed')) {
                        $(this).css('top', $('.header').outerHeight(true));
                    } else {
                        $(this).css('top', '0px');
                    }

                    $(this).find('.to-top').css('display', 'block');
                } else {
                    $(this).css('position', 'static');
                    $(this).css('width', '');
                    $(this).find('.to-top').hide();
                }
            });
        }

    }

}(jQuery));

;

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

;

(function($) {
    'use strict';

    /**
     * Default Options
     *
     * @type {{id: boolean, type: string, hideDelay: number, closeAble: boolean, closeButton: string, position: string}}
     */
    var defaultOptions = {
        'id': false,
        'type': 'primary',
        'hideDelay': 2500,
        'closeAble': true,
        'closeButton': '<i class="fa fa-times"></i>',
        'position': 'bottom-right'
    };

    /**
     * Change the Setting for all notifications
     *
     * @param options Options for the notifications
     */
    $.pepperNotifySetOptions = function(options) {

        $.extend(defaultOptions, options)

    }

    /**
     * Add a Notification
     *
     * @param html Html styled text to show
     * @param options Options for the notification
     */
    $.pepperNotify = function(html, options) {

        var settings = $.extend({}, defaultOptions, options);
        var posX = settings.position.split('-')[0];

        var holder = $('#pepper-notify-' + settings.position);

        if(holder.length == 0) {
            holder = $('<div/>', {
                'id': 'pepper-notify-' + settings.position,
                'class': 'notify-holder notify-' + settings.position
            }).appendTo('body');
        }

        var element = $('<div/>', {
            'class': 'animated notify notify-' + settings.type,
            'html': html
        }).prependTo(holder);
        element.data('pos', posX);

        if(posX == 'top') {
            element.addClass('fadeInDown');
        } else {
            element.addClass('fadeInUp');
        }

        if(settings.id) {
            var lastElement = $('#notify-' + settings.id);
            if(lastElement.length > 0) {
                lastElement.remove();
            }
            element.attr('id', 'notify-' + settings.id)
        }

        if(settings.hideDelay == false) {
            if(settings.closeAble == true) {
                element.addClass('notify-closable');
                var closeBtn = $('<button/>', {
                    'class': 'notify-close',
                    'html': settings.closeButton
                }).appendTo(element);

                closeBtn.click(function() {
                    hideElement(element);
                });
            }
        } else {
            setTimeout(function() {
                hideElement(element);
            }, settings.hideDelay);

        }
    };

    /**
     * Removes a specific or all Notifications
     *
     * @param notifyID If not set, all notification will be deleted
     */
    $.pepperNotifyRemove = function(notifyID) {

        if(isDefined(notifyID)) {
            hideElement($('#notify-' + notifyID));
        } else {
            hideElement($('.notify-holder .notify'));
        }

    };

    function hideElement(element) {

        if(element.data('pos') == 'top') {
            element.removeClass('fadeInDown');
            element.addClass('fadeOutUp');
        } else {
            element.removeClass('fadeInUp');
            element.addClass('fadeOutDown');
        }

        element.fadeOut(500, function(){
            $(this).remove();
        });
    }

}(jQuery));

;

(function($) {
    'use strict';

    var parallaxItems = [];

    /**
     * Init the parallax support
     */
    $.pepperParallax = function() {
        $(window).load(function() {

            $('.parallax-scroll').each(function () {
                var speed = $(this).data('speed');

                if(!isDefined(speed)) {
                    speed = 0.5;
                }

                if($(this).is('img')) {
                    $(this).data('initTop', $(this).css('top'));
                }

                var verticalPosition = $(this).css('background-position').split(' ')[0];
                parallaxItems.push({'object': $(this), 'speed': speed, 'vertical': verticalPosition});

                pepperParallax($(this), speed, verticalPosition);
            });

        });

        $(window).scroll(function() {
            $.each(parallaxItems, function() {
                pepperParallax(this.object, this.speed, this.vertical);
            });
        });
    };

    var pepperParallax = function(target, speed, verticalPosition){
        var scrollTop = $(window).scrollTop();
        var documentBottom = $(window).scrollTop() + $(window).height();
        var elementTop = target.offset().top;

        if(target.is('img')) {
            var targetTop = parseInt(target.data('initTop'));
            var targetPosition = target.css('position');

            if(targetPosition == 'fixed') {
                target.css('top', (targetTop + (scrollTop * speed)) + 'px');
            } else if (targetPosition == 'absolute') {
                target.css('top', (targetTop - (scrollTop * speed)) + 'px');
            }
        } else {
            var animationTop = elementTop - documentBottom;
            var animationOffset = (isDefined(target.data('offset'))) ? target.data('offset') : 0;
            console.log(animationOffset);
            target.css('background-position', verticalPosition + ' ' + (0 - (animationTop * speed) + animationOffset) + 'px');
        }
    }

}(jQuery));

;

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

;

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

;

(function($) {
    'use strict';

    /**
     * Shake an Element
     *
     * @param distance Distance in px to shake
     * @param runs How many times it shakes
     * @param speed Speed of the shake
     * @param distanceReduce Reduction of the distance for each following shake
     */
    $.fn.pepperShake = function(distance, runs, speed, distanceReduce) {
        var _distance = 10;
        var _speed = 100;
        var _runs = 3;
        var _distanceReduce = 0;

        if(isDefined(distance)) { _distance = distance; }
        if(isDefined(runs)) { _runs = runs; }
        if(isDefined(speed)) { _speed = speed; }
        if(isDefined(distanceReduce)) { _distanceReduce = distanceReduce; }

        var position = this.css('position');

        if(position == 'static') {
            this.css('position', 'relative');
        }

        for (var i = 0; i <= _runs; ++i) {
            if(i == 0) {
                this.animate({ left: '-' + _distance + 'px' }, _speed / 2).animate({ left: _distance + 'px' }, _speed);
            } else if (i == _runs) {
                this.animate({ left: '0px' }, _speed / 2, function() {
                    $(this).css('position', '').css('left', '');
                });
            } else {
                this.animate({ left: '-' + _distance + 'px' }, _speed).animate({ left: _distance + 'px' }, _speed);
            }
            _distance -= _distanceReduce;
        }
    };

}(jQuery));

;

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

;

(function($) {
    'use strict';

    /**
     * Init the tabs support
     */
    $.pepperTabInit = function() {

        $('body').on('click', '.tab-nav button, .tab-nav a', function(event) {
            event.preventDefault();
            showTabContent(this, true);
        });

        $(window).load(function() {

            $('.tab-nav').each(function() {
                if(window.location.hash != '') {
                    var hash = window.location.hash.substr(1);
                    var targetLink = $(this).closest('.tabs').find('[data-tab-link=' + hash + ']');

                    if(targetLink.length > 0) {
                        showTabContent(targetLink.eq(0));
                        return;
                    } else {
                        if($(this).find('li.active').eq(0).length > 0) {
                            showTabContent($(this).find('li.active [data-tab-link]').eq(0));
                        } else {
                            showTabContent($(this).find('li [data-tab-link]').eq(0));
                        }
                    }
                } else {
                    if($(this).find('li.active').eq(0).length > 0) {
                        showTabContent($(this).find('li.active [data-tab-link]').eq(0));
                    } else {
                        showTabContent($(this).find('li [data-tab-link]').eq(0));
                    }
                }

                if($(this).parent().hasClass('tabs-left') || $(this).parent().hasClass('tabs-right')) {
                    var tabHeight = $(this).height();

                    $(this).parent().find('.tab-content').each(function() {
                        if($(this).height() < tabHeight) {
                            $(this).height(tabHeight);
                        }
                    });
                }
            });

        });
    };

    $.pepperTabShow = function(id) {
        showTabContent($('[data-tab-link="' + id + '"]'));
    };

    var showTabContent = function(tabLink, setHash) {
        var tabName = $(tabLink).data('tab-link');
        var tabContainer = $(tabLink).closest('.tabs');
        var tabTarget = tabContainer.find('[data-tab-content=' + tabName + ']');

        var currentTab = tabContainer.find('li.active').find('button');
        if(isDefined(currentTab)) {
            var hideEvent = $.Event('hide-tab');
            hideEvent.target = $(currentTab);
            tabContainer.trigger(hideEvent);
        }

        if(tabTarget.length > 0) {
            tabContainer.find('.tab-content, .tab-nav li').removeClass('active');
            $(tabLink).parent().addClass('active');
            tabTarget.addClass('active');

            var showEvent = $.Event('show-tab');
            showEvent.target = $(tabLink);
            tabContainer.trigger(showEvent);

            if(isDefined(setHash) && setHash) {
                if(isDefined(tabContainer.data('tabs-hash'))) {
                    window.location.hash = tabName;
                }
            }
        }
    }

}(jQuery));

;

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

;

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

