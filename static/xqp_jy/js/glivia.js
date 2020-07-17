$(function(){
	//是否登录
	//var isLogin = true;
 	//$("a").attr("href","javascript:void(0)");
 	$(".return").css({display:"none"})

 	//alt显示
	$(".tab-logo").hover(function(){
		$(this).find(".base-tip").css({display:"block",opacity:0}).animate({opacity:1},300);
		$(this).find(".logo-name").addClass("on");
	},function(){
		$(this).find(".base-tip").animate({opacity:0},300).css({display:"none"});
		$(this).find(".logo-name").removeClass("on");
	});
	
	//去除显示样式
	function allRmClass(){
		$(".right_show").removeClass("curr");
		$(".tab-cart").removeClass("curr2");
		$(".plugin-hd").css({display:"none"});
	}

	//移动
	function moveStart(obj){
		$(".plugin-hd").hide(0);
		$(".sideTools").animate({right:"0px"},200);
		$(".fixedright").css({width:'220px'});
		$(obj).show();
		$('.fix-close').show();
	}
	//关闭
	function moveEnd(obj){
		$(".sideTools").animate({right:"-217px"},200);
		$(obj).hide();
		$('.fix-close').hide();
	}
	function loginBox()
	{
		$(".g_icon").click(function(){
			if($(this).hasClass("curr")){
				$(".tab-prof").stop().hide(200);
				$(".curr").removeClass("curr");
			}else{
				$(".curr").removeClass("curr");
				$(this).addClass("curr");
				$(".tab-prof").stop().show(200);
				$(".tab-prof").css({top:$(this).offset().top - $(".g_icon:eq(0)").offset().top});
			}
		});
	}

	function init(){
	
		
	}




	//二维码
	$(".qrcode").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			$(".qrcode-tip").hide(200);
		}else{
			$(this).addClass("curr");
			$(".qrcode-tip").show(200);
		}	
	});
	//购物车
	$(".glivia .fix-subtop").click(function(){

		if($(this).hasClass("curr2")){
			$(this).removeClass("curr2");
			moveEnd(".bge6");
		}else{
			allRmClass();
			$(this).addClass("curr2");
			moveStart(".bge6");
			//触发购物车滚动条
			setScroll('settleup-content');
		}
	});

//购物车
    $(".glivia .fenhuic").click(function(){

        if($(this).hasClass("curr2")){
            $(".curr2").removeClass("curr2");
            moveEnd(".bge6");
        }else{
            allRmClass();
            $(this).addClass("curr2");
            moveStart(".bge6");
            //触发购物车滚动条
            setScroll('settleup-content');
        }
    });

	//回到顶部
	$(".glivia .return").click(function(){
		$("window,html,body").animate({scrollTop:0},300);
	});	

	$(window).scroll(function(){
		var x = $(window).scrollTop();
		if(x > 400){
			$(".return").css({display:"block"});
		}else{
			$(".return").css({display:"none"});
		}
	})
	
 


	

	$(".blank_hook").click(function(){
		allRmClass();
		$(".qrcode ").removeClass("curr");
		$(".qrcode-tip").css({display:"none"});
		$(".sideTools").animate({right:"-217px"},200);
		$('.fix-close').hide();
		$("#common_rightbutton").empty();
	})

});

function sideToolsAttention()
{
	$.get('index.php?app=shop.ajax&act=sideToolsAttention', function(result){
		$('#hdattention').html(result);
		//收藏toggle
		setTimeout(function(){
			$(".foot-hslist li").hover(function(){
				$(this).find(".top").css({display:"block"});
			},function(){
				$(this).find(".top").css({display:"none"});
			});
		}, 100);
	});
}

function deleteAttention(obj, id)
{
	if (!id)
	{
		return;
	}

	$.ajax({
		url: '/index.php?app=shop.ajax&act=deleteAttention&id=' + id,
		type: "GET",
		dataType: "json",
		success: function(data)
		{
			var data = eval(data);
			if (data.result == 1)
			{
				$(obj).parents('li').remove();
			}
			else if (data.result == 0)
			{
				alert(data.msg);
			}
		}
	});
}

