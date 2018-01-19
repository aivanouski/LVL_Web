var chkMob = window.innerWidth < 580;

$(document).ready(function(){

    $.ajax({
        url: "/get_data",
        dataType: "json",
        success: function(t) {
           setProgressBar(t.value);
           console.log(t.value);
        },
        error: function(t, e, a) {
            console.log("error");
            
            console.log(t + " " + e + " " + a)
        },
        async: !1
    });


    $('.social, .about-info, .about-video, section.features, #ico, .structure, .bounties, section.escrow, #roadmap, #team, .advisors, .partners, .press, .documents').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceIn',
        offset: 50
    });
    $("#carousel").flipster({
          style: 'carousel',
          spacing: -0.45,
          nav: false,
          // buttons: true,
          loop:true,
          buttons: 'custom',
        buttonPrev: '<div class="carousel_nav carousel_left"></div>',
        buttonNext: '<div class="carousel_nav carousel_right"></div>',
          //buttonPrev: '<img src="/images/ul-arrow.png" class="carousel_nav carousel_left">',
          //buttonNext: '<img src="/images/ul-arrow.png" class="carousel_nav carousel_right">',
          onItemSwitch: function(currentItem, previousItem) {
            console.log(currentItem);
            $('#buttonBox-hidden-video .description h1').text($(currentItem).data('flip-title'));
            // $('#buttonBox-hidden-video .description p').text($(currentItem).find('.descr h1').text());
            
          }
    });
    // $('#important_notice_btn').css('width',$('.buttonBox').width()+'px');
    if (Cookies.get('notice1')!=2) {
        $('#important_notice_btn').addClass('unread');
    }
});

function manageBonusesView() {
    for (var t = $("section.top_part .single-bonus"), e = ["0.60", "0.75", "0.85", "0.90", "0.95", "0.98", "1.00"], a = 0; a < t.length; a++) {
        if (!(t[a].getAttribute("data-utc-time") < time_now)) {
            if (t[a].classList.add("active"), t[a].classList.remove("non-active"), $(".lvl-price-num").text(e[a]), a + 1 < t.length) {
                var i = t[a + 1].getAttribute("data-utc-time") - t[a].getAttribute("data-utc-time"),
                    n = Math.floor(i / 60 / 60 / 24);

                    $('[class^=discountstxtunit]').removeClass('active');
                    $(t[a].getAttribute("data-discounts-txt")).addClass('active');
                try {
                    t[a].querySelector(".days-left .days-num").innerText = n
                } catch (t) {}
            }
            break
        }
        t[a].classList.add("passed"), t[a].classList.remove("non-active")
    }
}

function loadData(t) {
    $.ajax({
        url: "url",
        dataType: "json",
        success: function(t) {
            var e = t,
                a = 0;
            for (key in e) data_fields[a].text(e[key]), a++
        },
        error: function(t, e, a) {
            console.log("error");
            for (key in t) console.log(key + t[key]);
            console.log(t + " " + e + " " + a)
        },
        async: !1
    })
}
var mainPlayer;
function onYouTubeIframeAPIReady() {
    var t = {
            height: "315",
            width: "560",
            videoId: "5uC6wBAKrIE",
            playerVars: {
                autoplay: 0,
                iv_load_policy: 3,
                modestbranding: 0,
                showinfo: 0
            },
            events: {
                onReady: onPlayerReady
            }
        },
        e = {
            height: "315",
            width: "560",
            videoId: "fDLfvA9EqNU",
            playerVars: {
                autoplay: 0,
                iv_load_policy: 3,
                modestbranding: 0,
                showinfo: 0
            },
            events: {
                onReady: onPlayerReady
            }
        },
        ee = {
            playerVars: {'rel': 0, 'loop': 1, 'showinfo': 0},
            height: "100%",
            width: "100%",
            videoId: "t_u2mc7SFBk",
            rel: 0,
            events: {
                'onReady': function(event) {
                    event.target.playVideo();event.target.setVolume(0);
                    var video = $('#videoBox');
                    video.removeClass('hidden1');
                },
                'onStateChange': function(event) {

                }
            }
        };
    player.push(new YT.Player("player1", t)), player.push(new YT.Player("player2", e));

    if(!chkMob) mainPlayer = new YT.Player("mainPlayer", ee);
}

function onPlayerReady(t) {
    var e = $(".video-content");
    $("body");
    e.each(function() {
        $(this).data("aspectRatio", this.height / this.width).removeAttr("height").removeAttr("width")
    }), $(window).resize(function() {
        e.each(function() {
            var t = $(this).parent().width(),
                e = $(this);
            e.width(t).height(t * e.data("aspectRatio"))
        })
    }).resize()
}
var ts = new Date(Date.UTC(2017, 10, 1, 0, 0));
var time_now = Date.now();
manageBonusesView();
var data_fields = [$(".top_part .currencies .amount")[0], $(".top_part .currencies .data-info")[0], $(".top_part .currencies .amount")[1], $(".top_part .currencies .data-info")[1], $(".top_part .currencies .amount")[2], $(".top_part .currencies .data-info")[2]];

