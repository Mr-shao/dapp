var network="https://mainnet.nebulas.io",dappContractAddress="n1mjakrpvQMRtmYfAWa7jhWo2cTwTGDGasG",nebulas=require("nebulas"),neb=new nebulas.Neb;neb.setRequest(new nebulas.HttpRequest(network));var Account=Account,NebPay=require("nebpay"),nebPay=new NebPay,value="0",nonce="0",gas_price="10000000",gas_limit="20000000",currentNum="";window.onload=function(){_warning("页面加载完成！")};var _warning=function(text){$("#warning_alert").text(text),$("#warning_alert").fadeIn(),setTimeout(function(){$("#warning_alert").fadeOut()},1500)},_trade=function(callFunc,callArgs,callback){return nebPay.call(dappContractAddress,value,callFunc,callArgs,{callback:NebPay.config.mainnetUrl,listener:function(res){callback&&callback(res)}})},_watch=function(sn){var cycle=setInterval(function(){setTimeout(function(){clearInterval(cycle)},16e3),nebPay.queryPayInfo(sn,{callback:NebPay.config.mainnetUrl}).then(function(res){JSON.parse(res).code||(_warning("成功发送标记"),clearInterval(cycle))})},2500)},_search=function(){if(currentNum=$("#search_input").val(),$("#current_num .num").text(currentNum),$("#current_num").fadeIn(),!$("#search .btn").attr("disabled")){if(20<currentNum.length||currentNum.length<3||"NaN"===Number(String(currentNum)))return void _warning("电话号格式不正确");$("#search .btn").attr("disabled","disabled"),$("#mark_list").hide(),$("#tag_list").empty(),$("#mark_info").text("此号码无人标记，点击自定义进行标记：");var contract={function:"search",args:"["+currentNum+"]"};neb.api.call(dappContractAddress,dappContractAddress,value,nonce,gas_price,gas_limit,contract).then(function(res){var result=JSON.parse(res.result);if($("#search .btn").removeAttr("disabled"),result.status)_warning(result.data);else if(null===(result=result.data))$("#mark_list").fadeIn();else{var people=0;for(var item in result){var tag='<button class="mark btn"><span class="glyphicon glyphicon-pushpin"></span><span>'+item+'</span><span class="bubble">'+result[item].length+"</span></button>";people+=result[item].length,$("#mark_info").text("共"+people+"人对此号码进行标记："),$("#tag_list").append(tag)}$("#mark_list").fadeIn(),$(".mark.btn").click(function(e){var tag=e.currentTarget.children[1].innerText,args=[currentNum,tag],sn=_trade("mark",JSON.stringify(args),function(res){_watch(sn)})})}})}};$("#search_input").keypress(function(e){"Enter"===e.key&&_search()}),$("#search").click(function(){_search()}),$("#mask").click(function(){$("#mask").fadeOut()}),$("#edit_self").click(function(){$("#mask").fadeIn()}),$("#mask .mask-block").click(function(e){e.stopPropagation()}),$("#submit_tag_btn").click(function(){var args=[currentNum,$("#tag_input").val()],sn=_trade("mark",JSON.stringify(args),function(res){$("#mask").fadeOut(),_watch(sn)})});