function setMoney()
{
	$.ajax({
		url: '/index.php?app=shop.ajax&act=setMoney',
		type: "GET",
		dataType: "json",
		success: function(data)
		{
			var data = eval(data);
			$('#vcount').html(data.vcount);
			$('#coupon').html(data.coupon);
			$('#txks').html(data.txks);

			$('#cz-box').show();
			var html  = '<a href="" class="plugin-hd-title mt10 " target="_blank">我的优惠券</a>';
			if (data.coupon == 0)
			{
				html += '<div class="ta-c fc99">亲！你还没领取过淘常州优惠券！<br>快去领取吧！</div>';
			}
			else
			{
				html += '<div class="asset-yhq">';
				html += '<ul>';
				html += '<li><div class="name bold">优惠券名称</div><div class="jr bold">金额</div></li>';

				for (var i = 0; i < data.coupon_list.length; i ++)
				{
					html += '<li><div class="name"><a href="/index.php?app=member.my_coupon" target="_blank">' + data.coupon_list[i].coupon_name + '</a></div><div class="jr">￥' + data.coupon_list[i].money + '</div></li>';
				}
				
				html += '</ul>';
				html += '</div>';
			}

			$('#my_coupon').html(html).show();
		}
	});
}

//触发购物车滚动条
function setScroll(id)
{
	var gHeight = $(window).height() - 100;
	$('#' + id).css({'height': gHeight});
	$(window).resize(function() {
		gHeight = $(window).height() - 100;
		$('#' + id).css({'height': gHeight});
	});
	//setScrollbar(id);
}

function setScrollbar(id)
{
	$("#" + id).mCustomScrollbar({
		scrollButtons:{
			enable:true
		}
	});
	//ajax demo fn
	$("a[rel='load-content']").click(function(e){
		e.preventDefault();
		var $this=$(this),
			url=$this.attr("href");
		$this.addClass("loading");
		$.get(url,function(data){
			$this.removeClass("loading");
			$("#" + id + " .mCSB_container").html(data); //load new content inside .mCSB_container
			$("#" + id).mCustomScrollbar("update"); //update scrollbar according to newly loaded content
			$("#" + id).mCustomScrollbar("scrollTo","top",{scrollInertia:200}); //scroll to top
		});
	});
	$("a[rel='append-content']").click(function(e){
		e.preventDefault();
		var $this=$(this),
			url=$this.attr("href");
		$this.addClass("loading");
		$.get(url,function(data){
			$this.removeClass("loading");
			$("#" + id + " .mCSB_container").append(data); //append new content inside .mCSB_container
			$("#" + id).mCustomScrollbar("update"); //update scrollbar according to newly appended content
			$("#" + id).mCustomScrollbar("scrollTo","h2:last",{scrollInertia:2500,scrollEasing:"easeInOutQuad"}); //scroll to appended content
		});
	});
}

//取得cookie    
function getCookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';'); //把cookie分割成组    
	for (var i = 0; i < ca.length; i++) 
	{
		var c = ca[i]; //取得字符串    
		while (c.charAt(0) == ' ') 
		{ //判断一下字符串有没有前导空格    
			c = c.substring(1, c.length); //有的话，从第二位开始取    
		}
		if (c.indexOf(nameEQ) == 0) 
		{ //如果含有我们要的name    
			return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值    
		}
	}
	return false;
}

//清除cookie    
function clearCookie(name) 
{
	setCookie(name, "", -1);
}

//设置cookie    
function setCookie(name, value, seconds) 
{
	seconds = seconds || 0; //seconds有值就直接赋值。    
	var expires = "";
	if (seconds != 0) 
	{ //设置cookie生存时间    
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值    
}

