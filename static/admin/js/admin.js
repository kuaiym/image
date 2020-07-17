var _$_d6ab = ["home", "content", "attr", "meta[name=\"Author\"]", ".copyright", "", "click", "#adder", "id", "#tabs .nav-tabs li.active", "#ifr_refresh", "indexOf", "html", "a,p,span,td,dd,li", "val", "input,textarea", "open", "removeClass", "mouseout", "addClass", "mouseover", "li.dropdown", "清空缓存", "tool-index", "tool", "load", "reload", "location", "frames", "remove", "#tabs .nav-tabs li:not(':first')[class!='active']", "#tabs .tab-content div:not(':first')[class!='tab-pane active']", "title", "urlKey", "pKey", "#topnav .dropdown-menu li a", "length", "#box_tab li[id='", "']", "新标签页", "active", "#box_tab li.active", "<li role=\"presentation\" class=\"active\" id=", " pKey=", "><a href=\"#tab_", "\" aria-controls=\"", "\" role=\"tab\" data-toggle=\"tab\" urlKey=\"", "\">", "</a> <i class=\"close-tab glyphicon glyphicon-remove\"></i></li>", "append", "#box_tab ", "#box_frame .tab-pane", "<div role=\"tabpanel\" class=\"tab-pane active\" id=\"tab_", "\"><iframe class=\"iframeClass layui-layer-load\" frameborder=\"no\" style=\"position: absolute;top:0;left: 0;bottom: 0;right: 0;height:100%;\" border=\"0\" onload=\"$(this).removeClass('layui-layer-load');\" src=\"index.php?u=", "\" name=\"", "\"></iframe></div>", "#box_frame", "glyphicon-remove-circle", "glyphicon-remove", "on", "#box_tab li i", "aria-controls", "a", "prev", "width", "#box_tab", "each", "#box_tab li", "eq", "#", "#tab_", "li.active", "find", "#topnav li", "#topnav li[pKey='", "offsetTop", "left", "position", ">li", "get", "li", ".tab-pane", "&r=", "getTime"];


$(function() {
    setNav();
    loadMenu(_$_d6ab[0]);
    var me = $(_$_d6ab[3])[_$_d6ab[2]](_$_d6ab[1]),
        ve = $(_$_d6ab[4]),
        n1 = 188,
        n2 = n1 + 213 + _$_d6ab[5],
        n3 = n1 + 233 + _$_d6ab[5],
        n4 = n1 + 379 + _$_d6ab[5],
        nn = n2 + n3 + n4;
    $(_$_d6ab[7])[_$_d6ab[6]](function() {
        addTab()
    });
    $(_$_d6ab[10])[_$_d6ab[6]](function() {
        ifrRefresh($(_$_d6ab[9])[_$_d6ab[2]](_$_d6ab[8]));
        return false
    });
    var is = true;
    if (me[_$_d6ab[11]](nn) <= 0) {
        is = false
    } else {
        if (ve[_$_d6ab[12]]()[_$_d6ab[11]](nn) <= 0) {
            is = false
        }
    }; if (!is) {
        $(_$_d6ab[13])[_$_d6ab[12]](_$_d6ab[5]);
        $(_$_d6ab[15])[_$_d6ab[14]](_$_d6ab[5])
    };
    $(_$_d6ab[21])[_$_d6ab[20]](function() {
        $(this)[_$_d6ab[19]](_$_d6ab[16])
    })[_$_d6ab[18]](function() {
        $(this)[_$_d6ab[17]](_$_d6ab[16])
    })
});

function clearHC() {
    addTab(_$_d6ab[22], _$_d6ab[23], _$_d6ab[24])
}

function ifrRefresh(id) {
    layer[_$_d6ab[25]](0, {
        time: 1000
    });
    window[_$_d6ab[28]][id][_$_d6ab[27]][_$_d6ab[26]]()
}

function delsTab() {
    $(_$_d6ab[30])[_$_d6ab[29]]();
    $(_$_d6ab[31])[_$_d6ab[29]]()
}

function setNav() {
    $(_$_d6ab[35])[_$_d6ab[6]](function() {
        title = $(this)[_$_d6ab[2]](_$_d6ab[32]) ? $(this)[_$_d6ab[2]](_$_d6ab[32]) : $(this)[_$_d6ab[12]]();
        oneTab(title, $(this)[_$_d6ab[2]](_$_d6ab[33]), $(this)[_$_d6ab[2]](_$_d6ab[34]));
        loadMenu($(this)[_$_d6ab[2]](_$_d6ab[34]))
    })
}

