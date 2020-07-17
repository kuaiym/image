function load_jjdt(requestFrom) {
	var url='index_jjdt_more_data';
	if (requestFrom === 'jjdt-list'){
		url='jjdt_more_data'
	}
	$.ajax({
		url:url,
		type:'post',
		data:"page=1&rows=8",
		dataType :'json',
		success:function(datas){
			var data =datas.jjdt_more;
			var pageObj =datas.pageObj;
			current_page =pageObj.currentPage;
			var totalPage =1;
			var pageSize =8;
			var count =pageObj.total;
			if(data==null || data.length ==0){
				//没有符合的数据
				// $("#newHallList").html("<tr class='bd-green'><td colspan='5'></td></tr>");
				$("#newHallList").html("");
				return;
			}
			if (count < pageSize || pageSize ==0) {
				totalPage =1; 
			}else{
				totalPage =count % pageSize == 0 ? Math.floor(count / pageSize) : Math.floor(count / pageSize) + 1;
			}
			//更新数据
			var html = "";
			for(var i=0;i<data.length;i++){
                var subject =data[i];
                var format ="yyyy-MM-dd HH:mm:ss";
                var price =subject.price +" 元";//标的底价
                var biaodino =subject.biaodino;
                var project_url =subject.project_url;
                var projectcontroltype =subject.projectcontroltype ==null 
   						? -1 
						:($.trim(subject.projectcontroltype) =="" 
								? -1
							 	:$.trim(subject.projectcontroltype));
                var object =subject.object;//项目名称
				var hasbid =subject.hasbid =="1";
                if(object !=null && object.length >35){
                	object =object.substring(0,35)+"...";
                }
                //需要动态刷新的值
                var startMs =subject.start;
                
                var obj_start;//开始时间
                var obj_endTime;//剩余时间
                var obj_bmbtn;//操作按钮
                var maxprice;//当前价格
                
                var status = subject.status;//0 竞价中  1 未开始  2 已结束
              	
                //刷新最高价
                maxprice =subject.maxprice +" 元";
                //刷新开始时间：已开始直接显示开始时间；未开始显示多久开始
                var cur = subject.current;//当前时间
                if(cur > startMs){
                	obj_start =new Date(startMs).format(format);
                }else{
                	obj_start =DateOp.formatMsToStr(startMs - cur);
                }
                                
                //刷新操作按钮：
                var show_span1 =false;//是否显示span1
                switch(projectcontroltype){
                	case "2":
                		show_span1 =true;
                		obj_bmbtn ="中止";
               		break;
                	case "1":
                		show_span1 =true;
                		obj_bmbtn ="终结";
            		break;
                	default:                		
                		obj_bmbtn = subject.statusCN;                    	
                    	if(obj_bmbtn==="报价中" || obj_bmbtn==="延时竞价"){
                            obj_bmbtn="报价中";
                    		obj_endTime = (DateOp.formatMsToStr(subject.last_times));//剩余时间
                		} else if(obj_bmbtn===""){
                			obj_endTime = ("0秒");
                		} else if(obj_bmbtn==="未开始"){                			
                			obj_endTime = (obj_start);
                		} else {
                			obj_endTime = (obj_bmbtn);
                		}                		
               		break;
                }
				
				//组装html
				html +="<tr class='bd-green'>";
				html +="<td style='text-align:left;font-size:14px; padding: 5px 10px;'>" + "<input type='hidden' name='biaoDiNOs' value='"+biaodino+"' />"
						+"<a class='bdh-btn' target='_blank' href='"+subject.project_url+"' "
						+"style='color: #333'>"+object+"</a>"
					+"</td>"
					+"<td id='endTime_"+biaodino+"'>"
						+obj_endTime
					+"</td>"
					+"<td>"
						+price
					+"</td>";					
				if(hasbid){
				    html += "<td title='"+maxprice+"' id='maxPrice_"+biaodino+"'><font color='red'>"+maxprice+"</font></td>";
				}else{
					html += "<td title='"+maxprice+"' id='maxPrice_"+biaodino+"'>- 元</td>";
				}
					
				if("报价中"===obj_bmbtn || "延时竞价"===obj_bmbtn){
					html+= "<td title='"+biaodino+"' id='bmbtn_readonly_"+biaodino+"'>"
					    +"<font id='bmbtn_span_"+biaodino+"' class='button'>"
						+"<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-bidding'>"+obj_bmbtn+"</a>"
						+"</font></td>";
				}else if(obj_bmbtn==="报名中"){
					html+= "<td title='"+biaodino+"' id='bmbtn_readonly_"+biaodino+"'>"
				        +"<font id='bmbtn_span_"+biaodino+"' class='button'>"
					    +"<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-enroll'>"+obj_bmbtn+"</a>"
					    +"</font></td>";
                }else if(obj_bmbtn==="未开始"){
                    html+= "<td title='"+biaodino+"' id='bmbtn_readonly_"+biaodino+"'>"
                        +"<font id='bmbtn_span_"+biaodino+"' class='button'>"
                        +"<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-update'>"+obj_bmbtn+"</a>"
                        +"</font></td>";
                }else{
					html+= "<td title='"+biaodino+"' id='bmbtn_readonly_"+biaodino+"'>"
			        +"<font id='bmbtn_span_"+biaodino+"' class='button'>"
				    +"<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-default'>"+obj_bmbtn+"</a>"
				    +"</font></td>";
			    }
					
				html +="</tr>"
			}
			
			if(html!=""){
				$("#newHallList").html(html);
			}			
			//竞价大厅刷新，定时刷新已经在请求成功后1s刷新
			refresh();
		}
	})
}

