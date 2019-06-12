App({
    options: {
        debug: true
    },
    /**
     * 当wap2app初始化完时 会触发 onLaunch
     */
    onLaunch: function() {

        setTimeout(function(){
            plus.screen.unlockOrientation();
        },600)
        setInterval(function(){
        	 plus.screen.unlockOrientation();
        },1000)
        //检查更新
            if(sessionStorage.getItem('upgrade') !='1'){
                plus.runtime.getProperty(plus.runtime.appid,function(inf){ 
                    gatdata(inf.version); 
                    sessionStorage.setItem('upgrade','1');
                });
            }  	
    	
       	var _config = {url : 'http://www.xxx.com/'}
var checkUrl= _config.url + "upload/upgrade.php";

//需要传递当前的版本
function gatdata(wgtVer){
  
    var xhr = new XMLHttpRequest();
   
    xhr.open('post',checkUrl);
   
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    
    xhr.onload = function(){
      console.log(xhr.responseText);
      var res=JSON.parse(xhr.responseText)

      if(res.code==1){
      	downWgt(_config.url + res.url); //下载更新版的地址
      }
    }
   
    xhr.send('ver='+wgtVer);
  }

// 下载wgt文件

function downWgt(wgtUrl){
    plus.nativeUI.showWaiting("下载更新文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            installWgt(d.filename); // 安装wgt包
        } else {
            plus.nativeUI.alert("下载更新失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}
// 更新应用资源  
function installWgt(path){
    plus.nativeUI.showWaiting("安装更新文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();        
        plus.nativeUI.toast('已自动完成更新，重启中~');
        setTimeout(function(){
            plus.runtime.restart(); 
        },500)
    },function(e){
        plus.nativeUI.closeWaiting();        
        plus.nativeUI.alert("安装更新文件失败["+e.code+"]："+e.message);
    });
}  
        console.log('launch');
    },
    /**
     * 当wap2app启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function() {

        console.log('show');
        
    },
    /**
     * 当wap2app从前台进入后台，会触发 onHide
     */
    onHide: function() {
        console.log('hide');
    }
});
Page('__W2A__m.mg4372.com', { //首页扩展配置
    onShow: function() {

    },
    onClose: function() {

    }
});