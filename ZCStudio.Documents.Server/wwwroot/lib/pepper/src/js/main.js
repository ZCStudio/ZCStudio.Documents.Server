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


