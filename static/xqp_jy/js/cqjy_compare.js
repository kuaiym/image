//产权交易，加入比一比

/**
 * 隐藏相同项（不同项目类型的 比一比功能页面，隐藏相同项 功能。）
 * 比如：jsp/portal/compare/fc.jsp，注意页面上需要增加id=info_detail_title 和 class=info_detail_list
 */
$(function(){
	$("input[name=chkBest]").click(function(){
		// debugger;
		var is_checked =$(this).is(':checked');
		//标题列
		var $info_detail_title =$("#info_detail_title");
		//数据列
		var $info_detail_list =$(".info_detail_list");
		if($info_detail_title ==null){
			return;
		}
		//如果存在数据列，那么需要处理隐藏和显示
		//1、显示列
		if(!is_checked){
			$info_detail_title.find("li").show();
			$info_detail_list.find("li").show();
			return;
		}
		//2、隐藏列
		var is_show_arr =new Array($info_detail_title.find("li").length);//默认空值表示：列不需要显示
		var lastinfo =null;//上一条“比一比信息”
		$info_detail_list.each(function(i,obj){
			var $info =$(this);//每条“比一比信息”
			var current_info =[];//本次“比一比信息”
			//循环$info所有的li，判断上次的“比一比信息”是否与本次的“比一比信息”字段值一致
			var j =0;
			
			$info.find("li").each(function(){
				var current_li =$(this).html();
				current_info.push(current_li);//将“比一比信息”的每一行字段信息封装到数组中去
				//判断“比一比信息”是否与上次一致，如果不一致直接is_show_arr的元素值，设置成true
				if(lastinfo !=null){
					var last_li =lastinfo[j];
					if(is_show_arr[j] !="true" &&current_li !=last_li){
						is_show_arr[j] ="true";
						//alert("隐藏列:" +current_li);
					}else{
						//不做任何处理
					}
				}
				j++;
			});
			//更新上次的“比一比信息”
			lastinfo =current_info;
		});
		
		//========处理隐藏========
		$info_detail_title.each(function(i,obj){
			var $info =$(this);//每条“比一比信息”
			var i =0;
			if (listSize !='1'){
			$info.find("li").each(function(){
				if(is_show_arr[i] !="true"){//需要隐藏
					$(this).hide();
				}
				i++;
			})};
		});
		$info_detail_list.each(function(i,obj){
			var $info =$(this);//每条“比一比信息”
			var i =0;
            if (listSize !='1'){
			$info.find("li").each(function(){
				if(is_show_arr[i] !="true"){//需要隐藏
					$(this).hide();
				}
				i++;
			})};
		});
	});
});



/**
 * 比一比中是否存在
 */
function compare_exists(projectGuid){
	var cqjy_compare =$.cookie('cqjy_compare');
	var _projectType; //标的分类
	var _projectGuids;//标的GUID
	if(cqjy_compare !=null && $.trim(cqjy_compare) !=""){
		cqjy_compare =RKJSON.decode(cqjy_compare);
		_projectType =cqjy_compare.projectType;
		_projectGuids =cqjy_compare.projectGuids;
		for(var i=0; i<_projectGuids.length; i++) {
		    if(_projectGuids[i] == projectGuid) {
		    	return true;
		    }
		}
	}
	return false;
}

function compare_projectType(){
	var cqjy_compare =$.cookie('cqjy_compare');
	if(cqjy_compare ==null || $.trim(cqjy_compare) ==""){
		return null;
	}else{
		cqjy_compare =RKJSON.decode(cqjy_compare);
		return _projectType =cqjy_compare.projectType;
	}
}

/**
 * 获取比一比列表
 * @returns {Array}
 */
function compare_list(){
	var cqjy_compare =$.cookie('cqjy_compare');
	var _projectType =""; //标的分类
	var _projectGuids =[];//标的GUID
	var _projectList =[];//标的列表
	if(cqjy_compare ==null || $.trim(cqjy_compare) ==""){
	}else{
		cqjy_compare =RKJSON.decode(cqjy_compare);
		_projectType =cqjy_compare.projectType;
		_projectGuids =cqjy_compare.projectGuids;
		_projectList =cqjy_compare.projectList;
	}
	return _projectList;
}

/**
 * 加入比一比
 * @param projectType 标的分类
 * @param projectGuid 标的GUID
 * @param projectTypeCn 标的分类中文名
 * @param title			公告标题
 * @param imgurl		公告图片url
 * @param price			挂牌价格
 * @param infoid		公告的infoid
 * @returns {Boolean}
 */
function compare_add(projectType ,projectGuid ,projectTypeCn ,title ,imgurl ,price ,infoid){
	projectType =projectType !=null ?projectType.toLocaleLowerCase() :null;
	if(projectType !=="fc" && projectType !="fczz" && projectType !="cl"){
		alert("目前只支持房产,房产招租和二手车项目比一比");
		return false;
	}
	//
	var cqjy_compare =$.cookie('cqjy_compare');
	var _projectType; //标的分类
	var _projectGuids;//标的GUID
	var _projectList;//标的列表
	if(cqjy_compare ==null || $.trim(cqjy_compare) ==""){
		cqjy_compare ={
				"projectType" : projectType,
				"projectGuids" :[projectGuid],
				"projectList" :[compare_construct(projectGuid ,title ,imgurl ,price ,infoid)]
		};
	}else{
		if(compare_exists(projectGuid)){
			return;
		}
		cqjy_compare =RKJSON.decode(cqjy_compare);
		_projectType =cqjy_compare.projectType;
		_projectGuids =cqjy_compare.projectGuids;
		_projectList =cqjy_compare.projectList;
		if(_projectGuids.length >=4){
			alert("最多比较4个项目");
			return false;
		}
		if(_projectType !=projectType){
			alert("只能比较同类型["+projectTypeCn+"]的项目");
			return false;
		}
		_projectGuids.push(projectGuid);
		_projectList.push(compare_construct(projectGuid ,title ,imgurl ,price ,infoid));
		cqjy_compare.projectGuids =_projectGuids;
	}
	//更新cookie
	$.cookie('cqjy_compare', RKJSON.encode(cqjy_compare)); 
	return true;
}

/**
 * 构造比较的对象数据
 * @returns
 */
function compare_construct(projectGuid ,title ,imgurl ,price ,infoid){
	return {"projectGuid":projectGuid ,"title":title ,"imgurl":imgurl ,"price":price ,"infoid":infoid};
}

/**
 * 删除比一比
 * @param projectGuid
 * @returns
 */
function compare_remove(projectGuid){
	var cqjy_compare =$.cookie('cqjy_compare');
	var _projectType; //标的分类
	var _projectGuids;//标的GUID
	if(cqjy_compare !=null && $.trim(cqjy_compare) !=""){
		cqjy_compare =RKJSON.decode(cqjy_compare);
		_projectType =cqjy_compare.projectType;
		_projectGuids =cqjy_compare.projectGuids;
		_projectList =cqjy_compare.projectList;
		for(var i=0; i<_projectGuids.length; i++) {
		    if(_projectGuids[i] == projectGuid) {
		    	_projectGuids.splice(i, 1);
		    	_projectList.splice(i, 1);
		    	break;
		    }
		}
		cqjy_compare.projectGuids =_projectGuids;
        cqjy_compare.projectList=_projectList;
		//更新cookie
        if (cqjy_compare.projectList.length==0){
            $.cookie('cqjy_compare', "");
        }else {
            $.cookie('cqjy_compare', RKJSON.encode(cqjy_compare));
        }
	}
	return true;
}