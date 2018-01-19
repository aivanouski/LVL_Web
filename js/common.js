function setLangDependsOnBrowser() {
    navigator.language || navigator.userLanguage;
    var cur_lang=(navigator.language || navigator.userLanguage).substr(0,2);
 
    $.ajax({
        url: "js/en.json",
        dataType:"json",
        async: false
    }).done(function(data) {
        lang_en = data;
    });

    setLang(cur_lang);
}

function setLang(e) {
    "ru" == e ? $("html").attr("lang", "ru") :  $("html").attr("lang", "en")
    
    if (['ru','en','de','fr','zh','ko','es'].indexOf(e) == -1)
        e = 'en';

    if (e=='ru') {
        $('#how_to_invest_a').attr('href','files/How to Invest in LevelNet.pdf');
    } else {
        $('#how_to_invest_a').attr('href','files/How to Invest in LevelNet(eng).pdf');
    }
    $.ajax({
        url: "js/"+e+".json",
        dataType:"json",
        async: false
    }).done(function(data) {
        lang = data;
        setPgText(lang);
    });
}

function setPgText(e) {
    for (key in lang_en) {
        if (key == "placeholder") {
            $("input").attr("placeholder", e[key] ? e[key] : lang_en[key]);
        } else {
            $("[data-pg-key=" + key + "]").html(e[key] ? e[key].replace('\n','<br>') : lang_en[key].replace('\n','<br>'));

        }
    }
}

function findParent(e, t) {
    for (; !e.hasClass(t);)
        if (e = e.parent(), "body" == e.prop("tagName").toLowerCase()) return;
    return e
}

function preventScrolling(e) {
    "keydown" == e.type ? "40" != e.keyCode && "38" != e.keyCode || (e.preventDefault(), e.stopImmediatePropagation()) : "wheel" == e.type ? (e.preventDefault(), e.stopImmediatePropagation()) : "touchstart" == e.type ? this.firstCoord = this.getTouchCoord(e) : "touchmove" == e.type ? this.lastCoord = this.getTouchCoord(e) : "touchend" == e.type && (this.lastCoord - this.firstCoord > 10 ? (e.preventDefault(), e.stopImmediatePropagation()) : this.lastCoord - this.firstCoord < -10 && (e.preventDefault(), e.stopImmediatePropagation()))
}

function getUrlParam(name) {
    return (location.search.split(name + '=')[1] || '').split('&')[0];
}

function setProgressBar (raised) {
    // var percent=(raised ? raised/55000000*100 : 0);
    $('.raised_now span').text(raised);
    raised=raised.replace(' ','');
    var percent=(raised ? raised/12000000*100 : 0);

    if (raised<=1500000) {
      percent=(raised ? raised/1500000*30 : 0);
      $('.bar-wrapper .bar-left-0-soft, .bar-wrapper .bar-left-1-soft').css('width',percent+'%');
      $('.bar-wrapper .bar-triangle-left').css('left',percent+'%');
      $('.bar-wrapper .bar-left-0-hard, .bar-wrapper .bar-left-1-hard').css('width','0%');
      $('.bar-triangle-soft').show();

    } else {
      // percent=(raised ? 30+(raised-1500000)/53500000*70 : 0);
      percent=(raised ? 30+(raised-1500000)/10500000*70 : 0);
      percent = percent>100 ? 100 : percent;
      $('.bar-triangle-soft').hide();
      $('.bar-wrapper .bar-left-0-soft, .bar-wrapper .bar-left-1-soft').css('width','30%');
      
      $('.bar-wrapper .bar-left-0-hard, .bar-wrapper .bar-left-1-hard').css('width',(percent-30)+'%');
      $('.bar-wrapper .bar-triangle-left').css('left',percent+'%');
    }
    $('.bar-wrapper .bar-title-4').css('left','calc('+(percent)+'% + 40px)');
    $('.bar-wrapper .bar-title-4 .relative span').text('$ '+(raised ? Math.round(raised).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0));
}



