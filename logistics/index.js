var network="https://mainnet.nebulas.io",dappContractAddress="n1iio6dXS3g8d3zdq6BPxfgc1ijvpJZLQ96",nebulas=require("nebulas"),neb=new nebulas.Neb;neb.setRequest(new nebulas.HttpRequest(network));var callFunction,Account=Account,NebPay=require("nebpay"),nebPay=new NebPay,value="0",nonce="0",gas_price="10000000",gas_limit="20000000",operateInfo="push";window.onload=function(){_warning("页面加载完成，请使用！")};var _search=function(){if(String($("#search_input").val()).length<5||40<String($("#search_input").val()).length)_warning("订单号为5-40位数字");else if(!$("#search .btn").attr("disabled")){$("#empty_order").hide(),$("#log_list").empty(),$("#pre_operate").hide(),$("#search .btn").attr("disabled","disabled");var contract={function:"search",args:"["+$("#search_input").val()+"]"};return neb.api.call(dappContractAddress,dappContractAddress,value,nonce,gas_price,gas_limit,contract).then(function(res){var result=JSON.parse(res.result);$("#search .btn").removeAttr("disabled"),result?result.length&&(3!==result[result.length-1].status&&$("#pre_operate").show(),result.forEach(function(item){$("#log_list").prepend(_logItem(item))})):$("#empty_order").show()})}},_preUpdate=function(statusStr){"end"===statusStr?($("#operate_btn").text("结束物流"),$("#operate_btn").addClass("btn-danger"),operateInfo="end"):("build"===statusStr?$("#operate_btn").text("新建物流"):$("#operate_btn").text("更新物流"),$("#operate_btn").removeClass("btn-danger"),operateInfo="push"),$("#order_number").val($("#search_input").val()),$("#order_number").attr("disabled","disabled"),$("#content").val(""),$("#remark").val(""),$("#mask").fadeIn()},_trade=function(callFunc,callback){var arr=[];arr.push($("#order_number").val()),arr.push($("#content").val()),arr.push($("#remark").val());var callArgs=JSON.stringify(arr);return nebPay.call(dappContractAddress,value,callFunc,callArgs,{listener:function(res){callback(res)}})},_warning=function(text){$("#warning_alert").text(text),$("#warning_alert").fadeIn(),setTimeout(function(){$("#warning_alert").fadeOut()},2e3)},_logItem=function(item){var remarkEle="",icon="glyphicon-gift text-warning";return 2===item.status?icon="glyphicon-plane text-primary":3===item.status&&(icon="glyphicon-flag text-success"),item.remark&&(remarkEle="<span>备注:"+item.remark+"</span>"),'<li><span class="glyphicon '+icon+' icon" aria-hidden="true"></span><div class="info"><h4>'+item.content+'</h4><div class="info-other"><div><span>操作人:'+item.operateAccount+"</span>"+remarkEle+'</div><div class="date-info">'+new Date(item.date).toLocaleString()+"</div></div></div></li>"};$("#search_input").keypress(function(e){"Enter"===e.key&&_search()}),$("#search").click(function(){_search()}),$("#operate_cancel").click(function(){$("#mask").fadeOut()}),$("#build").click(function(){_preUpdate("build")}),$("#pre_update").click(function(){_preUpdate("update")}),$("#pre_end").click(function(){_preUpdate("end")}),$("#operate_btn").click(function(){_trade(operateInfo,function(res){$("#mask").fadeOut(),_warning("更新成功，请稍后查询状态"),_search()})});