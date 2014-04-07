/*jslint browser: true, indent: 4, regexp: true*/
/*global $*/

(function() {
    'use strict';

    // Scroll to bottom of the messages on page load
    $(".chat-area").scrollTop($(".chat-area")[0].scrollHeight);

    // Add a class while scrolling so we can do cool stuff
    $(function() {
        var timeout;

        $(".chat-area").on("scroll", function() {
            if(timeout) clearTimeout(timeout);

            timeout = setTimeout(function(){
                $("body").removeClass("scrolling");
                timeout = 0;
            }, 1000);

            $("body").addClass("scrolling");
        });
    });

    // Handle tabs
    $(function() {
        var tabs = [];

        $(".tabs > li").each(function() {
            var classlist = $(this).attr('class').split(/ +/);

            for (var i = 0; i < classlist.length; i++) {
                if (classlist[i].length > 0 && classlist[i].match(/^tab-([a-z]+)$/)) {
                    tabs.push(classlist[i]);
                }
            }
        });

        $(".tabs > li").on("click", function() {
            if (!$(this).hasClass("notab")) {
                for (var i = 0; i < tabs.length; i++) {
                    if ($(this).hasClass(tabs[i])) {
                        $("." + tabs[i]).addClass("current");
                    } else {
                        $("." + tabs[i]).removeClass("current");
                    }
                }
            }
        });
    });

    // Expand long messages
    $(".long").on("click", function() {
        $(this).toggleClass("active").scrollTop(0);
    });

    // Show and hide panes in responsive view
    $(".roomlist, .scrollback-header").on("click", function() {
        $("body").toggleClass("roomsinview");
    });

    $(".menu, .title").on("click", function() {
        $("body").toggleClass("metainview");
        $("body").removeClass("roomsinview");
    });

    // Handle swipe gestures (requires jQuery mobile touch events component)
    $("body").on("swiperight", function() {
        if ($("body").hasClass("metainview")) {
            $("body").addClass("roomsinview");
        } else {
            $("body").addClass("metainview");
        }
    });

    $("body").on("swipeleft", function() {
        if ($("body").hasClass("roomsinview")) {
            $("body").removeClass("roomsinview");
        } else {
            $("body").removeClass("metainview");
        }
    });
}());
