import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import { UserService } from "../../../service/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { NewsService } from '../../../service/news.service';
import { SocketService } from 'src/app/service/socket.service';
const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent implements OnInit {
  @ViewChild("liveReactionsLike") liveReactionsLike: ElementRef;
  @ViewChild("liveReactionsLove") liveReactionsLove: ElementRef;
  @ViewChild("liveReactionsHaha") liveReactionsHaha: ElementRef;
  @ViewChild("liveReactionsWow") liveReactionsWow: ElementRef;
  @ViewChild("liveReactionsSad") liveReactionsSad: ElementRef;
  @ViewChild("liveReactionsAngry") liveReactionsAngry: ElementRef;


  @ViewChild("localPlayer") localPlayer: ElementRef;

  constructor(
    public userService: UserService,
    private route:ActivatedRoute,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public newsService:NewsService,
    public socketService:SocketService,
  ) {
    //client.setClientRole("audience")
  
    this.channel = route.snapshot.paramMap.get('id')
      this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" ,role:"audience"});
     this.subscribe()
    //this.join()
    this.newsService.findById(this.newsService.idNews).toPromise()
    .then((response:any)=>{
      this.news = response 
      this.socketService.socket.emit('in-news',{id:response.news._id})
    })
    .catch((err)=>{
      this.news = 404
    }) 
  }

  news
   isSubscribe:boolean = true
  rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };
  channel
   options = {
    // Pass your app ID here.
    appId: "73cf40b7571b42b4a6d85473006ae348",
    // Set the channel name.
    channel: "demo_channel_name",
    // Pass a token if your project enables the App Certificate.
    token: null,
    // Set the user role in the channel.
    role: "audience",

    uid:null
  };
  videoProfiles = [
    { label: "480p_1", detail: "640×480, 15fps, 500Kbps", value: "480p_1" },
    { label: "480p_2", detail: "640×480, 30fps, 1000Kbps", value: "480p_2" },
    { label: "720p_1", detail: "1280×720, 15fps, 1130Kbps", value: "720p_1" },
    { label: "720p_2", detail: "1280×720, 30fps, 2000Kbps", value: "720p_2" },
    { label: "1080p_1", detail: "1920×1080, 15fps, 2080Kbps", value: "1080p_1" },
    { label: "1080p_2", detail: "1920×1080, 30fps, 3000Kbps", value: "1080p_2" },
  ]
