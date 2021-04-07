import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost,INew } from 'src/app/models/iPost';
import { UserService } from 'src/app/service/user.service';
import { NewsService } from 'src/app/service/news.service';
import { response } from 'express';
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import { element } from 'protractor';
@Component({
  selector: 'post-shared',
  templateUrl: './post-shared.component.html',
  styleUrls: ['./post-shared.component.scss'],
})
export class PostSharedComponent implements OnInit {
  @Input() post:IPost
  @Input() news: INew
  @Input() newsShared: INew
  constructor(
    public userService:UserService,
    private router:Router,
    public newsService:NewsService,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,

  ) {
  
   }

  @Input() disabled:boolean = false
 

  // scrollEvent = (event: any): void => {
  //   const n = event.srcElement.scrollingElement.scrollTop;
  // }

  ngOnInit(){
    // window.scroll()
    if(this.news){
      this.userService.getUserById(this.news.user).subscribe((response:any)=>{
        delete(response.password)
        delete(response.email)
        this.news.user = response
      })

    // window.addEventListener('scroll', this.scrollEvent, true);
    }
   

  }

  
newsStream
quit
public pauseVideo: boolean = false;

  initOneVideo() {
    this.newsStream = 
      document.getElementById(
        'localPlayer'
      )
     this.quit = true;
 /*    this.src = <HTMLSourceElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id
      )
    ); */
    /* this.video.load();
    this.video.pause();
  
    this.oneVideo = true; */
    // this.isScrolledIntoView();
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
    channel: "demo_channel_name",
    // Pass a token if your project enables the App Certificate.
    token: null,
    // Set the user role in the channel.
    role: "audience",

    uid:null
  };
  channel
  isSubscribe:boolean = true
goToStream(){
  this.newsService.idNews = this.news._id
  this.router.navigate([`/news/streamNews/${this.news.postStream}`])
}

  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      this.router.navigate([`/user/${username}`])
  
    }
  }

  goToPost(id){
    this.router.navigate([`/post/${id}`])
  }
  
  OpenNews(){
    this.router.navigate([`news/read/${this.news._id}`])
  }
  uid
  async join(){
    this.uid = await this.rtc.client.join(this.options.appId, this.channel,  this.options.token, null);
  }
  async  subscribe(){
    this.rtc.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
    
    this.isSubscribe = true
    await this.join()
    this.rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await this.rtc.client.subscribe(user, mediaType);
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
   

  } 
  async unSubscribe(){
   
    this.isSubscribe = false
 
   
      // Leave the channel.
      await this.rtc.client.leave();
     

    }
  idVideo;


}
