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

}(jQuery));