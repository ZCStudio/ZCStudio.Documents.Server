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
}