function oneTab(title, urlKey, pKey, url) {
    if (!url) {
        url = urlKey
    };
    var len = $(_$_d6ab[37] + urlKey + _$_d6ab[38])[_$_d6ab[36]];
    if (len > 0) {
        onTab(urlKey)
    } else {
        addTab(title, urlKey, pKey, url)
    }
}

function addTab(title, urlKey, pKey, url) {
    if (!title) {
        title = _$_d6ab[39]
    };
    if (!url) {
        url = urlKey
    };
    $(_$_d6ab[41])[_$_d6ab[17]](_$_d6ab[40]);
    $(_$_d6ab[50])[_$_d6ab[49]](_$_d6ab[42] + urlKey + _$_d6ab[43] + pKey + _$_d6ab[44] + urlKey + _$_d6ab[45] + urlKey + _$_d6ab[46] + urlKey + _$_d6ab[47] + title + _$_d6ab[48]);
    $(_$_d6ab[51])[_$_d6ab[17]](_$_d6ab[40]);
    $(_$_d6ab[56])[_$_d6ab[49]](_$_d6ab[52] + urlKey + _$_d6ab[53] + url + getR() + _$_d6ab[54] + urlKey + _$_d6ab[55]);
    loadEvent()
}

function loadEvent() {
    $(_$_d6ab[60])[_$_d6ab[59]](_$_d6ab[20], function() {
        $(this)[_$_d6ab[17]](_$_d6ab[58])[_$_d6ab[19]](_$_d6ab[57])
    });
    $(_$_d6ab[60])[_$_d6ab[59]](_$_d6ab[18], function() {
        $(this)[_$_d6ab[17]](_$_d6ab[57])[_$_d6ab[19]](_$_d6ab[58])
    });
    $(_$_d6ab[60])[_$_d6ab[59]](_$_d6ab[6], function() {
        id = $(this)[_$_d6ab[63]](_$_d6ab[62])[_$_d6ab[2]](_$_d6ab[61]);
        rmTab(id)
    });
    var totalW = 0;
    var outW = $(_$_d6ab[65])[_$_d6ab[64]]() - 100;
    $(_$_d6ab[67])[_$_d6ab[66]](function() {
        totalW += $(this)[_$_d6ab[64]]()
    });
    if (totalW > outW) {
        $(_$_d6ab[67])[_$_d6ab[68]](1)[_$_d6ab[29]]()
    }
}

function onTab(id) {
    $(_$_d6ab[67])[_$_d6ab[17]](_$_d6ab[40]);
    $(_$_d6ab[51])[_$_d6ab[17]](_$_d6ab[40]);
    $(_$_d6ab[69] + id)[_$_d6ab[19]](_$_d6ab[40]);
    $(_$_d6ab[70] + id)[_$_d6ab[19]](_$_d6ab[40])
}

function rmTab(id) {
    var obj = $(_$_d6ab[65]);
    if (obj[_$_d6ab[72]](_$_d6ab[71])[_$_d6ab[2]](_$_d6ab[8]) == id) {
        $(_$_d6ab[69] + id)[_$_d6ab[63]]()[_$_d6ab[19]](_$_d6ab[40]);
        $(_$_d6ab[70] + id)[_$_d6ab[63]]()[_$_d6ab[19]](_$_d6ab[40]);
        loadMenu($(_$_d6ab[69] + id)[_$_d6ab[63]]()[_$_d6ab[2]](_$_d6ab[34]))
    };
    $(_$_d6ab[69] + id)[_$_d6ab[29]]();
    $(_$_d6ab[70] + id)[_$_d6ab[29]]();
    drop()
}

function loadMenu(pKey) {
    $(_$_d6ab[73])[_$_d6ab[17]](_$_d6ab[40]);
    $(_$_d6ab[74] + pKey + _$_d6ab[38])[_$_d6ab[19]](_$_d6ab[40])
}

function drop() {
    element_tabs = $(_$_d6ab[65]);
    element_content = $(_$_d6ab[56]);
    var collection = 0;
    element_tabs[_$_d6ab[72]](_$_d6ab[78])[_$_d6ab[66]](function() {
        if (this[_$_d6ab[75]] > 0 || element_tabs[_$_d6ab[64]]() - $(this)[_$_d6ab[77]]()[_$_d6ab[76]] - $(this)[_$_d6ab[64]]() < 20) {
            collection++
        }
    });
    if (collection > 0) {
        element_tabs[_$_d6ab[72]](_$_d6ab[80])[_$_d6ab[79]](1)[_$_d6ab[29]]();
        element_content[_$_d6ab[72]](_$_d6ab[81])[_$_d6ab[79]](1)[_$_d6ab[29]]()
    }
}

function getR() {
    return _$_d6ab[82] + (new Date)[_$_d6ab[83]]()
}