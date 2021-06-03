import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { EventService } from 'src/app/service/event.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-stream-client',
  templateUrl: './stream-client.component.html',
  styleUrls: ['./stream-client.component.scss'],
})
export class StreamClientComponent implements OnInit {

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
    this.startClientCall()
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

  async startClientCall() {
    //Create Client
    await  this.createClient()
    //Join a channel
    await  this.joinAChanel()
    //
    await this.subcribeToRemoteUser()
  }

  async createClient(){
    this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role:"audience" });
  }

  async joinAChanel(){
    this.options.uid = await this.rtc.client.join(this.options.appId, this.options.channel, this.options.token, this.userService.User._id);
  }
  idVideo;
  unpublished:boolean = false;

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
        playerContainer.id = user.uid;
        playerContainer.style.width = "100%";
        playerContainer.style.height = "100%";
        playerContainer.style.marginLeft = "auto"
        playerContainer.style.marginRight = "auto"
        document.getElementById("localPlayer").appendChild(playerContainer);
        this.idVideo = 'video_'+user.videoTrack._ID
        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
        this.unpublished = true
        setTimeout(() => {
          const video = document.getElementById('video_'+user.videoTrack._ID)
          video.style.position = null;
          video.style.transform = null
          video.setAttribute("controls","controls")
          video.setAttribute("preload","metadata")
          video.setAttribute("webkit-playsinline","webkit-playsinline")
         }, 1000);
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
}
