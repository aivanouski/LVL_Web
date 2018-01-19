$(document).ready(function() {
    function a() {
        var a = 0;
        $(e + " " + i + " " + t).each(function() {
            var s = $(e + ":eq(" + a + ") " + i + " " + t);
            s.attr("data-height", s.outerHeight()), a++
        })
    }
    var e = ".faq-single-item",
        i = ".faq-answer",
        t = ".text";
    a(), $(e + ":eq(0)").addClass("active"), $(e + ":gt(0)").addClass("hide"), $(e).on("click", function() {
        var a = $(this);
        if (!a.hasClass("active")) {
            var s = a.find(i);
            s.css("height", s.find(t).attr("data-height") + "px"), $(e + ".active").find(i).css("height", "0px"), $(e + ".active").addClass("hide").removeClass("active"), a.addClass("active").removeClass("hide"), setTimeout(function() {
                $("body,html").animate({
                    scrollTop: a.offset().top - $(".main-header").innerHeight()
                }, 600)
            }, 500)
        }
    }), $(window).on("resize", function() {
        $(e).find(i).css("height", "auto"), $(e).removeClass("hide"), a(), $(e).each(function() {
            var a = $(this);
            a.hasClass("active") || a.find(i).css("height", "0px")
        })
    })
});