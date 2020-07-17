var explorer;var explorer_version;

/**
 * 获取浏览器类型
 *
 * @returns {undefined}
 */
function getExplorer() {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("MSIE") >= 0) {
        return "IE";
    } else if(explorer.indexOf("Edge") >= 0){
        return "IE";
    } else if (explorer.indexOf("Firefox") >= 0) {
        return "Firefox";
    } else if (explorer.indexOf("Chrome") >= 0) {
        return "Chrome";
    } else if (explorer.indexOf("Opera") >= 0) {
        return "Opera";
    } else if (explorer.indexOf("Safari") >= 0) {
        return "Safari";
    } else {
        return  "IE";
    }
}

/** 获取浏览器版本号 */
function getExplorerVersion(){
    var userAgent = navigator.userAgent;
    var browser;
    var version;
    var browserMatch = _uaMatch(userAgent);
    if (browserMatch.browser) {
        browser = browserMatch.browser;
        version = browserMatch.version;
    }
    return version;
}
function _uaMatch(userAgent) {
    var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
    var rFirefox = /(firefox)\/([\w.]+)/;
    var rOpera = /(opera).+version\/([\w.]+)/;
    var rChrome = /(chrome)\/([\w.]+)/;
    var rSafari = /version\/([\w.]+).*(safari)/;
    var ua = userAgent.toLowerCase();
    var match = rMsie.exec(ua);
    if (match != null) {
        return {
            browser : "IE",
            version : match[2] || "0"
        };
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
        return {
            browser : match[1] || "",
            version : match[2] || "0"
        };
    }
    var match = rOpera.exec(ua);
    if (match != null) {
        return {
            browser : match[1] || "",
            version : match[2] || "0"
        };
    }
    var match = rChrome.exec(ua);
    if (match != null) {
        return {
            browser : match[1] || "",
            version : match[2] || "0"
        };
    }
    var match = rSafari.exec(ua);
    if (match != null) {
        return {
            browser : match[2] || "",
            version : match[1] || "0"
        };
    }
    if (match != null) {
        return {
            browser : "",
            version : "0"
        };
    }
}

//获取值
explorer =getExplorer();
explorer_version =getExplorerVersion();

