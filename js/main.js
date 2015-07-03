            function onLoad(){
                document.addEventListener("deviceready",onDeviceReady, false);
            }
    
            function onDeviceReady() {
                
                alert("onDeviceReady");
                
                //インターネットにつながるかどうか確認する
                var networkState = navigator.connection.type;
    
                var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.CELL]     = 'Cell generic connection';
                states[Connection.NONE]     = 'No network connection';
    
    
                if(states[networkState] == 'No network connection') {
                    // 接続できない場合
                    navigator.notification.alert('コネクションタイプ' + "\n" + states[networkState], null, "ネットワーク接続不良");
                    noConnection();
                }else {
                    // 接続できた場合
                    //document.body.onload=locationhttp;
                    navigator.notification.alert('コネクションタイプ' + "\n" + states[networkState], null, "ネットワーク接続成功");
                    successConnection();
                }
            }
            
            function noConnection(){
                
                /*jQuery.getJSON("cdvfile://localhost/persistent/path/to/downloads/",function(json){
                    
                    data = json; //グローバル変数にjsonオブジェクトを代入（varをつけないとグローバル変数になる）
                    var len = Object.keys(data.contents).length;
                    
                    for(var i = 0; i < len; i++){
                        
                        console.log(i);
                                            
                        jQuery("#title-list").attr("data-role","listview")
                        .append(jQuery('<li style="color:red"><a href="#" onclick="showStory('+ i + ')">' + ldata.contents[i].title + '</a></li>'))
                        .listview() //←引数無のlistviewメソッドをここで入れないとエラーになる（参考URL：http://goo.gl/pzb2jc）
                        .listview('refresh');
                    }
                    
                });*/
                
                jsonGet();
                
            }
            
            function successConnection(){
            	
            	console.log("いねこ");
                
                var fileTransfer = new FileTransfer();
                var serverUrl = encodeURI("http://tag-house.net/app-json/kowabana.json");
                var fileUrl = "cdvfile://localhost/persistent/path/to/downloads/";
                
                fileTransfer.download(
                    serverUrl,
                    fileUrl,
                    function(entry) {
                        console.log("download 成功: " + entry.fullPath);
                        jsonGet();
                    },
                    function(error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                    },
                    false
                );
                
            }
                
            function jsonGet(){
                
                //ロリポップのサーバーにあるJsonを取得し怖い話のタイトルを表示
                jQuery.getJSON("cdvfile://localhost/persistent/path/to/downloads/",function(json){ //←path/to/downloads/ 以下に kowabana.jsonなどのファイル名を書くとエラーになる
                    
                    data = json; //グローバル変数にjsonオブジェクトを代入（varをつけないとグローバル変数になる）
                    var len = Object.keys(data.contents).length;
                    
                    for(var i = 0; i < len; i++){
                        
                        console.log("リスト作成ループ");         
                        
                        jQuery("#title-list").attr("data-role","listview")
                        .append(jQuery('<li><a href="#" onclick="showStory(' + i + ')">' + data.contents[i].title + '</a></li>'))
                        .listview() //←引数無のlistviewメソッドをここで入れないとエラーになる（参考URL：http://goo.gl/pzb2jc）
                        .listview('refresh');
                    
                    }
                    
                });
                
            }                     
            
            function showStory(storyNum) {
                
                storyId = storyNum; //グローバル変数にストーリー番号を入れる
                
                var alreadyKey = window.localStorage;
                
                if(alreadyKey.getItem("already" + storyId) == storyId){
                    jQuery("#title-list > li").css("background-color","blue");
                }else{
                    alreadyKey.setItem("already" + storyId, storyId);
                }
                    
                jQuery("#title").text(data.contents[storyId].title);
                jQuery("#story-area").text(data.contents[storyId].story);
                jQuery.mobile.changePage('#story-page');
                
            }
            
            function favoriteStory(id) {
                localStorage.setItem('id' + id,id);
            }
            
            function favoriteStoryDisplay(){
                
                for(var i = 0; i < localStorage.length; i++){
                    
                    jQuery("#favorite-list").attr("data-role","listview")
                    .append(jQuery('<li><a href="#" onclick="showStory(' + i + ')">' + data.contents[i].title + '</a></li>'))
                    .listview() //←引数無のlistviewメソッドをここで入れないとエラーになる（参考URL：http://goo.gl/pzb2jc）
                    .listview('refresh');
                }
            }