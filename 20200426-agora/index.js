window.onkeypress = function() {
	document.body.requestFullscreen();
}

var allId = [];
// rtc object

var rtc = {
	client: null,
	joined: false,
	published: false,
	localStream: null,
	remoteStreams: [],
	params: {}
};

// Options for joining a channel
var option = {
	appID: "161fc4cdb4c94701970f3793d906c8ea",
	channel: "1",
	uid: null,
	token: "006161fc4cdb4c94701970f3793d906c8eaIAByZBuuiqUPJVz7zGsWar+AlxdPzBITzJbb4G9mgLfQr7fv3IMAAAAAEAC6jTl79XavXgEAAQD7dq9e"
}
rtc.client = AgoraRTC.createClient({
	mode: "rtc",
	codec: "h264"
});

rtc.client.init(option.appID, function() {
	console.log("init success");

	rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? +option.uid : null, function(uid) {
		console.log("join channel: " + option.channel + " success, uid: " + uid);
		rtc.params.uid = uid;

		// Create a local stream
		rtc.localStream = AgoraRTC.createStream({
			streamID: rtc.params.uid,
			audio: true,
			video: true,
			screen: false,
		})

		// Initialize the local stream
		rtc.localStream.init(function() {
			console.log("init local stream success");
			// play stream with html element id "local_stream"
			rtc.localStream.play("local_stream");

			// Publish the local stream
			rtc.client.publish(rtc.localStream, function(err) {
				console.log("publish failed");
				console.error(err);
			})

		}, function(err) {
			console.error("init local stream failed ", err);
		});


	}, function(err) {
		console.error("client join failed", err)
	})

}, (err) => {
	console.error(err);
});

rtc.client.on("stream-added", function(evt) {
	var remoteStream = evt.stream;
	var id = remoteStream.getId();
	if (id !== rtc.params.uid) {
		rtc.client.subscribe(remoteStream, function(err) {
			console.log("stream subscribe failed", err);
		})
	}
	console.log('stream-added remote-uid: ', id);
	var div1 = document.createElement('div')
	div1.innerHTML = '<div class=\'remoteVideoWrapper\' id=remoteVideoWrapper'+id+'><div class=\'remoteVideo\' id=remote_video_' + id + '></div><div class=\'remoteVideoBottom\'><div class=\'mute\' id=mute'+id+'>静音</div><div class=\'close\' id=close'+id+'>关闭</div></div></div>';
	document.getElementById('remoteVideoContainer').appendChild(div1)
	

	
	
	rtc.client.on("stream-subscribed", function(evt) {
		var remoteStream = evt.stream;
		var id = remoteStream.getId();
		allId.push(id);

		//<div id=\'remote_video_\'+${id}>123</div>	
		//var div1=document.createElement('div')

		//div1.innerHTML='<div class=\'remoteVideo\' style=\'width:100px;height:100px;\' id=remote_video_'+id+'></div>';
		//div1.innerHTML=  '<video id=\'video'+id+'\''+'style=\'width: 100%; height: 100%; position: absolute; object-fit: cover;\' autoplay playsinline></video><audio id=\'audio'+id+'\' autoplay playsinline></audio>';
		//document.body.appendChild(div1)
		// Add a view for the remote stream.
		//addView(id);
		// Play the remote stream.
		remoteStream.play("remote_video_" + id);
		
		document.getElementById('mute'+id).onclick=function(e){
		    
			//document.getElementById('video'+id).setAttribute('controls','')
			document.getElementById('video'+id).setAttribute('muted','')
			document.getElementById('audio'+id).setAttribute('muted','')
			
			
		}
		
		console.log('stream-subscribed remote-uid: ', id);
	})
});

rtc.client.on("peer-leave", function(evt) {
    var uid = evt.uid;
    var reason = evt.reason;
	domId=`remoteVideoWrapper${uid}`;
	document.getElementById(domId).remove()
	console.log(domId)
    console.log("remote user left ", uid, "reason: ", reason);
    //……
});



