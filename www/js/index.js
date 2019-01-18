
      //alert("버전이 다릅니다. 업데이트 후 이용해주세요.");
      return;
      
     } else {
   

  ref = cordova.InAppBrowser.open('https://console-mobile-dev.cloudbric.com?uuid='+uuid+'&token='+app_token+'&version='+app_version, '_blank', 'location=no,hardwareback=yes');
   console.log('https://console-mobile.cloudbric.com?uuid='+uuid+'&token='+app_token);
   ref.addEventListener('loadstart', inAppBrowserbLoadStart);
   ref.addEventListener('loadstop', inAppBrowserbLoadStop);
   ref.addEventListener('loaderror', inAppBrowserbLoadError);
   //ref.addEventListener("backbutton", exit_show);
   ref.addEventListener("backbutton", function () { alert("asd"); exit;})
   ref.addEventListener('exit', exit_show);

     }
    },
    error: function(data){
      var data = JSON.stringify(data);
      console.log(data);
      
    }
});
}




function onConfirm_update() {
     
          var ref = cordova.InAppBrowser.open('market://details?id=com.nhn.android.search', '_system', 'location=no');
           navigator.app.exitApp();
     
}

function reg_id_save(reg_id) {
    var reg_id=reg_id;
    var cordova=device.cordova;
    var model=device.model;
    var platform=device.platform;
    var uuid=device.uuid;
    var version=device.version;
    var manufacturer=device.manufacturer;
    var isVirtual=device.isVirtual;
    var serial=device.serial; 
       
         $.post("http://topnailart.co.kr/reg_id_save.php",
   {
    uuid:uuid,
    reg_id:reg_id,
    uuid:uuid,
    version:version,
    cordova:cordova,
    manufacturer:manufacturer,
    isVirtual:isVirtual,
    serial:serial

   },
   function(data){
    var data;
    console.log(data);
    
   //  alert("ok");
   })
       } 


function alert_msg(title,msg) {
    var title=title;
    var msg=msg;
   navigator.notification.alert(
    msg,  // message
    alertDismissed,         // callback
    title,            // title
    '확인'                  // buttonName
);
}
 

// 종류
function exit_show() {
navigator.notification.confirm("Are you sure you want to exit? ", onConfirm, "NOTICE", "YES,NO"); 
}

function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
      var ref = cordova.InAppBrowser.open('https://console-mobile.cloudbric.com', '_blank', 'location=no');
   ref .addEventListener('exit', exit_show);
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}

function inAppBrowserbLoadStart(event) {
   navigator.notification.activityStart("Please wait", "It'll only take a moment...");
}

function inAppBrowserbLoadStop(event) {
   navigator.notification.activityStop();
}

function inAppBrowserbLoadError(event) {
   navigator.notification.activityStop();
}

function inAppBrowserbClose(event) {
   navigator.notification.activityStop();
   ref.removeEventListener('loadstart', inAppBrowserbLoadStart);
   ref.removeEventListener('loadstop', inAppBrowserbLoadStop);
   ref.removeEventListener('loaderror', inAppBrowserbLoadError);
   ref.removeEventListener('exit', inAppBrowserbClose);
}
function alertDismissed() {
            // do something
        }

        function save_reg_id_bak(reg_id) {
    var reg_id=reg_id;
    var cordova=device.cordova;
    var model=device.model;
    var platform=device.platform;
    var uuid=device.uuid;
    var version=device.version;
    var manufacturer=device.manufacturer;
    var isVirtual=device.isVirtual;
    var serial=device.serial;
    var uuid_json="{\"cordova\" : \"'+cordova+'\",\"model\" : \"'+model+'\",\"platform\" : \"'+platform+'\",\"uuid\" : \"'+uuid+'\",\"version\" : \"1.0\",\"manufacturer\" : \"'+manufacturer+'\",\"isVirtual\" : \"'+isVirtual+'\",\"serial\" : \"'+serial+'\",\"registration_id\":\"'+reg_id+'\"}";
    var data_json="{ \"app_data\":"+uuid_json+"}";
  


    console.log(data_json);
    
    $.ajax({
    url: "https://api.cloudbric.com/v2/mobile/device",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("X-Cloudbric-Key", "zzg0cockog4g0sk4kgcc44ow0go40sw88wkkg8ks"); 
    },
    type: 'POST',
     dataType : "json",
  crossDomain: true,
 data: data_json,
  
    processData: false,
   contentType:'application/json; charset=utf-8',
   
     

    success: function (data) {

      var data = JSON.stringify(data);
         console.log(data);
      var member_data = JSON.parse(data);
       console.log("data : "+member_data.result_info.device_token);

    },
    error: function(data){
       var data = JSON.stringify(data);
         console.log(data);
     
    }
});
   }
   function onBackKeyDown(e) { 
    e.preventDefault(); 
} 