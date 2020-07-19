var action = wsaction;
window.editSaveImg = function() {
	if(action != "edit") return;
	var data = $("#products_set").serialize();
	ppAjax.post("index.php?u=products-save_images-ajax-1", data, function(html) { });
};
window.editSaveFile = function() {
	if(action != "edit") return;
	var data = $("#products_set").serialize();
	ppAjax.post("index.php?u=products-save_downs-ajax-1", data, function(html) { });
};
window.isDrop = !!window.FileReader;
var kpUpload = {
	scaleImg : function (img, maxW, maxH) {
		img.height = maxH;
		img.width = maxW;
	},
	boxAdd : function(file, big, thumb, aid) {
		var img = document.createElement("img");
			img.setAttribute("class", "img-responsive");
			img.setAttribute("style", "height:100px;overflow:hidden;");
		var inps = '<div class="caption">';
			inps += '<input name="images['+aid+'][big]" value="'+big+'" type="hidden" />';
			inps += '<input name="images['+aid+'][thumb]" value="'+thumb+'" type="hidden" />';
			inps += '<input name="images['+aid+'][aid]" value="'+aid+'" type="hidden" />';
			inps += '<input name="images['+aid+'][ishide]" id="hide_'+aid+'" value="0" class="hideinput" type="hidden" />';
			inps += '<input type="text" id="alt_'+aid+'" name="images['+aid+'][content]" placeholder="描述,可留空" class="form-control input-sm" />';
			inps += '<a href="javascript:;" class="btn btn-danger btn-xs d_del" aid="'+aid+'" onclick="photo_del('+aid+');"><span class="icon-cross"></span></a>';
			inps += '<a href="javascript:;" class="btn btn-info btn-xs d_insert" aid="'+aid+'" onclick="photo_insert('+aid+',\''+big+'\');"><span class="icon-plus"></span></a>';
			inps += '</div>';
		var thumbnail = $('<div class="thumbnail mb0">'+inps+'</div>').prepend(img);
		var d_li = $('<div class="col-xs-4 d_li" id="photo_'+aid+'" pid="'+aid+'"></div>').prepend(thumbnail);
		$("#pp_imgup").before(d_li);
		$("#pp_dropbox").kpdragsort(".d_li",0);
		editSaveImg();
		var pw = $("#pp_img_but").width();
		if(typeof file == "object"){
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				img.src = e.target.result;
				img.onload = function() {
					kpUpload.scaleImg(this, pw, pw);
				}
			};
		}else if(typeof file == "string") {
			img.src = file;
			img.onload = function() {
				kpUpload.scaleImg(this, pw, pw);
			}
		}
		layer.closeAll();
	},
	fileboxAdd : function(file,aid,size,name) {
		var inps = '<div class="col-xs-7"><input type="hidden" name="downs['+aid+'][aid]" value="'+aid+'"><input type="hidden" class="form-control" name="downs['+aid+'][down_url]" value="'+file+'" readonly="readonly"><input type="text" class="form-control" name="downs['+aid+'][title]" value="'+name+'"></div>';
			inps += '<div class="col-xs-3"><input name="downs['+aid+'][size_mb]" value="'+size+'" type="text" class="form-control" /></div>'; 
			inps += '<div class="col-xs-2"><a href="javascript:;" class="btn btn-danger" aid="'+aid+'" onclick="file_del('+aid+');"><i class="icon-uniE614"></i></a></div>'; 
		var d_li = $('<div class="row mar2 item" id="file_'+aid+'">'+inps+'</div>');
		$("#downlist").append(d_li);
		$("#downlist").kpdragsort(".item",1);
		checkfile_num();
		editSaveFile();
		layer.closeAll();
	},
	isImg : function(type) {
		switch (type) {
			case 'image/jpg':
			case 'image/jpeg':
			case 'image/png':
				return true;
			default:
				return false;
		}
	},
};
function checkimages_num(){
	var img_li = $('#pp_dropbox .d_li');
	if(img_li.length >= maximg){
		$('#pp_imgup').hide();
		return false;
	}else{
		$('#pp_imgup').show();
		return true;
	}
}
function checkfile_num(){
	var img_li = $('#downlist .item');
	if(img_li.length >= uploadmax){
		$('#pp_file_but').hide();
		return false;
	}else{
		$('#pp_file_but').show();
		return true;
	}
}
function photo_del(aid) {
	var tr = $("#photo_" + aid);
	ppAjax.post("index.php?u=products-del_attach-ajax-1", {"aid":aid}, function(data) {
		ppAjax.alert(data);
		if(window.ppData.err==0) {
			tr.remove();
			editSaveImg();
			checkfile_num();
			layer.msg('删除成功');
		}else{
			layer.msg(window.ppData.msg, function(){});
		}
	});
}
function file_del(aid) {
	var tr = $("#file_" + aid);
	ppAjax.post("index.php?u=products-del_attach-ajax-1", {"aid":aid}, function(data) {
		ppAjax.alert(data);
		if(window.ppData.err==0) {
			tr.remove();
			editSaveFile();
			checkfile_num();
			layer.msg('删除成功');
		}else{
			layer.msg(window.ppData.msg, function(){});
		}
	});
}
function layeralert(info) {
	layer.closeAll();
	layer.msg(info, function(){});
}
$("#pp_dropbox").kpdragsort(".d_li",0);
$("#downlist").kpdragsort(".item",1);
$(document).ready(function(){
	ppLoadJs(
		"/static/fileupload/js/vendor/jquery.ui.widget.js",
		"/static/fileupload/js/load-image.all.min.js",
		"/static/fileupload/js/jquery.iframe-transport.js",
		"/static/fileupload/js/jquery.fileupload.js",
		"/static/fileupload/js/jquery.fileupload-process.js",
		"/static/fileupload/js/jquery.fileupload-image.js",
		"/static/fileupload/js/jquery.fileupload-validate.js", function(){});
	checkimages_num();
	checkfile_num();
	change_auto();
	if(typeof window.editor_once != 'undefined') return;
	window.editor_once = 1;
	window.memurl = (function() {
		var url = document.URL || location.href;
		return url.substr(0, url.lastIndexOf("/"));
	})();
	window.weburl = (function() {
		return memurl.substr(0, memurl.lastIndexOf("/"));
	})();
	window.UEDITOR_HOME_URL = "/static/admin/js/ueditor/";
	ppLoadJs(UEDITOR_HOME_URL+"ueditor.config.js", UEDITOR_HOME_URL+"ueditor.all.min.js", UEDITOR_HOME_URL+"lang/zh-cn/zh-cn.js", function(){
		$("#content").removeAttr("class");
		ue = UE.getEditor("content", {
			initialFrameWidth : '99%', 
			initialFrameHeight : 200, 
			toolbars: [[
            'undo', 'redo', '|',
            'bold', 'removeformat', 'forecolor'
			]],
			retainOnlyLabelPasted: true,
			enableContextMenu: false,
			pasteplain:false,
			'filterTxtRules' : function(){
				function transP(node){
					node.tagName = 'p';
					node.setStyle();
				}
				return {
					'-' : 'script style object iframe embed input select',
					'p': {$:{}},
					'br':{$:{}},
					'b':{$:{}},
					'strong':{$:{}},
					'div':{'$':{}},
					'li':{'$':{}},
					'caption':transP,
					'th':transP,
					'tr':transP,
					'h1':transP,'h2':transP,'h3':transP,'h4':transP,'h5':transP,'h6':transP,
					'td':function(node){
						var txt = !!node.innerText();
						if(txt){
							node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'),node);
						}
						node.parentNode.removeChild(node,node.innerText())
					}
				}
			}(),
		});
		window.editor_api = {
			content : {
				obj : ue,
				get : function() {
					return this.obj.getContent();
				},
				set : function(s) {
					var s=replace_html(s);
					return this.obj.setContent(s);
				},
				focus : function(){
					return this.obj.focus();
				}
			}
		};
		ue.ready(function(){
			check_images();
		});
		if(action == "add") {
			ue.addListener('contentChange', function(){
				ue.sync();
			});
		}
		ue.addListener("beforePaste", function (type, data){
			data.html=replace_html(data.html);
		});
		ue.addListener("blur", function (type, event) {
			check_images();
		});
		function replace_html(datahtml){ 
			datahtml=datahtml.replace(/<img[^>]*>/ig,'');
			datahtml=datahtml.replace(/<a[^>]*>/ig,'');
			datahtml=datahtml.replace(/<\/a>/ig,'');
			return datahtml;
		}
		$(window).resize(function(){
			var w = '99%';
			$(".edui-container").width(w);
			$(".edui-body-container").css({"width" : w-20});
			$(".edui-editor-body textarea").eq(1).css({"width" : w});
		});
	});
});
function change_auto(){
	var _bool = $("input[name='info[is_auto]']:checked").val();
	if(_bool == 0){
		$('#auto_0').show('fast');
		$('#auto_1').hide('fast');
	}else if(_bool == 1){
		$('#auto_0').hide('fast');
		$('#auto_1').show('fast');
	}
}
function check_images(){
	var content = ue.getContent();
	$('#demo').html(content);
	var imgs 	= $('#demo').find('img[aid]');
	$('#pp_dropbox .thumbnail').removeClass('bred');
	$('.hideinput').val(0);
	imgs.each(function(){
		var aid = $(this).attr('aid');
		var elm 	= $('#photo_' + aid) ;
		elm.find('.thumbnail').addClass('bred');
		$('#hide_' + aid).val(1);
	});
}
function photo_insert(aid,big){
	var elm 	= $('#photo_' + aid) ;
	var _alt 	= $('#alt_' + aid).val();
	var img 	= '<img class="img-responsive center-block" src="/'+big+'" aid="'+aid+'" alt="'+_alt+'">';
	elm.find('.thumbnail').addClass('bred');
	$('#hide_' + aid).val(1);
	ue.execCommand('insertHtml', img);
}
function jinfen_help(){
	layer.alert('例：您设置价格为100元，最多可抵扣10元，那么可能发生的交易如下：<br/><br/>买家一：用100'+jf_name+'抵'+parseInt(100/jf_rate)+'元，另付现金'+parseInt(100-100/jf_rate)+'元<br/>买家二：用80'+jf_name+'抵'+parseInt(80/jf_rate)+'元，另付现金'+parseInt(100-80/jf_rate)+'元<br/>买家三：用30'+jf_name+'抵'+parseInt(30/jf_rate)+'元，另付现金'+parseInt(100-30/jf_rate)+'元<br/>买家四：只有8'+jf_name+'不足抵扣，全额支付100元<br/>...<br/><br/>注：买家'+jf_name+'抵扣必为10的整倍数！',{title:''+jf_name+'抵扣说明'});
}
ppAjax.submit("#products_set", function(data){
	ppAjax.alert(data);
	if(window.ppData.err==0) {
		layer.msg(window.ppData.msg, {icon: 1,time: 2000,shade: 0.6}, function(){window.location = 'index.php?u=products-index';});
	}else{
		layer.msg(window.ppData.msg, function(){});
	}
});
/* 0缩略图 1图集 2附件 */
function fileupload(type){
	var url,elm,progress_div,maxSize;
	if(type == 0){
		url = 'index.php?u=attach-upload_image&type=pic'+edit_cid_id+'&ajax=1';
		elm = $('#fileupload_thumb') ;
		progress_div = '#thumb_progress' ;
		maxSize = up_img_max_size ;
	}else if(type == 1){
		url = 'index.php?u=attach-upload_image&type=img'+edit_cid_id+'&ajax=1';
		elm = $('#fileupload_images') ;
		progress_div = '#images_progress' ;
		maxSize = up_img_max_size ;
		if(!checkimages_num()) return false;
	}else{
		url = 'index.php?u=attach-upload_file'+edit_cid_id+'&ajax=1';
		elm = $('#fileupload_files') ;
		progress_div = '#files_progress' ;
		maxSize = up_file_max_size ;
		if(!checkfile_num()) return false;
	}
	$(progress_div + ' .progress-bar').css('width','0');
    elm.fileupload({
        url: url,
        dataType: 'json',
		maxFileSize: maxSize * 1024,
		maxNumberOfFiles : 1,
		messages: {
			maxFileSize: '文件大小不能超过 ' + maxSize + ' KB',
		},
        done: function (e, data) {
			if(data.result.state != "SUCCESS"){
				layer.msg(data.result.state); return false;
			}
			if(type == 0){
				set_thumb(data);
			}else if(type == 1){
				set_images(data);
			}else{
				set_files(data);
			}
        },
		processfail: function (e, data) {
			var currentFile = data.files[data.index];
			if (data.files.error && currentFile.error){
				layer.msg(currentFile.error,function(){});
			}
		},
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(progress_div + ' .progress-bar').css('width',progress + '%');
        }
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
function set_thumb(data) {
	$("#pp_pic_val").val(data.result.thumb);
	$("#pp_pic_pid").val(data.result.aid);
	$("#pp_pic_img").attr("src", "../"+data.result.thumb);
}
function set_images(data) {
	if(!checkimages_num()) return false;
	kpUpload.boxAdd("../"+data.result.thumb, data.result.path, data.result.thumb, data.result.aid);
	checkimages_num();
}
function set_files(data){
	if(!checkfile_num()) return false;
	kpUpload.fileboxAdd(data.result.path,data.result.aid,data.result.size,data.result.name);
	checkfile_num();
}