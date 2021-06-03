import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { EventService } from 'src/app/service/event.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-stream-host',
  templateUrl: './stream-host.component.html',
  styleUrls: ['./stream-host.component.scss'],
})
export class StreamHostComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    public userService:UserService,
    public eventService:EventService
  ) {
    this.idEvent = route.snapshot.paramMap.get('id')
    //Set chanel 
    this.options.channel = route.snapshot.paramMap.get('id')

    this.eventService.findOne(route.snapshot.paramMap.get('id')).subscribe((response)=>{
      this.event = response
    })
  } 
  
  idEvent:string;
  event
   
  ngOnInit() {
    this.startBasicCall();
  } 
   rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };
  
   options = {
    // Pass your app ID here.
    appId: "73cf40b7571b42b4a6d85473006ae348",
    // Set the channel name.
    channel: "",
    // Pass a token if your project enables the App Certificate.
    token: null,
    //id user
    uid:""
  };
  
  
  async  startBasicCall() {
    //Create Client
    await  this.createClient()
    //Join a channel
    await  this.joinAChanel()
    //Create and publish the local tracks
    await  this.createAndPublishLocalTracks()
  }

  async createClient(){
    this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role:"host" });
  }

  async joinAChanel(){
    this.options.uid = await this.rtc.client.join(this.options.appId, this.options.channel, this.options.token, this.userService.User._id);
  }

 async createAndPublishLocalTracks(){
    // Create an audio track from the audio sampled by a microphone.
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();


    const playerContainer = document.createElement("div");
    playerContainer.id = 'idVideo'
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */
    this.rtc.localVideoTrack.play(playerContainer);
    setTimeout(() => {
      const video = document.getElementById('video_'+this.rtc.localVideoTrack._ID)
      video.style.position = null;
      video.style.transform = null
      video.setAttribute("controls","controls")
      video.setAttribute("preload","metadata")
      video.setAttribute("webkit-playsinline","webkit-playsinline")
     }, 1000);


    // Publish the local audio and video tracks to the channel.
    await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
    console.log("publish success!");


   
  }

  async subcribeToRemoteUser(){
    this.rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await this.rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");
    
      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const playerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "640px";
        playerContainer.style.height = "480px";
        document.body.append(playerContainer);
    
        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
    
        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }
    
      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });

    
    
    //Unpublished
    this.rtc.client.on("user-unpublished", user => {
      // Get the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      // Destroy the container.
      playerContainer.remove();
    });
  }

  async  leaveCall() {
    // Destroy the local audio and video tracks.
    this.rtc.localAudioTrack.close();
    this.rtc.localVideoTrack.close();
  
    // Traverse all remote users.
    this.rtc.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
  
    // Leave the channel.
    await this.rtc.client.leave();
  }


}
