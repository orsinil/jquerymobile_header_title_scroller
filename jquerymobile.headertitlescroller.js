/*!
* jQuery Mobile Framework : header title scroller plugin
* Copyright (c) e-media, snc
* Authored by Luca Osrini, orsinil@inwind.it
* Dual licensed under the MIT or GPL Version 2 licenses.
*/

﻿
﻿function realWidth(cnt) {
    var $objTmp = cnt.clone().contents().wrap('<div id="content" style="padding-left:5px;position: absolute;overflow: hidden;text-overflow: ellipsis;"/>').parent().appendTo(".ui-title");
    var res = $objTmp.width() + 10;
    $objTmp.remove();
    return res;
}

function animate(scroller, deltaDistanza, time, cnt) {
    scroller.delay(400).animate({
        left: -deltaDistanza,
        right: 0
    }, time, 'linear', function () {
        scroller.delay(400).animate({
            left: 0,
            right: 0
        }, time / 4, 'linear', function () {
            animate(scroller, deltaDistanza, time, cnt);
        }
);
    });
}
$(document).bind("pageshow", function (event, ui) {
    var curPage = $.mobile.activePage;
    var cnt = curPage.find(".ui-title");

    var deltaDistanza = realWidth(cnt) - $(cnt).width();
    var time = parseInt((deltaDistanza / 100) * 2100, 10);

    if (deltaDistanza > 0 && cnt.length > 0) {
        var _header = curPage.find(".ui-header");
        var _styleSfum = "background-position:-" + $(cnt).position().top + "px;background-size:1px " + _header.height() + "px;position:relative;width:1px;z-index:1;border:none !important;height:" + $(cnt).height() + "px;";

        var scroller = $(cnt).contents().wrap('<div id="content" style="padding-left:5px;position: absolute;overflow: hidden;">').parent();
        cnt.css({ width: cnt.width() + "px", position: "relative", textAlign: "left" });
        var _l1 = $('<div style="' + _styleSfum + 'opacity:.9;float:left" class="ui-bar-b"></div>');
        var _l2 = $('<div style="' + _styleSfum + 'opacity:.7;float:left" class="ui-bar-b"></div>');
        var _l3 = $('<div style="' + _styleSfum + 'opacity:.5;float:left" class="ui-bar-b"></div>');
        var _l4 = $('<div style="' + _styleSfum + 'opacity:.3;float:left" class="ui-bar-b"></div>');
        var _l5 = $('<div style="' + _styleSfum + 'opacity:.1;float:left" class="ui-bar-b"></div>');
        var _r1 = $('<div style="' + _styleSfum + 'opacity:.9;float:right" class="ui-bar-b"></div>');
        var _r2 = $('<div style="' + _styleSfum + 'opacity:.7;float:right" class="ui-bar-b"></div>');
        var _r3 = $('<div style="' + _styleSfum + 'opacity:.5;float:right" class="ui-bar-b"></div>');
        var _r4 = $('<div style="' + _styleSfum + 'opacity:.3;float:right" class="ui-bar-b"></div>');
        var _r5 = $('<div style="' + _styleSfum + 'opacity:.1;float:right" class="ui-bar-b"></div>');
        $(cnt).wrap('<div id="Container"/>').prepend(_l5).prepend(_l4).prepend(_l3).prepend(_l2).prepend(_l1).append(_r1).append(_r2).append(_r3).append(_r4).append(_r5);
        animate(scroller, deltaDistanza, time, cnt);
    }
});