function calculateData(TotalBought,TotalETH,TotalUSD,TotalBTC) {
            TotalBought = parseInt(TotalBought);
            var Total_USD_ETH=window.ETHUSD*parseFloat(TotalETH);
            var Total_BTC_ETH=window.BTCUSD*parseFloat(TotalBTC);
            var Total_Raised_USD=parseFloat(Total_USD_ETH)+parseFloat(Total_BTC_ETH)+parseFloat(TotalUSD);
            var prc_TotalBought=TotalBought ? TotalBought/70000000 : 0;
            // console.log(Total_USD_ETH,Total_BTC_ETH,Total_Raised_USD,prc_TotalBought);
            // if (TotalBought ==0 || prc_TotalBought < 0.1){
            if (TotalBought ==0 || prc_TotalBought <= 1){
                var sub_moneyback_val=0.15*Total_Raised_USD;
                var sub_buyback_val=0.10*Total_Raised_USD;
                var sub_dev_val=0.60*Total_Raised_USD;
                var sub_operations_val=0.15*Total_Raised_USD;
                var sub_reserve_val=0;
            }


            $('#sub_moneyback_val').text(sub_moneyback_val ? Math.round(sub_moneyback_val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
            $('#sub_buyback_val').text(sub_buyback_val ? Math.round(sub_buyback_val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
            $('#sub_dev_val').text(sub_dev_val ? Math.round(sub_dev_val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
            $('#sub_operations_val').text(sub_operations_val ? Math.round(sub_operations_val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
            $('#sub_reserve_val').text(sub_reserve_val ? Math.round(sub_reserve_val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);

            if (prc_TotalBought<0.1) {$('.nowhere').hide().siblings('button').removeClass('current'); $('.nowhere10').show().siblings('button').addClass('current');}
            if (prc_TotalBought<0.2 && prc_TotalBought>=0.1) {$('.nowhere').hide().siblings('button').removeClass('current'); $('.nowhere20').show().siblings('button').addClass('current')}
            if (prc_TotalBought>0.2) {$('.nowhere').hide().siblings('button').removeClass('current'); $('.nowhere100').show().siblings('button').addClass('current')}


            setProgressBar(Total_Raised_USD);
            
}


var lang_en = {};
var lang_es = {};
var lang_zh = {};



if (getUrlParam('pa')) {
    Cookies.set('lvl_pa', getUrlParam('pa'), { expires: 30 });

}
if (getUrlParam('pa') || Cookies.get('lvl_pa')) {
    var  Referral = getUrlParam('pa') ? getUrlParam('pa') : Cookies.get('lvl_pa');
    $.post("https://rp.levelnet.co/stat/pa_click", JSON.stringify({referer:document.referrer, pa:Referral}));
}

function getExchangeRate() {
$.ajax({
    url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    dataType: "json",
    async: false,
    success: function(data) {
        window.ETHUSD = parseFloat(data.USD);
        console.log('ETHUSD',window.ETHUSD);
    }
});
$.ajax({
    url: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD',
    dataType: "json",
    async: false,
    success: function(data) {
        window.BTCUSD = parseFloat(data.USD);   
        console.log('BTCUSD',window.BTCUSD);
    }
});  
}

getExchangeRate();
setInterval(function() {
    getExchangeRate();
    var TotalBought=$($('#INSP')[0].contentWindow.document).find('.IcoProcess__bar-huge-value').text();
    var TotalETH=$($('#INSP')[0].contentWindow.document).find('.IcoProcess__bar-value').eq(0).find('span').first().text();
    var TotalUSD=$($('#INSP')[0].contentWindow.document).find('.IcoProcess__bar-value').eq(1).find('span').first().text();
    var TotalBTC=$($('#INSP')[0].contentWindow.document).find('.IcoProcess__bar-value').eq(2).find('span').first().text();
    calculateData(TotalBought,TotalETH,TotalUSD,TotalBTC);
},300000);

 

$('[data-lang]').on('click', function() {setLang($(this).data('lang'))});

setLangDependsOnBrowser(),
    function() {
        function e() {
            $(".main-header").removeClass("menu-open"), $("body").off("wheel touchstart keydown", preventScrolling)
        }

        function t(e) {
            if (n) {
                e = e || 0;
                var t = $(".langs-wrapper");
                setTimeout(function() {
                    t.animate({
                        height: 0
                    }), n = !1
                }, e)
            }
        }

        function a(e) {
            e = $(e.target), $(".header-lang").addClass("opened"), findParent(e, "header-lang").find(".langs-wrapper").animate({
                height: i
            }), setTimeout(function() {
                n = !0
            }, 50)
        }
        
        var o = $(".main-header").innerHeight();
        $("body").on("click", ".main-nav a", function(e) {
            e.preventDefault();
            var t = $(this);
            $(".main-header.menu-open .menu-trigger").click();
            var a = t.attr("href").slice(t.attr("href").indexOf("#"));
            if (0 == $(a).length) t.attr("href").indexOf("http") > -1 ? (window.open(t.attr("href")), console.log(1)) : (window.open(t.attr("href"), "_self"), console.log(2));
            else {
                var n = $(a).offset().top - o;
                $("body,html").animate({
                    scrollTop: n
                }, 600, function() {
                    window.location.hash = a
                })
            }
        }), $(".menu-trigger, .shim").on("click", function() {
            $(".main-header").hasClass("menu-open") ? e() : ($(".main-header").addClass("menu-open"), $("body").on("wheel touchstart keydown", preventScrolling))
        });
        var n = !1,
            i = $(".langs-wrapper li").length * $(".langs-wrapper li").innerHeight();
        $(".current-lang").on("click", function(e) {
            $(".header-lang").removeClass("opened");
            var o = $(this);
            o.hasClass("active") ? (o.removeClass("active"), t()) : (o.addClass("active"), a(e))
        }), $(".langs-wrapper li").on("click", function() {
            var e = $(this);
            $(".header-lang").find(".current-lang").text(e.text()), $(".header-lang").find(".current").removeClass("current"), setLang(e.attr("data-lang")), $(".header-lang [data-lang=" + $("html").attr("lang") + "]").addClass("current"), $(".current-lang.active").click()
        }), $(".header-lang [data-lang=" + $("html").attr("lang") + "]").addClass("current"), $(window).on("scroll", function() {
            $(".current-lang.active").click()
        }), $("body").on("click", function(e) {
            findParent($(e.target), "header-lang") || $(".current-lang.active").click()
        })
    }();