//刷新
function refresh(){
    var biaoDiNOs="";
    $("input[name=biaoDiNOs]").each(function(i,k){
        var projectcontroltype = $(this).next().val();
        if(projectcontroltype != 1&&projectcontroltype != 2){
            if(biaoDiNOs===""){
                biaoDiNOs += $(this).val();
            }else{
                biaoDiNOs +="," +$(this).val();
            }
        }
    });

    if(biaoDiNOs===""){
    	return;
    }

    $.ajax({
        type: "POST",
        url: "refresh",
        dataType: "json", //json数据方式
        data: {"biaoDiNOs" : biaoDiNOs}, //json参数
        success: function (json) {
            if(json !=null){
                for(var i =0;i <json.length;i++){
                    var obj =json[i];
                    var format ="yyyy-MM-dd HH:mm:ss";
                    var biaodino =obj.biaodino;//标的编号
                    var projectcontroltype =obj.projectcontroltype;//项目控制状态
                    var hasbid =obj.hasbid;
                    var maxprice =obj.maxprice;//最高价：没有报过价，显示标的低价
                    var status = obj.status;//竞价中、延时竞价  0 、  竞价暂停  1、未开始   2 、  为已结束 3
                    
                    var startMs =obj.start;//竞价开始时间
                    var obj_start = "";                                        
                    var $obj_maxPrice =$("#maxPrice_" +obj.biaodino);                    
                    var $obj_endTime =$("#endTime_" +obj.biaodino);//剩余时间                    
                    var obj_bmbtn = "";                                                          
                    //刷新开始时间：已开始直接显示开始时间；未开始显示多久开始
                    var cur = obj.current;//当前时间
                    if(cur > startMs){
                    	obj_start =new Date(startMs).format(format);
                    }else{
                    	obj_start =DateOp.formatMsToStr(startMs - cur);
                    }
               
                    obj_bmbtn = obj.statusCN;//按钮名                    
                    //刷新操作按钮：
                    switch(projectcontroltype){
                    	case "2":
                    		obj_bmbtn ="中止";
                    		$obj_endTime.html("项目已中止");//剩余时间                    		
                   		break;
                    	case "1":
                    		obj_bmbtn ="终结";
                    		$obj_endTime.html("项目已终结");//剩余时间
                		break;
                    	default:
                    		//未开始    竞价中 延时报价   竞价暂停  已结束                    	
                    		if(obj_bmbtn==="报价中" || obj_bmbtn==="延时竞价"){
                    			$obj_endTime.html(DateOp.formatMsToStr(obj.last_times));//剩余时间
                    		} else if(obj_bmbtn==="已结束" || obj_bmbtn===""){
                    			$obj_endTime.html("0秒");
                    		} else if(obj_bmbtn==="未开始"){
                    			$obj_endTime.html(obj_start);
                    		} else {
                    			$obj_endTime.html(obj_bmbtn);
	                		}	                   		
                    }
                    
                    //刷新最高价
                    if(hasbid){
                    	$obj_maxPrice.html("<font color='red'>"+maxprice +" 元</font>");
                    }else{
                    	$obj_maxPrice.html("- 元");
                    }
                    
                    var html = "";          
                    if("报价中"===obj_bmbtn || "延时竞价"===obj_bmbtn){
                    	html += "<font id='bmbtn_span_"+biaodino+"' class='button'>";
						// html += "<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-bidding'>"+obj_bmbtn+"</a></font>";
						html += "<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-bidding'>报价中</a></font>";
					}else if(obj_bmbtn==="报名中"){
						html += "<font id='bmbtn_span_"+biaodino+"' class='button'>";
						html += "<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-enroll'>"+obj_bmbtn+"</a></font>";
				    }else if (obj_bmbtn ==="未开始"){
                        html += "<font id='bmbtn_span_"+biaodino+"' class='button'>";
                        html += "<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-update'>"+obj_bmbtn+"</a></font>";
					} else{
				    	html += "<font id='bmbtn_span_"+biaodino+"' class='button'>";
						html += "<a id='"+biaodino+"' class='ejy_huiyuan_bm state-btn btn-default'>"+obj_bmbtn+"</a></font>";
					}                    
                    $("#bmbtn_readonly_" +biaodino).html(html);
                }
            }
            window.setTimeout(function(){
            	refresh()
            }, 1000);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            //异步错误，Http错误状态码
        	window.setTimeout(function(){
        		refresh()
        	}, 1000);
        }
    });
    
}
