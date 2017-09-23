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

