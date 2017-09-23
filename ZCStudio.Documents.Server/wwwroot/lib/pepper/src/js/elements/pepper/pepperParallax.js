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

