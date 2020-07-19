/* 官网:kuaiym.com */
function ppLoadJs() {
	var args = arguments;
	var load = function(i) {
		if(typeof args[i] == 'string') {
			var file = args[i];
			var tags = document.getElementsByTagName('script');
			for(var j=0; j<tags.length; j++) {
				if(tags[j].src.indexOf(file) != -1) {
					if(i < args.length) load(i+1);
					return;
				}
			}
			var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = file;
			if(i < args.length) {
				script.onload = script.onreadystatechange = function() {
					if(!script.readyState || /loaded|complete/.test(script.readyState)) {
						script.onload = script.onreadystatechange = null;
						script = null;
						load(i+1);
					}
				};
			}
			document.getElementsByTagName('head')[0].appendChild(script);
		}else if(typeof args[i] == 'function') {
			args[i]();
			if(i < args.length) {
				load(i+1);
			}
		}
	};
	load(0);
}
function ppLoadCss(file) {
	var tags = document.getElementsByTagName('link');
	for(var j=0; j<tags.length; j++) {
		if(tags[j].href.indexOf(file) != -1) {
			return false;
		}
	}
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = file;
	document.getElementsByTagName('head')[0].appendChild(link);
}
/* 拖拽插件 */
$.fn.kpdragsort = function(item,file) {
	var container = this;
	$(container).children(item).off("mousedown").mousedown(function(e) {
		if(e.which != 1 || $(e.target).is("input, textarea, a,span") || window.kp_only) return;
		e.preventDefault();
		var x = e.pageX;
		var y = e.pageY;
		var _this = $(this); 
		var w = _this.width();
		var h = _this.height();
		var w2 = w/2;
		var h2 = h/2;
		var p = _this.position();
		var left = p.left;
		var top = p.top;
		var sTop = $(".p:first").scrollTop();
		var pw = $("#pp_dropbox .d_li .thumbnail").eq(0).outerWidth() + 'px';
		window.kp_only = true;
		_this.before('<div id="kp_widget_holder"></div>');
		var wid = $("#kp_widget_holder");

		if(file){
			wid.css({"border":"1px dashed #ccc", "height":_this.outerHeight(true)-4});
		}else{
			wid.css({"border":"1px dashed #ccc", "float":"left", "width":pw, "height":"222px"});
		}
		_this.css({"width":w, "height":h, "position":"absolute", opacity: 0.8, "z-index": 999, "left":left, "top":top});
		$(document).mousemove(function(e) {
			e.preventDefault();
			var l = left + e.pageX - x;
			var t = top + ($(".p:first").scrollTop() - sTop) + e.pageY - y;
			_this.css({"left":l, "top":t});
			var ml = l+w2;
			var mt = t+h2;
			$(container).children(item).not(_this).not(wid).each(function(i) {
				var obj = $(this);
				var p = obj.position();
				var a1 = p.left;
				var a2 = p.left + obj.width();
				var a3 = p.top;
				var a4 = p.top + obj.height();
				if(a1 < ml && ml < a2 && a3 < mt && mt < a4) {
					if(!obj.next("#kp_widget_holder").length) {
						wid.insertAfter(this);
					}else{
						wid.insertBefore(this);
					}
					return;
				}
			});
		});
		var _mouseup = function() {
			$(document).off('mouseup').off('mousemove');
			var p = wid.position();
			_this.animate({"left":p.left, "top":p.top}, 100, function() {
				_this.removeAttr("style");
				wid.replaceWith(_this);
				window.kp_only = null;
			});
		};
		$(document).mouseup(_mouseup);
	});
};
var KYM = {
	'bond_trace_check': function() {
		$.ajax({
			url: memurl + '/index.php?u=shop-bond_trace_check-ajax-1',
			type: 'POST',
			data:{'rnum':Math.random()},
			dataType: 'json',
			success: function(res){
				if(res.msg > 0){
					$("#mem_body").before("<p class='alert alert-warning text-center mt5'><b>追缴赔付：您有未赔付的订单，请及时充值处理！<a href='" + memurl + "/index.php?u=shop-bond_trace'>详情点击</a></b>");
				}else{
					return false;
				}
			}
		});
	},
	'up_group': function(groupid,group_price,group_bond) {
		var err = 0 , c_price = 0, c_bond = 0 ;
		if(group_bond > _bond){
			c_bond += group_bond-_bond ;
		}
		if((group_price + c_bond)  > _money){
			var str = "<strong class='text-danger'>余额不足</strong>！";
				str += "<br>您的当前余额为：<strong class='text-success'>"+_money+"</strong> 元";
				if(group_price > 0){
					str += "<br>升级需付开户费：<strong class='text-success'>"+group_price+"</strong> 元";
				}
				str += "<br>补缴保证金差额：<strong class='text-success'>"+c_bond+"</strong> 元 (需"+group_bond+",已交"+(_bond-0)+")";
				str += "<br>您至少需要充值：<strong class='text-success'>"+(group_price + c_bond -_money).toFixed(2)+"</strong> 元";
			layer.open({
				title: ['友情提醒', 'font-weight:bold;color:green'],
				btn: ['去充值', '取消'],
				yes: function(index, layero){
					window.location.href	= memurl +'/index.php?u=record-order-price-' + (group_price + c_bond -_money).toFixed(2);
				},cancel: function(index){
				},
				shadeClose: true,
				content: str
			});
			return false;
		}else{
			var str = "您确定要升级吗？<hr style='margin:10px 0;'>您的当前余额为：<strong class='text-success'>"+_money+"</strong>元";
			if(group_price > 0){
				str += "<br/>需要支付开户费：<strong class='text-danger'>"+group_price+"</strong> 元；";
			}
			if(c_bond > 0){
				str += "<br/>另需缴纳保证金：<strong class='text-danger'>"+c_bond +"</strong> 元（自动增加保证金）；";
			}
			layer.open({
				title: ['友情提醒', 'font-weight:bold;color:green'],
				btn:['确认','取消'],
				yes:function(index,layero){
					$.ajax({
						type	: "POST",
						cache	: false,
						url		: memurl +"/index.php?u=index-up_group-ajax-1",
						data	: {"groupid":groupid,"price":group_price,"bond":group_bond},
						success	: function(data){
							ppAjax.alert(data);
							if(window.ppData.err==0){
								layer.msg('会员组升级成功，请稍后！', {icon: 1,time: 2000,shade: 0.6}, function(){window.location.reload();});
							}else{
								layer.alert(window.ppData.msg, {icon: 5,shade: 0.6}) ;
							}
						},
						error : function(html){
							layer.alert("提交数据失败，代码:"+ html.status +"，请稍候再试", {icon: 0,shade: 0.6}) ;
						}
					});
				},
				cancel:function(index){
					layer.close(index);
				},
				shadeClose: true,
				content: str
			});
		}
	},
	'verify_show': function() {
		$('#beshop').show('fast');
	},
	'AutoTab': function() {
		if(location.hash) {
			$('a[href=' + location.hash + ']').tab('show');
		}
		$(document.body).on("click", "a[data-toggle]", function(event){
			location.hash = this.getAttribute("href");
		});
		$(window).on('popstate', function() {
			var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
			$('a[href=' + anchor + ']').tab('show');
		});
	},
	'be_shop': function() {
		var index = layer.confirm(shop_tips, {icon:0, title:'商家申请',btn:0});
	},
	'be_shop_submit': function(){
		$.ajax({
			url: memurl + '/index.php?u=index-beshop',
			type: 'POST',
			data:{'rnum':Math.random()},
			dataType: 'json',
			success: function(res){
				if(res.err==0){
					layer.alert(res.msg, {icon: 1}, function(){
						window.location.href="index.php?u=shop-index";
					});
				}else{
					layer.msg(res.msg, function(){});
				}
			}
		});
		layer.close(index);
	},
	'order': {
		'init': function() {
			$("#paybank_types input[type='radio']").eq(0).attr('checked','checked');
			var type = $("#paybank_types input[name='paybank']:checked").val();
			$('#' + type +'_info').show('fast');
			if($("#paybank_types input[name='paybank']").length ==1 && $('#' + type +'_info input').length > 0){
				$('#' + type).hide();
			}
			$('#d_price').change(function(){
				$('#d_price_notice').text($(this).val() * jf_rate);
			});
			if($("input[name='paybank']").length > 0){
				$('#order_submit').attr('disabled',false);
				$("#order_submit").click(function(){
					if($('#price').val() <= 0){
						layer.msg('金额不正确！', function(){});
						return false;
					}
					$('#order_form').submit();
				});
			}else{
				$('#order_submit').attr('disabled',true).val('线上充值渠道尚未开通');
			}
			$('#money').change(function(){
				var money = ($(this).val() - 0).toFixed(2);
				$(this).val(money);
				var charge = $(this).val() * _charge / 100;
				var err = 0 , msg = '';
				if(money <= 0){
					err ++;
					msg += '提现金额不能为0或空<br />';
				}
				if(money < _mintx){
					err ++;
					msg += '单笔提现金额不少于'+_mintx+'元<br />';
				}
				if(err>0){
					$(this).val('');
					$("#charge").val('');
					$("#overmoney").val('');
					layer.alert(msg, {icon: 5,shade: 0.6}) ;
					$('#tx_submit').attr('disabled',true);
					err = 0 ;
					msg = '';
					return false;
				}else{
					$("#charge").val(charge.toFixed(2));
					$("#overmoney").val((money - $("#charge").val() - 0).toFixed(2));
					$('#tx_submit').attr('disabled',false);
				}
			});
			ppAjax.submit("#change_form", function(data){
				ppAjax.alert(data);
				if(window.ppData.err==0) {
					layer.msg(window.ppData.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location.reload();});
				}else{
					layer.msg(window.ppData.msg, function(){});
				}
			});
			ppAjax.submit("#tx_form", function(data){
				ppAjax.alert(data);
				if(window.ppData.err==0){
					layer.msg(window.ppData.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location = 'index.php?u=record-index-type-3';});
				}else{
					layer.msg(window.ppData.msg, function(){});
				}
			});
		},
		'change_pay_type': function() {
			var type = $("#paybank_types input[name='paybank']:checked").val();
			$('.paybank_info').hide('fast');
			$('#' + type +'_info').show('fast');
		},
	},
	'book': {
		'contact': function(sellid) {
			var qqlist = '';
			$.ajax({
				type	: "POST",
				cache	: false,
				url		: 'index.php?u=shop-get_by_uid',
				data	: {'uid':sellid},
				success	: function(data){
					res = toJson(data);
					_qqlist = toJson(res.qqlist);
					$.each(_qqlist, function(n,item){
						qqlist += '<p><a class="text-info" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+item.qq+'&site=qq:'+item.qq+'&menu=yes"><i class="icon-qq"></i> [客服] '+item.name+'</a></p>';
					});
					layer.alert(qqlist,{title: '联系商家：' + res.shopname,btn:'关闭',closeBtn: 0});
				},
				error : function(html){
					layer.alert("查询卖家联系方式失败："+ html.status +"，请稍候再试", {icon: 0,shade: 0.6}) ;
				}
			});
		},
		'confirm': function(order_id) {
			layer.confirm('确认验收？确认后交易即完成！', {icon: 3, title:'确定？'}, function(index){
				ppAjax.post("index.php?u=book-over-ajax-1", {"order_id":order_id}, function(data){
					ppAjax.alert(data);
					if(window.ppData.err==0){
						window.location.reload();
					}else{
						layer.msg(window.ppData.msg);
					}
				});
			});
		},
		'fahuo': function(order_id) {
			layer.confirm('确认已发货？<br/>请通过QQ、邮件、或买家预留的收货方式发送给买家', {icon: 3, title:'确定？'}, function(index){
				ppAjax.post("index.php?u=book-fahuo-ajax-1", {"order_id":order_id}, function(data){
					ppAjax.alert(data);
					if(window.ppData.err==0){
						window.location.reload();
					}else{
						layer.msg(window.ppData.msg);
					}
				});
			});
		},
		'change_type': function(type) {
			$('#tuikuan_price_wrap').hide('fast');
			$('#tuikuan_add').show('fast');
			if(type == 2){
				$('#tuikuan_add').hide('fast');
			}
			if(type == 1){
				$('#tuikuan_price_wrap').show('fast');
			}
		},
		'change_buyer_type': function(type) {
			$('#tuikuan_add').show('fast');
			if(type == 1){
				$('#tuikuan_add').hide('fast');
			}
		},
		'tk_add': function(order_id,buyerid,sellerid) {
			var type = $('input[name=agree]:checked').val() , buyer_type = $('input[name=buyer_agree]:checked').val() , tui_price = 0, notice = '确定提交？', content = $('#tuikuan_add').val();
			if(buyer_type == 1){
				KYM.book.tk_over(''+order_id+'',0);
			}else{
				if(type == 2){
					layer.confirm('确认全额退款？提交后交易立即结束！', {icon: 3, title:'确定？'}, function(index){
						ppAjax.post("index.php?u=book-before_over-ajax-1", {"order_id":order_id}, function(data){
							ppAjax.alert(data);
							if(window.ppData.err==0){
								KYM.book.tk_over(''+order_id+'',type);
							}else{
								layer.msg(window.ppData.msg);return false;
							}
						});
					});
				}else{
					if(type == 1){
						tui_price = $('#tuikuan_price').val();
						if(tui_price == '' || tui_price <=0){
							layer.msg('退款金额不正确！');return false;
						}
						notice = '确认同意部分退款？退还买家 <strong class="text-info">'+ tui_price +'</span> 元';
					}else{
						if(content == ''){
							layer.msg('内容字数太少！');return false;
						}
					}
					layer.confirm(notice, {icon: 3}, function(index){
						ppAjax.post("index.php?u=tuikuan-add-ajax-1", {"order_id":order_id,"tui_price":tui_price,"content":content,"type":type}, function(data){
							ppAjax.alert(data);
							if(window.ppData.err==0){
								window.location.reload();
							}else{
								layer.msg(window.ppData.msg);return false;
							}
						});
					});
				}
			}
		},
		'tk_over': function(order_id,type) {
			ppAjax.post("index.php?u=book-over-ajax-1", {"order_id":order_id}, function(data){
				ppAjax.alert(data);
				if(window.ppData.err==0){
					if(type == 2){
						window.location.href="index.php?u=book-sell";
					}else{
						window.location.href="index.php?u=book-index";
					}
				}else{
					layer.msg(window.ppData.msg);
				}
			});
		},
		'rat': function(oid) {
			var btn = '#btn_' + oid;
			var msg = '#msg_' + oid;
			var rated = $('input[name=rated_'+oid+']:checked').val() , content = $(msg).val();
			$.ajax({
				url: '/member/index.php?u=comment-post-ajax-1',
				type: 'POST',
				data:{'content':content,'oid':oid,'rated':rated,'rnum':Math.random()},
				dataType: 'json',
				success: function(res){
					if(res.err==0){
						layer.msg(res.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location.reload();});
					}else{
						layer.msg(res.msg, function(){});
					}
				}
			});

		},
		'del': function(oid,_type){
			layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){
				$.ajax({
					url: '/member/index.php?u=book-del',
					type: 'POST',
					data:{'oid':oid,'type':_type,'rnum':Math.random()},
					dataType: 'json',
					success: function(res){
						if(res.err==0){
							layer.msg(res.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location.reload();});
						}else{
							layer.msg(res.msg, function(){});
						}
					}
				});
			});
		},
		'zhongjie': function(order_id) {
			layer.confirm('确定申请官方客服介入？<br/>申请后请等待官方客服与您联系！', {icon: 3, title:'提示'}, function(index){
				$.ajax({
					url: '/member/index.php?u=book-zhongjie',
					type: 'POST',
					data:{'oid':order_id,'rnum':Math.random()},
					dataType: 'json',
					success: function(res){
						if(res.err==0){
							layer.msg(res.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location.reload();});
						}else{
							layer.msg(res.msg, function(){});
						}
					}
				});
			});
		},
		'countDown': function(time,timelem,oid,msg) {
			var end_time = new Date(time).getTime(),
			sys_second = (end_time-new Date().getTime())/1000;
			var timer = setInterval(function(){
				if (sys_second > 0) {
					sys_second -= 1;
					var hour = Math.floor((sys_second / 3600) );
					var minute = Math.floor((sys_second / 60) % 60);
					var second = Math.floor(sys_second % 60);
					timelem.html(hour + " 小时 " + minute + " 分 " + second + " 秒后" + msg);
				} else {
					clearInterval(timer);
					KYM.book.auto_comment(oid);
					$("#info_"+oid).html('');
					$("#star_"+oid).hide();
					timelem.html('已结束！');
				}
			}, 1000);
		},
		'auto_comment': function(_oid) {
			$.post("/member/index.php?u=book-auto_comment-ajax-1",{oid:_oid},function(result){});
		},
		'test': function(sellid) {
			
		}
	},
	'pro': {
		'change_val': function(obj, id , cid ,type) {
			var td = $(this);
			var txt = obj.text();
			var input = $("<input type='text' class='form-control input-sm' value='" + txt + "'/>");
			obj.html(input);
			input.select();
			input.click(function () {
				return false;
			});
			input.trigger("focus");
			input.blur(function () {
				var newtxt = $(this).val();
				if (newtxt != txt) {
					obj.html(newtxt);
					ppAjax.post("index.php?u=products-ajaxset-ajax-1", {"id":id, "type":type, "cid":cid, "txtvalue":newtxt}, function(data){
						ppAjax.alert(data);
						if(window.ppData.err==0){
							layer.closeAll();
							layer.msg(window.ppData.msg);
						}else{
							obj.html(txt);
							layer.msg(window.ppData.msg);
						}
					});
				} else {
					obj.html(txt);
				}
			});
		},
		'staus': function(id, cid,value) {
			var flag = arguments[3] ? arguments[3] : 0;
			var str = '';
			if(flag && value == 2){
				str = '<br>已做推广，确定要下架吗？';
			}
			layer.confirm('确定？' + str, {icon: 3, title:0}, function(index){
				ppAjax.post("index.php?u=products-ajaxset-ajax-1", {"id":id, "type":'status', "cid":cid, "txtvalue":value}, function(data){
					ppAjax.alert(data);
					if(window.ppData.err==0){
						layer.closeAll();
						layer.msg(window.ppData.msg,function(){window.location.reload();});
					}else{
						obj.html(txt);
						layer.msg(window.ppData.msg);
					}
				});
			});
		},
		'edit': function(id, cid) {
			window.location = 'index.php?u=products-edit-id-'+id+'-cid-'+cid;
		},
		'setflag': function(id, cid) {
			window.location = 'index.php?u=products-setflag-id-'+id+'-cid-'+cid;
		},
		'flag_int': function() {
			var pid 	= $('#pid').val();
			var cid 	= $('#cid').val();
			$('#dz_submit').click(function(){
				var flags 	= $('#flags').val();
				var days	= $('input[name=days]:checked').val();
				KYM.pro.flag_submit(pid,cid,flags,days);
			});
			$('.days').click(function(){
				var sid 	= $(this).attr('sid'),days = $(this).val(),per_price = $(this).attr('per_price');
				var total_price	= days * per_price ;
				$("#flags").val(sid);
				$('#flag_form .panel').removeClass('panel-success').addClass('panel-default');
				$('#panel_' + sid).removeClass('panel-default').addClass('panel-success');
				var res = '';
				if(total_price > _gold){
					var z_gold	= parseInt(_gold/jf_rate)*jf_rate ; 
					var jifen_cha = total_price - z_gold ;
					var money_cha = jifen_cha / jf_rate ;
					if(money_cha > 0 && money_cha > _money){
						res += '积分余额不足，现金余额不足；<a href=\"index.php?u=record-order\"><i class=\"icon-link\"> 再充值<code>'+ (money_cha-_money)+'元</code>可购买此广告位</a>';
						$('#dz_submit').hide();
					}else{
						res += '提交后将扣除：<code>'+z_gold+'</code>'+jf_name+'，<code>'+money_cha+'</code>元现金';
						$('#dz_submit').show();
					}
				}else{
					res += '提交后将扣除：'+total_price+jf_name;
					$('#dz_submit').show();
				}
				$('#flag_res').html(res);
			});
		},
		'flag_submit': function(pid,cid,flags,days) {
			layer.confirm('确认购买此广告位？', {icon: 3, title:'确定？'}, function(index){
				ppAjax.post("index.php?u=products-setflag-ajax-1", {"id":pid, "cid":cid, "flags":flags, "days":days}, function(data){
					ppAjax.alert(data);
					if(window.ppData.err==0){
						layer.close(index);
						layer.msg('推广成功！');
						window.location.href = 'index.php?u=products-index';
					}else{
						layer.msg(window.ppData.msg);
					}
				});
			});
		},
		'del': function(id, cid) {
			layer.confirm('删除不可恢复，确定删除？', {icon: 3, title:'确定？'}, function(index){
				ppAjax.post("index.php?u=products-del-ajax-1", {"id":id, "cid":cid}, function(data){
					ppAjax.alert(data);
					if(window.ppData.err==0){
						layer.close(index);
						window.location.reload();
					}
				});
			});
		},
		'refresh': function(id, cid) {
			layer.confirm('分类页面置顶效果！<br/>扣除<b class="text-red">'+jf_refresh+jf_name+'</b>/次', {icon: 3, title:'确定？'}, function(index){
				ppAjax.post("index.php?u=products-refresh-ajax-1", {"id":id, "cid":cid}, function(data){
					ppAjax.alert(data);
					if(window.ppData.err==0){
						layer.close(index);
						layer.msg('置顶成功！');
						$('.time_'+id+'_'+cid).text('刚刚');
					}else{
						layer.alert(window.ppData.msg);
					}
				});
			});
		},
	},
	'bind_sms': function() {
		if($('#code').val().length == '') {
			layer.tips('验证码不能为空','#code',{tips: 1});
			return false;
		}
		$.ajax({
			url: memurl + '/index.php?u=public-sms_active',
			type: 'POST',
			data:{'code':$('#code').val(),'mobile':$('#mobile').val(),'rnum':Math.random()},
			dataType: 'json',
			success: function(res){
				if(res.err==0){
					layer.msg(res.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location.reload();});
				}else{
					layer.msg(res.msg, function(){});
				}
			}
		});
	},
	'send_sms' :function() {
		if($('#mobile').val().length == '') {
			layer.tips('手机号码不能为空','#mobile',{tips: 1});
			return false;
		}
		if($('#smscode').val().length == '') {
			layer.tips('请输入图形验证码','#smscode',{tips: 1});
			return false;
		}
		$.ajax({
			url: memurl + '/index.php?u=public-send_sms_code',
			type: 'POST',
			data:{'mobile':$('#mobile').val(),'code':$('#smscode').val(),'rnum':Math.random()},
			dataType: 'json',
			success: function(res){
				if(res.err > 1){
					$('#btnSendMsg').hide();
					$("#mobile").attr("readonly", true);
					layer.tips(res.msg,'#code');
				}else{
					$('#btnSendMsg').show();
					layer.msg(res.msg,function(){});
					$("#smsImg").trigger("click"); 
					return false;
				}
			}
		});
		$("#sendcode").attr("disabled", true);
		var count = 60;
		var countdown = setInterval(CountDown_sms, 1000);
		function CountDown_sms(){
			$("#sendcode").attr("disabled", true);
			$("#sendcode").val(count + " 秒后可重发");
			if (count == 0) {
				$("#sendcode").val("重新发送").removeAttr("disabled");
				$("#mobile").removeAttr("readonly");
				clearInterval(countdown);
			}
			count--;
		}
	},
	'send_email' :function() {
		if($('#email').val().length == '') {
			layer.tips('邮箱地址不能为空','#email',{tips: 1});
			return false;
		}
		if($('#mailcode').val().length == '') {
			layer.tips('请输入图形验证码','#mailcode',{tips: 1});
			return false;
		}
		$.ajax({
			url: memurl + '/index.php?u=public-send_email_code',
			type: 'POST',
			data:{'email':$('#email').val(),'code':$('#mailcode').val(),'rnum':Math.random()},
			dataType: 'json',
			success: function(res){
				if(res.err==0){
					layer.alert(res.msg, function(index){
						layer.close(index);
					});
				}else{
					$("#mailImg").trigger("click"); 
					layer.msg(res.msg,function(){});
					return false;
				}
			}
		});
		var count = 60;
		var countemail = setInterval(CountDown_email, 1000);
		function CountDown_email() {
			$("#email_btn").attr("disabled", true);
			$("#email_btn").val(count + " 秒后可重发");
			if(count == 0){
				$("#email_btn").val("重新发送").removeAttr("disabled");
				clearInterval(countemail);
			}
			count--;
		}
	}
};
function appInfo(){
	var browser = {
			msie: false, firefox: false, opera: false, safari: false,
			chrome: false, netscape: false, appname: '未知', version: ''
		},
		userAgent = window.navigator.userAgent.toLowerCase();
	if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)){
		browser[RegExp.$1] = true;
		browser.appname = RegExp.$1;
		browser.version = RegExp.$2;
	}else if(/version\D+(\d[\d.]*).*safari/.test(userAgent)){
		browser.safari = true;
		browser.appname = 'safari';
		browser.version = RegExp.$2;
	}
	return browser;
}