var ctxConfig = [
    {
        data: [85, 15],
        backgroundColor: ["#1fa84d","#fec101"],
        structures: [ 3, 5],
        labels: [3, 5],
        title: "$0"
    },
    {
        data: [15, 35, 45, 5],
        backgroundColor: ["#ff1515","#00ccff","#1fa84d","#fec101"],
        structures: [1, 2, 3, 5],
        labels: [1, 2, 3, 5],
        title: "$0"
    },
    {
        data: [15, 40, 35, 5, 5],
        backgroundColor: ["#ff1515","#00ccff","#1fa84d","#fec101","#222"], // red, blue, green, yellow, black
        structures: [1, 2, 3, 5, 4],
        labels: [1, 2, 3, 5, 4],
        title: "$0"
    }
];

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [],

            backgroundColor: []
        }],
        labels: []
    },
    options: {
        responsive: true,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        title:{
            display:true,
            //text:'$ 7,000,000'
        },
        animation: {
            onProgress: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);

                var width = this.chart.width,
                    height = this.chart.height;

                ctx.textBaseline = "middle";

                var text = "Current total",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2 + 10;

                ctx.fillStyle = '#222';
                ctx.fillText(text, textX, textY);
                ctx.fillText(ctxConfig[cfg].title, textX, (textY + 20));

                this.data.datasets.forEach(function (dataset) {

                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                            total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                            mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
                            start_angle = model.startAngle,
                            end_angle = model.endAngle,
                            mid_angle = start_angle + (end_angle - start_angle)/2;

                        var x = mid_radius * Math.cos(mid_angle);
                        var y = mid_radius * Math.sin(mid_angle);

                        ctx.fillStyle = '#fff';
                        //dataset.backgroundColor[i]
                        var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
                        //ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                        // Display percent in another line, line break doesn't work for fillText
                        ctx.fillText(percent, model.x + x - 5, model.y + y);
                    }
                });
            }
        }
    }
};

Chart.defaults.global.tooltips.custom = function(tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
            tooltipEl.classList.add(tooltip.yAlign);
        } else {
            tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
            return bodyItem.lines;
        }

        // Set Text
        if (tooltip.body) {
            var titleLines = tooltip.title || [];
            var bodyLines = tooltip.body.map(getBody);

            var innerHtml = '<li class="graph-popup">';

            titleLines.forEach(function(title) {
                innerHtml += '<div>' + title + '</div>';
            });

            bodyLines.forEach(function(body, i) {

                var bodys = String(body).split(":");

                body = lang_en['structure_popup_' + bodys[0]];

                var colors = tooltip.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px'; 
                var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                innerHtml += '<div>' + body + '</div>';
            });
            innerHtml += '</li>';

            var ulRoot = tooltipEl.querySelector('ul');
            ulRoot.innerHTML = innerHtml;
        }

        var positionY = this._chart.canvas.offsetTop;
        var positionX = this._chart.canvas.offsetLeft;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        //tooltipEl.style.fontFamily = tooltip._fontFamily;
        tooltipEl.style.fontSize = tooltip.fontSize;
        tooltipEl.style.fontStyle = tooltip._fontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

