/* 官网:www.newzhan.com */
/* 扣扣:401421567 */
(function(a,b){$window=a(b),a.fn.lazyload=function(c){function f(){var b=0;d.each(function(){var c=a(this);if(e.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,e)&&!a.leftofbegin(this,e))if(!a.belowthefold(this,e)&&!a.rightoffold(this,e))c.trigger("appear");else if(++b>e.failure_limit)return!1})}var d=this,e={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return c&&(undefined!==c.failurelimit&&(c.failure_limit=c.failurelimit,delete c.failurelimit),undefined!==c.effectspeed&&(c.effect_speed=c.effectspeed,delete c.effectspeed),a.extend(e,c)),$container=e.container===undefined||e.container===b?$window:a(e.container),0===e.event.indexOf("scroll")&&$container.bind(e.event,function(a){return f()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(e.appear){var f=d.length;e.appear.call(b,f,e)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(e.data_attribute))[e.effect](e.effect_speed),b.loaded=!0;var f=a.grep(d,function(a){return!a.loaded});d=a(f);if(e.load){var g=d.length;e.load.call(b,g,e)}}).attr("src",c.data(e.data_attribute))}}),0!==e.event.indexOf("scroll")&&c.bind(e.event,function(a){b.loaded||c.trigger("appear")})}),$window.bind("resize",function(a){f()}),f(),this},a.belowthefold=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.height()+$window.scrollTop():e=$container.offset().top+$container.height(),e<=a(c).offset().top-d.threshold},a.rightoffold=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.width()+$window.scrollLeft():e=$container.offset().left+$container.width(),e<=a(c).offset().left-d.threshold},a.abovethetop=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.scrollTop():e=$container.offset().top,e>=a(c).offset().top+d.threshold+a(c).height()},a.leftofbegin=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.scrollLeft():e=$container.offset().left,e>=a(c).offset().left+d.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightofscreen(b,c)&&!a.leftofscreen(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(c){return a.belowthefold(c,{threshold:0,container:b})},"above-the-top":function(c){return!a.belowthefold(c,{threshold:0,container:b})},"right-of-screen":function(c){return a.rightoffold(c,{threshold:0,container:b})},"left-of-screen":function(c){return!a.rightoffold(c,{threshold:0,container:b})},"in-viewport":function(c){return!a.inviewport(c,{threshold:0,container:b})},"above-the-fold":function(c){return!a.belowthefold(c,{threshold:0,container:b})},"right-of-fold":function(c){return a.rightoffold(c,{threshold:0,container:b})},"left-of-fold":function(c){return!a.rightoffold(c,{threshold:0,container:b})}})})(jQuery,window);
function getBrowser() {
	var browser = {msie : false,firefox : false,opera : false,safari : false,chrome : false,netscape : false,appname : '未知',version : ''},
	userAgent = window.navigator.userAgent.toLowerCase();
	if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
		browser[RegExp.$1] = true;
		browser.appname = RegExp.$1;
		browser.version = RegExp.$2;
	} else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) {
		browser.safari = true;
		browser.appname = 'safari';
		browser.version = RegExp.$2;
	}
	return browser;
}
window.ppAjax = {
	alert : function (data) {
		window.ppData = data = toJson(data);
		if (window.ppExit)
			return;
	},
	submit : function (selector, callback) {
		$(selector).submit(function () {
			ppAjax.post($(this).attr("action"), $(this).serialize(), callback);
			return false;
		});
	},
	post : function (url, param, callback) {
		$.ajax({
			type : "POST",
			cache : false,
			url : url,
			data : param,
			success : callback,
			error : function (html) {
				layer.alert("提交数据失败，代码:" + html.status + "，请稍候再试", {icon : 0,shade : 0.6});
			}
		});
	}
};
function toJson(data) {
	var json = {};
	try {
		json = eval("(" + data + ")");
		if (json.kp_error) {
			ppAjax.debug(json);
			window.ppExit = true;
		} else {
			window.ppExit = false;
		}
	} catch (e) {
		alert(data);
	}
	return json;
}
$.cookie = function (name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
function blink(selector){
	$(selector).fadeOut('slow', function(){
		$(this).fadeIn('fast', function(){
			blink(this);
		});
	});
}
function add_fav(id,sid){
	ppAjax.post(webdir + "index.php?u=fav-add-ajax-1", {"id":id,"sid":sid}, function(data){
		ppAjax.alert(data);
		if(window.ppData.err==0){
			layer.msg(window.ppData.msg);
		}else{
			layer.msg(window.ppData.msg);
		}
	});
}
function del_fav(id,sid){
	ppAjax.post(webdir + "index.php?u=fav-del-ajax-1", {"id":id,"sid":sid}, function(data){
		ppAjax.alert(data);
		if(window.ppData.err==0){
			layer.msg(window.ppData.msg);
			$('#li_' + id).remove();
			$('#li_' + sid).remove();
		}else{
			layer.msg(window.ppData.msg);
		}
	});
}
function change_jifen(max,price){
	var _jifen = $('#_jifen').val();
	var _jifen_m = _jifen/jf_rate;
	if(parseInt(_jifen_m)!==_jifen_m){
		$('#_sorry').text('必须填写'+jf_rate+'的倍数！');
		$('#_jifen').val('0');
		return false;
	}else{
		$('#_sorry').text('');
	}
	if(_jifen > max){
		_jifen = max ;
		_jifen_m = max/jf_rate;
		$('#_jifen').val(_jifen);
	}
	var _money = $('#book_price').val() * 1 - _jifen_m;
	if(_money > price){
		$('#_sorry').text('现金不足！');
	}else{
		$('#_sorry').text('');
	}
	$('#_xianjin').val(_money);
	$('#_jifen_notice').text(_jifen_m);
}
function list_cron(){
	$.getScript(webdir+"index.php?u=cron-flag-id-2-ajax-1", function(){});
}
function home_cron(){
	$.getScript(webdir+"index.php?u=cron-flag-id-1-ajax-1", function(){});
	$.getScript(webdir+"index.php?u=cron-refresh_total-ajax-1", function(){});
}
function send_buy(){
	var user_price = $('#user_price').val(),totalprice = $('#book_price').val() * 1 , dprice = $('#book_dprice').val() * 1, user_jifen = $('#user_jifen').val() * 1;

	var _totaljifen = 0 ;
	if(user_jifen >= dprice*jf_rate){
		_totalprice = totalprice - dprice ;
		_totaljifen = dprice*jf_rate ;
	}else{
		_totaljifen	= parseInt(user_jifen/jf_rate)*jf_rate ;
		_totalprice = totalprice - parseInt(user_jifen/jf_rate);
	}
	var lay_content = "<p class='alert text-danger'>余额不足！<br/>您的现金余额："+user_price+"元<br/>";
	if(_totaljifen > 0){
		lay_content += "您的"+jf_name+"余额："+user_jifen+"，最多可抵 "+_totaljifen/jf_rate+" 元<br/>";
	}
	if((_totalprice*1 > user_price*1)){
		layer.open({
			type: 1,
			title: ['友情提醒', 'font-weight:bold;color:green'],
			btn: ['去充值', '取消'],
			yes: function(index, layero){
				window.location.href	= memurl + '/index.php?u=record-order-price-' + (_totalprice-user_price);
			},cancel: function(index){
			},
			shadeClose: true,
			content: lay_content + "您至少需充值："+(_totalprice-user_price)+"元</p>"
		});
		return false;
	}else{
		if(dprice > 0){
			var _content = '<div class="input-group mt10"><span class="input-group-addon">支付现金</span><input id="_xianjin" value="'+_totalprice+'" class="form-control" type="text" readonly><span class="input-group-addon">元</span></div><div class="input-group mt10"><span class="input-group-addon">使用'+jf_name+'</span><input id="_jifen" value="'+_totaljifen+'" class="form-control" type="text" onchange="change_jifen('+_totaljifen+','+user_price+');"><span class="input-group-addon">可抵价<strong id="_jifen_notice" class="text-info">'+(_totaljifen/jf_rate)+'</strong>元</span></div><p class="mt10">最多可使用：<span class="text-red">'+dprice*jf_rate+jf_name+'抵价'+dprice+'元</span><br/>您的现金有：'+user_price+'元<br/>'+jf_name+'余额为：'+user_jifen+'</p>';
		}else{
			var _content = '确认后将扣除' + totalprice + '元';
		}
		_content += '<div class="input-group mt10"><span class="input-group-addon text-red">支付密码</span><input id="_pinpass" value="" class="form-control" type="password"></div>';
		if(!_pin){
			_content += '<p class="alert alert-waring"><a class="text-red" href="'+memurl+'/index.php?u=index-profile#pinpass_d" target="_blank">尚未设置支付密码，立即去设置</a></p>';
		}
		_content += '<br/><span id="_sorry" class="text-red"></span>&nbsp;';
		layer.open({
			title: ['购买确认', 'font-weight:bold;color:green'],
			btn:['确认','取消'],
			yes:function(index,layero){
				var btn = layero.find('.layui-layer-btn'); 
				var body = layero.find('.layui-layer-content');
				btn.hide();
				body.append("<div class='layui-layer-loading text-center text-danger'><div class='layui-layer-loading2' style='margin:0px auto;'></div><p>请稍候...若无响应请到<a class='text-info' href='"+memurl+"/index.php?u=book-index' target='_blank'>会员中心</a>查看！</p></div>");
				$.ajax({
					type	: "POST",
					cache	: false,
					url		: $('#order_book').attr("action"),
					data	: {'pid':$('#book_pid').val(),'cid':$('#book_cid').val(),'use_jifen':$('#_jifen').val(),'pinpass':$('#_pinpass').val()},
					success	: function(data){
						ppAjax.alert(data);
						if(window.ppData.err==0){
							layer.msg('购买成功，请稍后！', {icon: 1,time: 2000,shade: 0.6}, function(){window.location = memurl+'/index.php?u=book-index';});
						}else{
							layer.alert(window.ppData.msg, {icon: 5,shade: 0.6}) ;
						}
					},error : function(html){
						layer.alert("提交失败，代码:"+ html.status +"，请稍候再试", {icon: 0,shade: 0.6}) ;
					}
				});
			},cancel:function(index){
				layer.close(index);
			},
			shadeClose: false,
			content: _content
		});
	}
}
function lxfEndtime(){
	$(".time_remark_txt").each(function(){
		var endtime = $(this).attr("endTime");
		var nowtime = new Date().getTime(); 
		var youtime = endtime - nowtime;
		var seconds = youtime/1000;
		var minutes = Math.floor(seconds/60);
		var hours = Math.floor(minutes/60);
		var days = Math.floor(hours/24);
		var CDay= days ;
		var CHour= hours % 24;
		var CMinute= minutes % 60;
		var CSecond= Math.floor(seconds%60);
		if(endtime>nowtime){
			$(this).html("<i class='icon-clock'></i> "+CDay+"天"+CHour+"小时"+CMinute+"分"+CSecond+"秒"); 
		}
	});
	setTimeout("lxfEndtime()",1000);
}
function clear_cookie(){
	$("#list_checkbox :checkbox").each(function(){
		var _id = $(this).attr('id');
		$.cookie(_id, null,{path:'/'});
	});
	$("a.extlink").each(function(){
		var _id = $(this).attr('_cook') ;
		$.cookie(_id, null,{path:'/'});
	});
	$.cookie('order', null,{path:'/'});
}
function search(type){
	clear_cookie();
	var keyword = $("#search_keyword").val() , mid = $("#search_mid").val(), sid = $("#search_sid").val();
	if (!keyword) {
		layer.msg('搜索词不能为空！');
		return false;
	}
	if(type == 0 && sid){
		$.cookie('search_sid', sid,{path:'/'});
	}else{
		$.cookie('search_sid', null,{path:'/'});
	}
	_surl = search_url.replace(/\{mid\}/,mid);
	_surl = _surl.replace(/%7Bkeyword%7D/,keyword);
	window.location.href = _surl;
	return false;
}
$(document).ready(function () {
	$("#select_mid").text($("#search_mids p.active").text());
	$("#select_mid_wrap").click(function(){$("#search_mids").toggle()});
	$("#search_mids p").click(function(){
		$("#select_mid").text($(this).text());
		$("#search_mid").val($(this).attr('mid'));
		$("#search_mids").hide();
	});
	$('#search_all').click(function(){
		search(1);
	});
	$('#search_shop').click(function(){
		search(0);
	});
	$(".item_list .panel").hover(function(){
		$(this).addClass('panel_hover');
		var _text = $(this).find('.good_remark_txt').text().trim();
		if(_text.length > 0){
			$(this).find('.good_remark').slideDown('fast');
		}
	},function(){
		$(this).removeClass('panel_hover');
		$(this).find('.good_remark').slideUp('fast');
	});
	$('#artbody img,#pro_content img').addClass('img-responsive');
	$('#navbar a').click(function(){
		clear_cookie();
	});
	$('#orderby a').click(function(){
		$.cookie('order', $(this).attr('data'),{path:'/'});
		window.location.reload();
	});
	$('#comments_order input').click(function(){
		layer.load();
		$.cookie('comment_order', $(this).val());
		window.location.reload();
	});
	$('#list_check').click(function(){
		$("#list_checkbox :checkbox").each(function(){
			var _id = $(this).attr('id');
			var _checked = $('#' + _id)[0].checked;
			$.cookie(_id, _checked ? 1 : 0,{path:'/'});
		});
		window.location.reload();
	});
	$('#list_check_del').click(function(){
		$("#list_checkbox :checkbox").each(function(){
			var _id = $(this).attr('id');
			$.cookie(_id, null,{path:'/'});
		});
		window.location.reload();
	});
	$('#sorderby a').click(function(){
		$.cookie('sorder', $(this).attr('data'),{path:'/'});
		window.location.reload();
	});
    $("img[data-original]").lazyload({effect:"fadeIn"});
	$('li.dropdown').mouseover(function() {   
		 $(this).addClass('open');
	}).mouseout(function() {
		$(this).removeClass('open');
	});
	$(".dropdown-toggle").click(function(){
		if($(this).attr('href')) window.location = $(this).attr('href');
	});
	if(_uid && _uid> 0){
		$.getScript(webdir + "index.php?u=pm-index", function(){
			if(pm_count){
				$("#top_newpm").html('<a href="'+memurl+'/index.php?u=pm-index" class="blink"><i class="icon-commenting"></i></a>');blink('.blink');
			}
		});
	}
	blink('.blink');
});
(function($) {
    "use strict";
    var bugfix = function() {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
          var msViewportStyle = document.createElement('style');
          msViewportStyle.appendChild(
            document.createTextNode(
              '@-ms-viewport{width:auto!important}'
            )
          );
          document.querySelector('head').appendChild(msViewportStyle);
        }
    };
    var navbar_js = function() {
        $('.dropdown-mega-menu > a, .nav-menu > li:has( > ul) > a').append("<span class=\"indicator\"><i class=\"icon-angle-down\"></i></span>");
        $('.nav-menu > li ul > li:has( > ul) > a').append("<span class=\"indicator\"><i class=\"icon-angle-right\"></i></span>");
        $(".dropdown-mega-menu, .nav-menu li:has( > ul)").on('mouseenter', function () {
            if ($(window).width() > 943) {
                $(this).children("ul, .mega-menu").fadeIn('fast');
            }
        });
        $(".dropdown-mega-menu, .nav-menu li:has( > ul)").on('mouseleave', function () {
            if ($(window).width() > 943) {
                $(this).children("ul, .mega-menu").fadeOut('fast');
            }
        });
        $(".dropdown-mega-menu > a, .nav-menu li:has( > ul) > a").on('click', function (e) {
            if ($(window).width() <= 943) {
                $(this).parent().addClass("active-mobile").children("ul, .mega-menu").slideToggle(150, function() {
                    
                });
                $(this).parent().siblings().removeClass("active-mobile").children("ul, .mega-menu").slideUp(150);
            }
            e.preventDefault();
        });
        $(".nav-toggle").on('click', function (e) {
            var toggleId = $(this).data("toggle");
            $(toggleId).slideToggle(150);
            e.preventDefault();
        });
    };
    var navbar_resize_load = function() {
        if ($(".nav-header").css("display") == "block") {
            $(".nav-bar").addClass('nav-mobile');
            $('.nav-menu').find("li.active").addClass("active-mobile");
        }else{
            $(".nav-bar").removeClass('nav-mobile');
        }
    };
    var search_load = function() {
        $("#search_open").on('click', function (e) {
            $("#search_form").slideToggle(150);
            e.preventDefault();
        });
    };
    var qiandao = function() {
		$("#qiandao").on('click', function(e){
			ppAjax.post(memurl + "/index.php?u=index-qiandao-ajax-1", {'rnum':Math.random()}, function(data){
				var res = toJson(data);
				if(res.err==0){
					layer.msg('签到成功！奖励<b>'+res.msg+'</b>'+jf_name+'<br/>连续签到奖励更多');
					var totalgold = parseInt($('#top_gold').text()) +  parseInt(res.msg);
					$('#top_gold').text(totalgold);
					$('#qd_str').text('已签到');
				}else{
					layer.msg(res.msg);
				}
			});
			e.preventDefault();
		});
    };
    var usr_showmenu = function(){
		$("#usr_showmenu").on('click', function (e) {
            $("#usr_leftmenu").slideToggle(150);
            e.preventDefault();
		});
    };
	$(document).on('ready', function() {
		bugfix();
		navbar_js();
		search_load();
		qiandao();
	});
	$(window).on('load', function() {
		navbar_resize_load();
	});
	$(window).on('resize', function() {
		navbar_resize_load();
	});
})(jQuery);