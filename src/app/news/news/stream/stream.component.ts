import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import { UserService } from "../../../service/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { NewsService } from '../../../service/news.service';
import { SocketService } from 'src/app/service/socket.service';
import { Hash } from 'crypto';
import { keyframes } from '@angular/animations';
import { Console } from 'console';
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
      try {
             this.subscribe()
      } catch (error) {
        console.log('no logre hacerlo')
      }
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
/*   videoProfiles = [
    { label: "480p_1", detail: "640×480, 15fps, 500Kbps", value: "480p_1" },
    { label: "480p_2", detail: "640×480, 30fps, 1000Kbps", value: "480p_2" },
    { label: "720p_1", detail: "1280×720, 15fps, 1130Kbps", value: "720p_1" },
    { label: "720p_2", detail: "1280×720, 30fps, 2000Kbps", value: "720p_2" },
    { label: "1080p_1", detail: "1920×1080, 15fps, 2080Kbps", value: "1080p_1" },
    { label: "1080p_2", detail: "1920×1080, 30fps, 3000Kbps", value: "1080p_2" },
  ]
formateSelected */

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
      if (mediaType === "video" ) {
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
  idVideo;
  /* remove(){
    const playerContainer = document.getElementById("video");
    playerContainer.remove();
  } */

 async unSubscribe(){
  this.socketService.socket.emit('out-news',{id:this.news.news._id})
  this.isSubscribe = false
  let loading = await this.loadingCtrl.create({
    message: this.translate.instant("loading"),
  });
  loading.present();
 
    // Leave the channel.
    await this.rtc.client.leave();
   
      loading.dismiss();
  }
 /*  async  leaveCall() {

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
  */
createReaction(idReaction,link){
  //ESTAS REACCIONES TIENEN QUE QUEDAR EN EL DIV DEL VIDEO PORQUE NO ESTAN FIJANDOSE AL VIDEO SI NO AL DIV
  //COLOCA LAS REACCIONES DENTRO DEL DIV
  const reaction = document.createElement("div");
  const image = document.createElement("img")
  image.src = link
  reaction.id = idReaction.toString()
  reaction.style.height = "40px"
  reaction.style.width = "40px"
  reaction.style.position = "absolute"
  reaction.style.left = "50%" 
  reaction.style.marginLeft = "auto" 
  reaction.style.marginRight = "auto"
  reaction.style.zIndex = "1000"
  reaction.animate([
     {
      bottom:'0px',
      left:(Math.floor(Math.random() * 30) + 37).toString()+'%',
      opacity:'0.8'
    },
    {
      opacity:'0.4'
    },
    {
      bottom:'300px',
      left:(Math.floor(Math.random() * 30) + 37).toString()+'%',
      opacity:'0'
    }
  ],{
    duration:3000
  })

  document.getElementById("localPlayer").appendChild(reaction);
  document.getElementById(idReaction).appendChild(image);
  setTimeout(()=>{ 
  reaction.remove()
 },2300)
}
   esta(type,idReaction){
    switch (type){
      case 1 : {
        this.createReaction(idReaction,"https://res.cloudinary.com/prvnbist/image/upload/v1492531171/XZOPuv9_eyqlr2.png")
        break
      }
      case 2 : {
        this.createReaction(idReaction,"https://res.cloudinary.com/prvnbist/image/upload/v1492531172/uIjLl6R_cmbnqb.png")
        break
      }
      case 3 : {
        this.createReaction(idReaction,"https://res.cloudinary.com/prvnbist/image/upload/v1492531177/lsHmtDy_ycqnbp.png")
        break
      }
      case 4 : {
        this.createReaction(idReaction,"https://res.cloudinary.com/prvnbist/image/upload/v1492531177/s475u9d_o8trbg.png")
        break
      }
      case 5 : {
        this.createReaction(idReaction,"https://res.cloudinary.com/prvnbist/image/upload/v1492531172/JJuD9qb_a7gkmu.png")
        break
      }
      case 6 : {
        this.createReaction(idReaction,"https://res.cloudinary.com/prvnbist/image/upload/v1492531178/VDM3zOV_qy9fqj.png")
        break
      }
      default:
        console.log("Tipo de reaccion no definido");
        break;
    }
    
  }

  

  commnets= [];
  unpublished:boolean = false;
  ngOnInit() {
    this.socketService.socket.on('new-reaction',(like)=>{
      this.esta(like.like.type,like.like._id)
    })
    this.socketService.socket.on('new-comment',(comment)=>{
      this.commnets = comment.comment
    })
    this.rtc.client.on("user-unpublished", user => {
      // Get the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      // Destroy the container.
      playerContainer.remove();
      this.unpublished = false;
    });
  }
  comments($event){
    this.news.comments = $event
  }


}
