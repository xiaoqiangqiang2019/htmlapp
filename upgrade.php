<?php

 $appinfo = array(
    'appid'=> 'HBuilder',
    'version' => '1.0',
    'fileurl'=>'upgrade/1_0.wgt' //这个是相对服务器端网址url 下的根目录，升级包文件
 );
 //以上是每次制作好升级包都需要修改一下 version 这个值。值要和你在hbuilder里的app版本号一致。

 if(isset($_POST['ver']) && ($_POST['ver'] < $appinfo['version'])){   
    $ret = array('code'=>1, 'url'=> $appinfo['fileurl']); 
 }else{
    $ret = array('code'=>0, 'url'=>''); 
 }
 echo json_encode($ret);
 exit;
 
 ?>