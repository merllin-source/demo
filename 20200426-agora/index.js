
			var allId=[];
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
				appID: "aa4a3511f87e4841bf87a3efd6af8f28",
				channel: "1",
				uid: null,
				token: "006aa4a3511f87e4841bf87a3efd6af8f28IADBK5ju15mvZkPNUH19joeCtSigPtciW4Izq8BScBpCI7fv3IMAAAAAEADA5jE9elymXgEAAQCCXKZe"
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
				var div1=document.createElement('div')
				div1.innerHTML='<div class=\'remoteVideo\' style=\'width:100px;height:100px;\' id=remote_video_'+id+'></div>';
				 document.getElementById('remoteVideoContainer').appendChild(div1)
				
				rtc.client.on("stream-subscribed", function (evt) {
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
				  remoteStream.play("remote_video_"+id);
				  console.log('stream-subscribed remote-uid: ', id);
				})
			});
			
			
			
			