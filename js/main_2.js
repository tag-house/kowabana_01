// This is a JavaScript file
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	alert("bindEvents!!!Success!!!");
        if(typeof device === 'undefined'){
            document.addEventListener("deviceready", this.onDeviceReady, false);
        }else{
            this.onDeviceReady();
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	alert("onDeviceReady!!!Success!!!");
                
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
            app.noConnection();
        }else {
            // 接続できた場合
            //document.body.onload=locationhttp;
            navigator.notification.alert('コネクションタイプ' + "\n" + states[networkState], null, "ネットワーク接続成功");
            app.successConnection();
        }
    },
    noConnection: function(){
        
        app.jsonGet();
        
    },
    successConnection: function(){
        
        var fileTransfer = new FileTransfer();
        var serverUrl = encodeURI("http://tag-house.net/app-json/kowabana.json");
        var fileUrl = "cdvfile://localhost/persistent/path/to/downloads/";
        
        fileTransfer.download(
            serverUrl,
            fileUrl,
            function(entry) {
                console.log("download 成功: " + entry.fullPath);
                app.jsonGet();
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            },
            false
        );
    },
    jsonGet: function(){
        //ロリポップのサーバーにあるJsonを取得し怖い話のタイトルを表示
        jQuery.getJSON("cdvfile://localhost/persistent/path/to/downloads/",function(json){ //←path/to/downloads/ 以下に kowabana.jsonなどのファイル名を書くとエラーになる
            
            data = json; //グローバル変数にjsonオブジェクトを代入（varをつけないとグローバル変数になる）
            
            $.each(data.contents,function(index,element){
                jQuery("#title-list")
                .append(jQuery('<li><a href="#" onclick="app.showStory(' + index + ')">' + element.title + '</a></li>'))
                .listview() //←引数無のlistviewメソッドをここで入れないとエラーになる（参考URL：http://goo.gl/pzb2jc）
                .listview('refresh');
            });
            
        });
    },
    showStory: function(storyNum){
        
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
};