formateSelected

  uid
  async join(){
    this.uid = await this.rtc.client.join(this.options.appId, this.channel,  this.options.token, null);
  }

  async  leave() {//retiro del canal
    client.localTracks.forEach((v) => v.close());
    await client.leave();
  }

  /* async onAgoraUserPublished(user, mediaType) {
    const track = await client.subscribe(user, mediaType);
    track.play();
  } */




  async  subscribe(){
    this.rtc.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.isSubscribe = true
    await this.join()
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

        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
        var textnode = document.createTextNode(user.uid.toString());
        //document.getElementById("remotePlayerlist").appendChild(textnode);
       
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
    loading.dismiss();

  } 
  /* remove(){
    const playerContainer = document.getElementById("video");
    playerContainer.remove();
  } */

 async unSubscribe(){
  this.isSubscribe = false
  let loading = await this.loadingCtrl.create({
    message: this.translate.instant("loading"),
  });
  loading.present();
  this.rtc.client.on("user-unpublished", user => {
    // Get the dynamically created DIV container.
    const playerContainer = document.getElementById(user.uid);
    // Destroy the container.
    playerContainer.remove();
  });
    // Leave the channel.
    await this.rtc.client.leave();
    this.socketService.socket.emit('out-news',this.news._id)
      loading.dismiss();
  }
  async  leaveCall() {

    // Destroy the local audio and video tracks.
    if(this.rtc.localAudioTrack){
      this.rtc.localAudioTrack.close();

    }
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
  

  /* esta(type,idReaction){
    switch (type){
      case 1 : {
        const reaction = document.createElement("div");
        reaction.id = idReaction.toString()
        reaction.style.display = "flex"
        reaction.classList.add("liveReactionsLike")
        const image = document.createElement("img")
        //image.style.height = "40px"
        //image.style.width = "40px"
        //image.style.position = "absolute"
        //image.style.left = "50%" 
        image.src = "https://res.cloudinary.com/prvnbist/image/upload/v1492531171/XZOPuv9_eyqlr2.png"
        document.getElementById("reactsDiv").appendChild(reaction);
        document.getElementById(idReaction).appendChild(image);
       
        
         setTimeout(()=>{
           reaction.remove()
         },1500)

        //if (!this.liveReactionsLike.nativeElement.classList.contains("liveReactionsLike")) {
          //this.liveReactionsLike.nativeElement.style.display = "flex";
         // this.liveReactionsLike.nativeElement.classList.add("liveReactionsLike");
        //} 
        console.log(image)
        break
      }
      case 2 : {
        if (!this.liveReactionsLove.nativeElement.classList.contains("liveReactionsLove")) {
          this.liveReactionsLove.nativeElement.style.display = "flex";
          this.liveReactionsLove.nativeElement.classList.add("liveReactionsLove");
        }
        break
      }
      case 3 : {
        if (!this.liveReactionsHaha.nativeElement.classList.contains("liveReactionsHaha")) {
          this.liveReactionsHaha.nativeElement.style.display = "flex";
          this.liveReactionsHaha.nativeElement.classList.add("liveReactionsHaha");
        }
        break
      }
      case 4 : {
        if (!this.liveReactionsWow.nativeElement.classList.contains("liveReactionsWow")) {
          this.liveReactionsWow.nativeElement.style.display = "flex";
          this.liveReactionsWow.nativeElement.classList.add("liveReactionsWow");
        }
        break
      }
      case 5 : {
        if (!this.liveReactionsSad.nativeElement.classList.contains("liveReactionsSad")) {
          this.liveReactionsSad.nativeElement.style.display = "flex";
          this.liveReactionsSad.nativeElement.classList.add("liveReactionsSad");
        }
        break
      }
      case 6 : {
        if (!this.liveReactionsAngry.nativeElement.classList.contains("liveReactionsAngry")) {
          this.liveReactionsAngry.nativeElement.style.display = "flex";
          this.liveReactionsAngry.nativeElement.classList.add("liveReactionsAngry");
        }
        break
      }
      default:
        console.log("Tipo de reaccion no definido");
        break;
    }
    
  }

  esta2(type){
    switch (type){
      case 1 : {
        if (this.liveReactionsLike.nativeElement.classList.contains("showLive")) {
          this.liveReactionsLike.nativeElement.style.display = "none";
          this.liveReactionsLike.nativeElement.classList.remove("showLive");
        }
        break
      }
      case 2 : {
        if (this.liveReactionsLove.nativeElement.classList.contains("showLive")) {
          this.liveReactionsLove.nativeElement.style.display = "none";
          this.liveReactionsLove.nativeElement.classList.remove("showLive");
        }
        break
      }
      case 3 : {
        if (this.liveReactionsHaha.nativeElement.classList.contains("showLive")) {
          this.liveReactionsHaha.nativeElement.style.display = "none";
          this.liveReactionsHaha.nativeElement.classList.remove("showLive");
        }
        break
      }
      case 4 : {
        if (this.liveReactionsWow.nativeElement.classList.contains("showLive")) {
          this.liveReactionsWow.nativeElement.style.display = "none";
          this.liveReactionsWow.nativeElement.classList.remove("showLive");
        }
        break
      }
      case 5 : {
        if (this.liveReactionsSad.nativeElement.classList.contains("showLive")) {
          this.liveReactionsSad.nativeElement.style.display = "none";
          this.liveReactionsSad.nativeElement.classList.remove("showLive");
        }
        break
      }
      case 6 : {
        if (this.liveReactionsAngry.nativeElement.classList.contains("showLive")) {
          this.liveReactionsAngry.nativeElement.style.display = "none";
          this.liveReactionsAngry.nativeElement.classList.remove("showLive");
        }
        break
      }
      default:
        console.log("Tipo de reaccion no definido");
        break;
    }
  } */
  ngOnInit() {
    this.socketService.socket.on('new-reaction',(like)=>{
      /* this.esta(like.like.type,like.like._id) */
      console.log(like)
    })
  }
 


}