$(function() {
//  ----------E交易测试系统
//  var ejy_login_url ="http://58.216.221.106:8001/cjshy/DanDianLogin/Pages/login.ashx";//登录接口
//  var ejy_baoming_url ="http://58.216.221.106:8001/cjshy/DanDianLogin/Pages/Redirect.aspx?Projectno=";//项目报名接口
//  var ejy_huiyuan_index_url ="http://58.216.221.106:8001/cjshy/Pages/HYHomeIN/index.aspx";//会员系统：登录成功后的主页
//  var ejy_web_hyzx_url ="http://www.e-jy.com.cn/hyzx";//会员中心地址
//  var ejy_web_login_url ="login_in";//E交易网站自带的会员登录系统接口
//  var ejy_web_logout_url ="http://58.216.221.106:8001/cjshy/logout.aspx";//退出登录url
    
//  ----------E交易正式系统
	var ejy_login_url ="http://www.e-jy.com.cn/ejyhy/DanDianLogin/Pages/login.ashx";
	var ejy_baoming_url ="http://www.e-jy.com.cn/ejyhy/DanDianLogin/Pages/Redirect.aspx?Projectno=";
	var ejy_huiyuan_index_url ="http://www.e-jy.com.cn/ejyhy/Pages/HYHomeIN/index.aspx";//会员系统：登录成功后的主页
	var ejy_web_hyzx_url ="http://www.e-jy.com.cn/hyzx";//会员中心地址
	var ejy_web_login_url ="login_in";//E交易网站自带的会员登录系统接口
	var ejy_web_logout_url ="http://www.e-jy.com.cn/ejyhy/logout.aspx";//退出登录url
    
    //----------公共参数
    var need_auto_skip =true;//登录成功后，是否需要自动跳转
    
    //登录
    $(".ejy_huiyuan_dl").click(function(){
        var u =$("#ejy_huiyuan_baoming input[name=username]").val();
        var p =$("#ejy_huiyuan_baoming input[name=password]").val();
        var projectNo =$("#ejy_huiyuan_baoming input[name=projectNo]").val();
        var skipType =$("#ejy_huiyuan_baoming input[name=skipType]").val();
        var callback =$("#ejy_huiyuan_baoming input[name=callback]").val();
        _loginOrBaoMing(projectNo ,true ,u ,p ,skipType ,callback);
    });

    //报名
    $(document).on("click", ".ejy_huiyuan_bm", function() {
    	var $this =$(this);
    	//----------------判断网站是否已经登录成功start
    	$.ajax({
            type: "POST",
            url: "is_login",
       	    dataType: "json",
       	    async : false, 
       	    data: {
				loginName: "",
				passWord: ""    				
			},
       	    success: function(message){
       	        if(message.login ==false){//未登录
       	        	var $iframe =$("#iframe_ejy_huiyuan_bm");
       	        	if($iframe.attr("src") ==undefined ||$.trim($iframe.attr("src")) ==''){
       	        		f =$("<iframe id='iframe_ejy_huiyuan_bm' name='iframe_ejy_huiyuan_bm' style='display: none;'></iframe>").prependTo('body');
       	        	}
   	        		$("#iframe_ejy_huiyuan_bm").attr("src" ,ejy_web_logout_url);
       	        }else{//已登录
       	        }
       	        
       	        //-------------处理e交易会员系统
	       	    var projectNo =$this.attr("id");
	            var skipType =$this.attr("skipType");
	            var callback =$this.attr("callback");//回调函数
	            if(skipType =='web'){
	             	//如果直接是web：表示直接登录，所以不需要弹出提示
	            }else{
	     		    //获取浏览器和版本
	     		    if(explorer !="IE"){
	     		        alert("您的浏览器非IE版本可能会影响正常报价，建议使用IE10及以上版本浏览器");
	     		    }else{
	     		        if(explorer_version <10){
	     		            alert("您的浏览器IE版本过低，建议使用IE10及以上版本浏览器");
	     		        }
	     		    }
	            }
	            var projectNo =$this.attr("id");
	            var skipType =$this.attr("skipType");
	            _loginOrBaoMing(projectNo ,false ,null ,null ,skipType ,callback);
       	    },
       	    error:function (XMLHttpRequest, textStatus, errorThrown) {
       	    }
        });
    	//----------------判断网站是否已经登录成功end
    });
    

    //竞价规则
    $(".ejy_huiyuan_jjgz").click(function(){
        var biaoDiNO = $(this).attr("id");
        var kssj_biaoDiNO = $("#kssj_"+biaoDiNO).val();
        var JingJiaFangShi_biaoDiNO = $("#JingJiaFangShi_"+biaoDiNO).val();
        var price_biaoDiNO = $("#price_"+biaoDiNO).val();
        var YanShiSecond_biaoDiNO = $("#YanShiSecond_"+biaoDiNO).val();
        var JingJiaSetp_biaoDiNO = $("#JingJiaSetp_"+biaoDiNO).val();
        var hasPriority_biaoDiNO = $("#hasPriority_"+biaoDiNO).val();
        var SystemType_biaoDiNO = $("#SystemType_"+biaoDiNO).val();
        var yxq = "";
        $("#kssj").html(kssj_biaoDiNO);
        $("#jjfs").html(JingJiaFangShi_biaoDiNO);
        $("#qsj").html(price_biaoDiNO+"元");
        $("#yczq").html(YanShiSecond_biaoDiNO+"秒");
        $("#jjjt").html(JingJiaSetp_biaoDiNO+"元");
        if(SystemType_biaoDiNO=='GQ'){
            if(hasPriority_biaoDiNO=='1'){
                yxq = "否"
            }else{
                yxq = "是"
            }
        }else{
            if(hasPriority_biaoDiNO=='1'){
                yxq = "是"
            }else{
                yxq = "否"
            }
        }
        $("#yxq").html(yxq);
        if(JingJiaFangShi_biaoDiNO=='一次性'){
            $("#p_qsj").hide();
            $("#p_yczq").hide();
            $("#p_jjjt").hide();
            $("#p_yxq").hide();
        }
        $('#ejy_huiyuan_jjgz .theme-popover-mask').fadeIn(100);
        $('#ejy_huiyuan_jjgz .theme-popover').slideDown(200);
        $("#ejy_huiyuan_jjgz").show();
    });

    $("#ejy_huiyuan_jjgz .theme-poptit .close").click(function(){
        $("#ejy_huiyuan_jjgz .theme-popover-mask").fadeOut(100);
        $("#ejy_huiyuan_jjgz .theme-popover").slideUp(200);
    });

    function _showDialog(data ,isLogin ,projectNo ,skipType ,callback){
        $("#ejy_huiyuan_baoming input[name=projectNo]").val(projectNo);
        $("#ejy_huiyuan_baoming input[name=skipType]").val(skipType);
        $("#ejy_huiyuan_baoming input[name=callback]").val(callback);
        
        if(!isLogin){
            data ="请先登录";
        }
        $("#ejy_huiyuan_baoming #error").show();
        $('#ejy_huiyuan_baoming .theme-popover-mask').fadeIn(100);//打开遮罩
        $('#ejy_huiyuan_baoming .theme-popover').slideDown(200);//打开弹出框
        if(data !=='请先登录')
        	alert(data);
        $("#ejy_huiyuan_baoming #error").fadeOut(3000);
    }

    /**
     * 登录或者报名接口
     * @param projectNo	标的编号
     * @param isLogin	是否登录，true表示已经登录成功可以跳转到指定skipType页面；false弹出登录页面进行登录；
     * @param u			只有isLogin=true时生效，会员登录的账号
     * @param p			只有isLogin=true时生效，会员登录的密码
     * @param skipType	跳转的类型：hyzx会员中心；index会员主页(会员登录以后的列表)；其他都是默认跳转到报名列表；
     * @param callback	回调函数
     */
    function _loginOrBaoMing(projectNo ,isLogin ,u ,p ,skipType ,callback){
        if(skipType == null && (projectNo ==null || projectNo =="")){
            alert("调用接口失败：请检查是否对按钮设置项目编号的属性id");
            return;
        }

        var params ={"u" :"" ,"p" :""};
        if(isLogin){
            params.u =u;
            params.p =p;
        }
        $.ajax({
            type:"post",
            url: ejy_login_url,
            dataType: "jsonp",
            jsonp:"callback",
            data :params,
            jsonpCallback:"successCallback",
            xhrFields:{
                withCredentials:true
            },
            success:function(data){
                var login =data ==null ?false :data =="success";
                if(login){
                	if(isLogin){
                        _ejyLgoinHideDialog();
                        $("#ejy_huiyuan_baoming input[name=password]").val("");//为了安全：清空密码

                        //执行会员系统：会员登录
                        var $iframe_ejy_huiyuan =$("#iframe_ejy_huiyuan");//e交易会员系统跳转iframe
                        $iframe_ejy_huiyuan.attr("href" ,ejy_login_url +"?u=" +u +"&p=" +p);
                        $iframe_ejy_huiyuan.trigger("click");
                    }

                	if(need_auto_skip ===true){//自动跳转
                		actSkiType(skipType ,projectNo ,u ,p ,callback);
                	}else{//不自动跳转
                		if(isLogin ===true){
                			alert("登录成功");
                		}else{
                			actSkiType(skipType ,projectNo ,u ,p ,callback);
                		}
                	}
                }else{
                	//会员系统登陆会话失效，需要同时将网站的登陆会话清空
                	removeWebSession();//清空网站会话
                    _showDialog(data ,isLogin ,projectNo ,skipType ,callback);//弹出会员登陆窗口
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown) {
                alert("登录异常，检查网络");
            }
        });
    }
    
    /**
     * 删除网站系统的session会话
     */
    function removeWebSession(){
    	$.ajax({
            type: "POST",
            url: "login_out",
           	dataType:"json",
           	data: "",
           	success: function(message){
           	    if(message.code == "0"){
    				/*var $no_login =$("#no_login");
      	        	var $has_login =$("#has_login");
      	        	$no_login.show();
      	        	$has_login.hide();*/
           	    }       	    	    
           	},
           	error:function (XMLHttpRequest, textStatus, errorThrown) {
           		alert("网络异常，请稍后再试");
           	}
        });
    }
    
    /**
     * 执行不同skipType的跳转
     * @param skipType	跳转的类型：web停留在首页即可不要跳转；hyzx会员中心；index会员主页(会员登录以后的列表)；其他都是默认跳转到报名列表；
     * @param projectNo	标的编号
     * @param u			会员系统的登录账号
     * @param p			会员系统的登录密码
     * @param callback	回调函数
     */
    function actSkiType(skipType ,projectNo ,u ,p ,callback){
    	var skip_to_index =true;
    	/*根据skipType跳转到不同的页面start*/
        switch(skipType){
        case "hyzx"://会员中心
        	//window.open(ejy_web_hyzx_url);
        	break;
        case "web"://网站首页，不需要跳转到会员系统
        	skip_to_index =false;
        	if(u ==null || p ==null){
        		//表示已经登录成功后做的操作
        		if(callback !=null ||callback !=undefined){
             		eval(callback);
             	}
        		break;
        	}
        	$.ajax({
                type: "POST",
                url: "login_in",
           	    dataType: "json",
           	    data: {
    				loginName: u,
    				passWord: p    				
    			},
           	    success: function(message){
           	        if(message.msg != ""){
           	            alert(message.msg);
           	        }else{
       	        		var loginAccount =message.loginAccount;
       	        		var loginInfo =message.loginInfo;
           	        	var $no_login =$("#no_login");
           	        	var $has_login =$("#has_login");
           	        	$no_login.hide();
           	        	
           	        	var $has_login_ygz =$has_login.find("#has_login_ygz");
           	        	var $has_login_ybm =$has_login.find("#has_login_ybm");
           	        	var $has_login_jjz =$has_login.find("#has_login_jjz");
           	        	var $has_login_ygm =$has_login.find("#has_login_ygm");
           	        	var $has_login_displayName =$has_login.find("#has_login_displayName");
           	        	$has_login_ygz.attr("href" ,"ygz_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_ybm.attr("href" ,"ybm_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_jjz.attr("href" ,"jjz_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_ygm.attr("href" ,"ygm_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_ygz.find("b").html(loginInfo.ygz);
           	        	$has_login_ybm.find("b").html(loginInfo.ybm);
           	        	$has_login_jjz.find("b").html(loginInfo.jjz);
           	        	$has_login_ygm.find("b").html(loginInfo.ygm);
           	        	$has_login_displayName.find("b").html(loginAccount.displayName);
           	        	$has_login.show();
           	        	
           	            if(skip_to_index){
           	            	window.open(ejy_huiyuan_index_url);
           	            }
           	            
	           	        if(callback !=null &&callback !=undefined){
	                 		eval(callback);
	                 	}
           	        }
           	    },
           	    error:function (XMLHttpRequest, textStatus, errorThrown) {
           	    }
            });
        	break;
        case "index"://会员系统：登录成功后的主页
        	if(u ==null || p ==null){
        		window.open(ejy_huiyuan_index_url);
        		return;
        	}
            $.ajax({
                type: "POST",
                url: "login_in",
           	    dataType: "json",
           	    data: {
    				loginName: u,
    				passWord: p    				
    			},
           	    success: function(message){
           	        if(message.msg != ""){
           	            alert(message.msg);
           	        }else{
       	        		var loginAccount =message.loginAccount;
       	        		var loginInfo =message.loginInfo;
           	        	var $no_login =$("#no_login");
           	        	var $has_login =$("#has_login");
           	        	$no_login.hide();
           	        	
           	        	var $has_login_ygz =$has_login.find("#has_login_ygz");//已关注
           	        	var $has_login_ybm =$has_login.find("#has_login_ybm");//已报名
           	        	var $has_login_jjz =$has_login.find("#has_login_jjz");//竞价中
           	        	var $has_login_ygm =$has_login.find("#has_login_ygm");//已成交
           	        	var $has_login_displayName =$has_login.find("#has_login_displayName");
           	        	$has_login_ygz.attr("href" ,"ygz_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_ybm.attr("href" ,"ybm_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_jjz.attr("href" ,"jjz_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	$has_login_ygm.attr("href" ,"ygm_more?danWeiGuid=" +loginAccount.danWeiGuid);
           	        	//如果账号已经登陆，那么loginInfo返回null所以这里要处理下
           	        	if(loginInfo !=null){
           	        		$has_login_ygz.find("b").html(loginInfo.ygz);
           	        		$has_login_ybm.find("b").html(loginInfo.ybm);
           	        		$has_login_jjz.find("b").html(loginInfo.jjz);
           	        		$has_login_ygm.find("b").html(loginInfo.ygm);
           	        		$has_login_displayName.find("b").html(loginAccount.displayName);
           	        	}
           	        	$has_login.show();
           	        	
           	            if(skip_to_index){
           	            	window.open(ejy_huiyuan_index_url);
           	            }
           	        }
           	    },
           	    error:function (XMLHttpRequest, textStatus, errorThrown) {
           	    }
            });
        	break;
        case "baoming"://网站报名列表
        	if(u ==null || p ==null){
        		eval(callback);
        		return;
        	}
	        $.ajax({
	            type: "POST",
	            url: "login_in",
	       	    dataType: "json",
	       	    data: {
					loginName: u,
					passWord: p    				
				},
	       	    success: function(message){
	       	        if(message.msg != ""){
	       	            alert(message.msg);
	       	        }else{	       	        	
	       	        	eval(callback);
	       	        }
	       	    },
	       	    error:function (XMLHttpRequest, textStatus, errorThrown) {
	       	    }
	        });
        	break;
        default ://默认跳转到报名列表
        	if(u ==null || p ==null){
        		window.open(ejy_baoming_url + projectNo);
        		return;
        	}
	        $.ajax({
	            type: "POST",
	            url: "login_in",
	       	    dataType: "json",
	       	    data: {
					loginName: u,
					passWord: p    				
				},
	       	    success: function(message){
	       	        if(message.msg != ""){
	       	            alert(message.msg);
	       	        }else{
	       	        	window.open(ejy_baoming_url + projectNo);
	       	        }
	       	    },
	       	    error:function (XMLHttpRequest, textStatus, errorThrown) {
	       	    }
	        });
        	break;
        }
        /*根据skipType跳转到不同的页面end*/
    }

    function _ejyLgoinHideDialog(){
        $("#ejy_huiyuan_baoming .theme-popover-mask").fadeOut(100);
        $("#ejy_huiyuan_baoming .theme-popover").slideUp(200);
    }

    $(".theme-poptit .close").click(function(){
        _ejyLgoinHideDialog();
    });
})

/**
 * 公用报名方法
 */
var jump_url = "";	//跳转url
//function baoming(projectguid,zhuanTingGuid,systemtype){
//	if(systemtype == "NMG"){
//		if(zhuanTingGuid == ""){
//			window.open("pj_sign_up?infoid="+projectguid+"&type=NMG&bmguid=");
//		}else{
//			window.open("pj_sign_up?infoid="+zhuanTingGuid+"&type=ZT&bmguid=");
//		}
//	}else if(systemtype=='CCJT'){
//		var win = $(window);
//		var w = win.outerWidth() + win.scrollLeft();
//		$(".window-mask").show();
//		$("#dytk").css({"left": (w - 800) / 2, "top" : (win.scrollTop() + 20)});
//		$("#dytk").show();
//		change_secn(6);
//		jump_url = "pj_sign_up?infoid="+projectguid+"&type="+systemtype+"&bmguid=";
//	}else{
//		window.open("pj_sign_up?infoid="+projectguid+"&type="+systemtype+"&bmguid=");
//	}	
//}

//隐藏提示框
function hide_dytk(){
	$("#dytk").hide();
	$(".window-mask").hide();
}
//弹出url
function jump_dytk(){
	$("#dytk").hide();
	$(".window-mask").hide();
	window.open(jump_url);
}

function change_secn(num){
	num--;
	if(num==0){
		$("#window-footer").html('<input onclick="hide_dytk()" class="cancel" type="button" value="不同意"><input onclick="jump_dytk()" class="ok" type="button" value="同意">');
	}else{
		$("#window-footer").html('<input onclick="hide_dytk()" class="cancel" type="button" value="不同意"><input class="cancel" style="margin-left:30px;" type="button" value="同意('+num+')">');
		setTimeout(function(){
			change_secn(num);
		},1000);
	}
}

function baoming(projectguid,zhuanTingGuid,systemtype){
	$.ajax({
        type: "POST",
        url: "bmFlag",
        dataType: "json",
        data: {infoid:projectguid,type:systemtype},
        success: function (data) {
        	var jmsf = data.jmsf;
        	var bmid = data.bmid;
        	if(jmsf!='44'){
        		alert("当前登录用户不为竞买方身份，不予报名");
        	}else{
        		if(bmid != ''){
        			if(systemtype == "GQ"){
        				window.open("pj_sign_up_view?infoid="+projectguid+"&type="+systemtype+"&bmguid="+bmid+"&zhuanrangType=");
        			}else if(systemtype == "NMG"){
        				if(zhuanTingGuid == ""){
        					window.open("pj_sign_up_view?infoid="+projectguid+"&type=NMG&bmguid="+bmid);
        				}else{
        					window.open("pj_sign_up_view?infoid="+zhuanTingGuid+"&type=ZT&bmguid="+bmid);
        				}
        			}else{
        				window.open("pj_sign_up_view?infoid="+projectguid+"&type="+systemtype+"&bmguid="+bmid);
        			}	
        		}else{
        			if(systemtype == "NMG"){
        				if(zhuanTingGuid == ""){
        					window.open("pj_sign_up?infoid="+projectguid+"&type=NMG&bmguid=");
        				}else{
        					window.open("pj_sign_up?infoid="+zhuanTingGuid+"&type=ZT&bmguid=");
        				}
        			}else if(systemtype=='CCJT'){
        				var win = $(window);
        				var w = win.outerWidth() + win.scrollLeft();
        				$(".window-mask").show();
        				$("#dytk").css({"left": (w - 800) / 2, "top" : (win.scrollTop() + 20)});
        				$("#dytk").show();
        				change_secn(6);
        				jump_url = "pj_sign_up?infoid="+projectguid+"&type="+systemtype+"&bmguid=";
        			}else{
        				window.open("pj_sign_up?infoid="+projectguid+"&type="+systemtype+"&bmguid=");
        			}	
        		}
        	}
        }
	});
}
var ejy_login_url = "http://58.216.221.106:8001/cjshy/DanDianLogin/Pages/login.ashx";
var ejy_login_role_url = "http://58.216.221.106:8001/cjshy/DanDianLogin/Pages/SelectLoginType.ashx";
function forward(role,u,p){
	var params ={"u":u,"p":p};
	$.ajax({
		type:"post",
		url: ejy_login_url,
		dataType: "jsonp",
		jsonp:"callback",
		data :params,
		jsonpCallback:"successCallback",
		xhrFields:{ 
			withCredentials:true 
		},
		success:function(data){
			var login = data == null ? false : data == "success";
			if(login){
				$("#ejy_login").attr("href",ejy_login_url + "?u=" + u + "&p=" + p);
				$("#ejy_login").click();				
				$.ajax({
					type:"post",
					url: ejy_login_role_url + "?type=" + role,
					dataType: "jsonp",
					jsonp:"callback",
					data :params,
					jsonpCallback:"successCallback",
					xhrFields:{ 
						withCredentials:true 
					},
					success:function(result){
						var choose_role = result == null ? false : result == "success";
						if(choose_role){							
							//跳转到会员系统
							window.open("http://58.216.221.106:8001/cjshy/login_07.aspx");
						}else{
							alert("登录失败，检查网络");
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown) {
					    alert("登录异常，检查网络");
					}
				});
			}else{
				alert("登录失败，检查网络");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
		    alert("登录异常，检查网络");
		}
	});
}