! function() {

    $('.bonuses .single-bonus').hover(
        function(){
            var t = $(this);

            t.find('.step').css("background-color","#1fa84d");

            $('[class^=discountstxtunit]').removeClass('active');
            $(t.attr("data-discounts-txt")).addClass('active');
        },
        function(){
            $('.bonuses .single-bonus').find('.step').removeAttr('style');
            $('[class^=discountstxtunit]').removeClass('active');
            $('[class^=discountstxtunit].current').addClass('active');
        }
    );

    var ctx = $("#ico-chart");
    var grf = $(".graph-funds .graph-subtitle-wrapper");

    window.onload = function() {

        grf.empty();

        ctxConfigData = ctxConfig[0].data;
        ctxConfigStruct = ctxConfig[0].structures;

        for (var key in ctxConfigStruct)
        {
            var className = "graph-subtitle_" + ctxConfigStruct[key];

            var li = $('<li/>').addClass('graph-subtitle ' + className);
            li.append($('<div/>').addClass('subtitle').html(lang_en['structure_subtitle_' + ctxConfigStruct[key]] + '<b>' + ctxConfigData[key] + '%</b>'));
            grf.append(li);
        }

        config.data.datasets.forEach(function(dataset) {
            dataset.data = ctxConfig[0].data;

            dataset.backgroundColor = ctxConfig[0].backgroundColor;
        });

        config.data.labels = ctxConfig[0].labels;

        window.myDoughnut = new Chart(ctx, config);
    }

    cfg = 0;

    $('[data-ctx-config]').on('click', function(){
        var t = $(this);

        cfg = t.data('ctx-config');

        $('[data-ctx-config]').removeClass('current');
        t.addClass('current');

        ctxConfigData = ctxConfig[cfg].data;
        ctxConfigStruct = ctxConfig[cfg].structures;

        config.data.datasets.forEach(function(dataset) {
            dataset.data = ctxConfigData;
            dataset.backgroundColor = ctxConfig[cfg].backgroundColor;
        });

        config.data.labels = ctxConfig[cfg].labels;

        grf.empty();

        for (var key in ctxConfigStruct)
        {
            var className = "graph-subtitle_" + ctxConfigStruct[key];

            var li = $('<li/>').addClass('graph-subtitle ' + className);
            li.append($('<div/>').addClass('subtitle').html(lang_en['structure_subtitle_' + ctxConfigStruct[key]] + '<b>' + ctxConfigData[key] + '%</b>'));
            grf.append(li);
        }

        window.myDoughnut.update();
    });
}(),
function() {
    var t, e = $(".line-chart").find(".chart-val");
    for (t = e.length; t--;) $(e[t]).css({
        width: $(e[t]).html()
    })
}(),
function() {
    function t(t) {
        var n = t || i.find(".active").parent();
        e.width() >= 1024 ? a.css({
            left: n[0].offsetLeft + 10
        }) : a.removeAttr("style")
    }
    var e = $(window),
        a = $(".box-triangle"),
        i = $(".steps-wrapper .single-step");
    $(".steps-content-wrapper").bxSlider({
        speed: 300,
        infiniteLoop: !1,
        controls: !1,
        adaptiveHeight: !0,
        pagerCustom: ".steps-wrapper",
        onSliderLoad: function() {
            t($(".single-step").eq(0))
        },
        onSlideAfter: function() {
            t()
        }
    });
    i.each(function() {
        $(this).on("click", function(e) {
            t($(this))
        })
    })
}(), $(".hexagon-slider").bxSlider({
    speed: 300,
    minSlides: 1,
    maxSlides: 4,
    moveSlides: 1,
    slideWidth: 202,
    infiniteLoop: !0,
    controls: !0,
    adaptiveHeight: !1,
    pager: !1,
    autoHover: true,
    auto: true
});
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player = [];
$(".video-close, .video").on("click", function(t) {}), $(".about .video-shim").on("click", function() {
    $this = $(this), $this.css("display", "none"), $this.closest(".about-video").addClass("video-played");
    var t = parseInt($this.next().height()) / parseInt($this.next().width());
    $this.next().animate({
        width: $(".about-video").innerWidth(),
        height: $(".about-video").innerWidth() * t
    }, function() {
        $(window).resize(), player[$this.next().attr("data-player")].playVideo()
    })
});
 $(window).on('load', function() {
    var labels = ['days', 'hours', 'minutes', 'seconds'],
      template = _.template($('#main-example-template').html()),
      currDate = '00:00:00:00:00',
      nextDate = '00:00:00:00:00',
      parser = /([0-9]{2})/gi,
      $example = $('#main-example');
    // Parse countdown string to an object
    function strfobj(str) {
      var parsed = str.match(parser),
        obj = {};
      labels.forEach(function(label, i) {
        obj[label] = parsed[i]
      });
      return obj;
    }
    // Return the time components that diffs
    function diff(obj1, obj2) {
      var diff = [];
      labels.forEach(function(key) {
        if (obj1[key] !== obj2[key]) {
          diff.push(key);
        }
      });
      return diff;
    }
    // Build the layout
    var initData = strfobj(currDate);
    labels.forEach(function(label, i) {
      $example.append(template({
        curr: initData[label],
        next: initData[label],
        label: label
      }));
    });
    // Starts the countdown
    $example.countdown(new Date(Date.UTC(2018,0,16,0,0)), function(event) {
      var newDate = event.strftime('%D:%H:%M:%S'),
        data;
      if (newDate !== nextDate) {
        currDate = nextDate;
        nextDate = newDate;
        // Setup the data
        data = {
          'curr': strfobj(currDate),
          'next': strfobj(nextDate)
        };
        // Apply the new values to each node that changed
        diff(data.curr, data.next).forEach(function(label) {

          var selector = '.%s'.replace(/%s/, label),
              $node = $example.find(selector);

          $('span#timeDays').text(data.next['days']);
          // Update the node
          $node.removeClass('flip');
          $node.find('.curr').text(data.curr[label]);
          $node.find('.next').text(data.next[label]);
          // Wait for a repaint to then flip
          _.delay(function($node) {
            $node.addClass('flip');
          }, 50, $node);
        });
      }
    });
  });

$(document).ready(function(){
    var video = $('#videoBox');

    $('#max').on('click', function(e){
        e.preventDefault();

        var back = $('.back-box');

        if(video.hasClass('in')) {
                return false;
        } else {
            video.addClass('in');
            mainPlayer.setVolume(100);
        }
    });

    $('#min').on('click', function(e){
        e.preventDefault();

        if(video.hasClass('in')) {
            video.removeClass('in');
            mainPlayer.setVolume(0);
        } else {
            return false;
        }
    });

    $('#closeVideo').on('click', function(e){
        e.preventDefault();

        mainPlayer.destroy();

        video.addClass('hidden1');
    });
});