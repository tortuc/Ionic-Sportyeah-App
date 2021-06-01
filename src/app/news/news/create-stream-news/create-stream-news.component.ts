import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import { UserService } from "../../../service/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NewsService } from '../../../service/news.service';
import { PostService } from "src/app/service/post.service";
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { response } from 'express';
import { SocketService } from 'src/app/service/socket.service';
const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

@Component({
  selector: 'app-create-stream-news',
  templateUrl: './create-stream-news.component.html',
  styleUrls: ['./create-stream-news.component.scss'],
})
export class CreateStreamNewsComponent implements OnInit {
  @ViewChild("localPlayer") localPlayer: ElementRef;

  constructor(
    public userService: UserService,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private router:Router,
    public newsService:NewsService,
    private postService: PostService,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public socketService:SocketService,

  ) { 
  this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" ,role:"host"});
  }

  begingStream:boolean = false;
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
    this.uid = await this.rtc.client.join(this.options.appId, this.channel, this.options.token, null);
  }

  async  leave() {//retiro del canal
    client.localTracks.forEach((v) => v.close());
    await client.leave();
  }
 
createChanel(){
  this.channel = this.makeid(22)
}
 

  async  startBasicCall() {
    this.createChanel()
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.begingStream = true;
    await this.join()
    // Create an audio track from the audio sampled by a microphone.
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();//{ encoderConfig: this.formateSelected }
 
    const playerContainer = document.createElement("div");
    playerContainer.id = 'idVideo'
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */
    this.rtc.localVideoTrack.play(playerContainer);

   // Publish the local audio and video tracks to the channel.
   await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
   this.camera = true
   this.micro = true
   this.publicar()
   loading.dismiss();
   setTimeout(() => {
    const video = document.getElementById('video_'+this.rtc.localVideoTrack._ID)
    video.style.position = null;
    video.style.transform = null
    video.setAttribute("controls","controls")
    video.setAttribute("preload","metadata")
    video.setAttribute("webkit-playsinline","webkit-playsinline")
   }, 1000);
  }
  camera:boolean = false;
  screen:boolean = false;
  micro:boolean = false;
  async startScreenTransmision() {
    this.createChanel()
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.begingStream = true;   
    await this.join()
    // Create an audio track from the audio sampled by a microphone.
    this.rtc.localVideoTrack = await AgoraRTC.createScreenVideoTrack(
      {},
     "disable"
       );
    // Create a video track from the video captured by a camera.
    //this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({ encoderConfig: this.formateSelected });
    
    
    const playerContainer = document.createElement("div");
    playerContainer.id = 'idVideo';
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */

    this.rtc.localVideoTrack.play(playerContainer);

    // Publish the local audio and video tracks to the channel.
    await this.rtc.client.publish([this.rtc.localVideoTrack]);
   this.screen = true;
   this.publicar()
   loading.dismiss();
   setTimeout(() => {
    const video = document.getElementById('video_'+this.rtc.localVideoTrack._ID)
    video.style.position = null;
    video.style.transform = null
    video.setAttribute("controls","controls")
    video.setAttribute("preload","metadata")
    video.setAttribute("webkit-playsinline","webkit-playsinline")
   }, 1000);

  }
  async startScreen(){
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.rtc.localVideoTrack = await AgoraRTC.createScreenVideoTrack(
      {},
     "disable"
       );
    // Publish the local audio and video tracks to the channel.
    await this.rtc.client.publish([this.rtc.localVideoTrack]); 
    const playerContainer = document.createElement("div");
    playerContainer.id = 'idVideo';
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */

    this.rtc.localVideoTrack.play(playerContainer);
    this.screen = true;
    setTimeout(() => {
      const video = document.getElementById('video_'+this.rtc.localVideoTrack._ID)
      video.style.position = null;
      video.style.transform = null
      video.setAttribute("controls","controls")
      video.setAttribute("preload","metadata")
      video.setAttribute("webkit-playsinline","webkit-playsinline")
     }, 1000);
     loading.dismiss();
  }
  async stopScreen(){
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    await this.rtc.client.unpublish(this.rtc.localVideoTrack);
    this.rtc.localVideoTrack.close();
   // Traverse all remote users.
 
    // Destroy the dynamically created DIV container.
    const playerContainer = document.getElementById('idVideo');
    playerContainer && playerContainer.remove();
    this.screen = false;
    loading.dismiss();
  }
  async startCamera(){
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();//{ encoderConfig: this.formateSelected }
    await this.rtc.client.publish(this.rtc.localVideoTrack);
    const playerContainer = document.createElement("div");
    playerContainer.id = 'idVideo'
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */

    this.rtc.localVideoTrack.play(playerContainer);
    this.camera = true
    setTimeout(() => {
      const video = document.getElementById('video_'+this.rtc.localVideoTrack._ID)
      video.style.position = null;
      video.style.transform = null
      video.setAttribute("controls","controls")
      video.setAttribute("preload","metadata")
      video.setAttribute("webkit-playsinline","webkit-playsinline")
     }, 1000);
     loading.dismiss();
  }
  async startMicro(){
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await this.rtc.client.publish(this.rtc.localAudioTrack);
    this.micro = true
    loading.dismiss();
  }
  async stopCamera(){
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    await this.rtc.client.unpublish(this.rtc.localVideoTrack);
    this.rtc.localVideoTrack.close();
   // Traverse all remote users.
 
    // Destroy the dynamically created DIV container.
    const playerContainer = document.getElementById('idVideo');
    playerContainer && playerContainer.remove();
    this.camera = false;
    loading.dismiss();
  }
  async stopMicro(){
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    await this.rtc.client.unpublish(this.rtc.localAudioTrack);
    //this.rtc.localAudioTrack.close();
    this.micro = false;
    loading.dismiss();
  }


 
  async  leaveCall() {
    this.socketService.socket.emit('out-news',{id:this.news.news._id})
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    await this.deletePublicar()
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
    this.camera = false;
    this.screen = false;
    this.micro = false;
    this.begingStream = false;
    this.commnets = [];
    loading.dismiss();
  }

 async deletePublicar(){
   //Elimina la noticia
await   this.newsService.deleteNews(this.newsId).subscribe((response)=>{
})

    //Elimina la publicacion

    this.postService.deleteOne(this.postId).subscribe((response)=>{
    }) 
   
  }
  
  news
  newsId;
  postId;
  formNews = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    image: [""],
    video: [null],
    news: [null],
  });

  form = this.fb.group({
    user:[this.userService.User?._id,[Validators.required]],
    headline:['',[Validators.required]],
    content:['',[Validators.required]],
    principalSubtitle:['',[Validators.required]],
    principalImage:['',[Validators.required]],
    principalVideo:['',[Validators.required]],
    origin:['',[Validators.required]],
    originPrincipaMedia:['',[Validators.required]],
    sport:['',[Validators.required]],
    stream:['',[Validators.required]],
    postStream:['',[Validators.required]],
  })

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result
  }
async  publicar(){
   
  let loading = await this.loadingCtrl.create({
    message: this.translate.instant("loading"),
  });
  loading.present();
  
 /*    this.form.value.principalVideo =null;
   this.form.value.principalImage = null;
   
   this.form.value.principalSubtitle = null;
  
   this.form.value.origin = null
   this.form.value.originPrincipaMedia = null */
   this.form.value.headline = this.titulo1;
   this.form.value.content = [{
    subtitle  : null  ,
   parrafo    : 'STREAM'  ,
   position   : 0  ,
   image      : null  ,
   video      : null  ,
   originMedia : null } ]
   this.form.value.stream = true;
   this.form.value.postStream = this.channel

   this.form.value.sport = this.deporte
   this.newsService.create(this.form.value).subscribe((response:any)=>{
    this.newsService.findById(response._id).subscribe((response)=>{
      this.news = response;
    }) 
    this.newsId = response._id
    let post = this.formNews.value; 
    post.news = response
    this.socketService.socket.emit('in-news',{id:response._id})
    this.postService
    .create(post)
    .toPromise()
    .then((post:any) => {
      loading.dismiss();
      this.postId = post._id;
    })
    .catch((err) => {
      loading.dismiss();
    });  
   }) 
}




//titulo
titulo1 = null;
titlebool:boolean= false;
tituloListo(){
  this.titlebool = !this.titlebool;
  }
//Deporte
sports=['soccer', 'basketball','tennis',
'baseball','golf','running','volleyball',
'swimming','boxing','table_tennis','rugby',
'football','esport','various']
deporte;
deportebool:boolean = false;
deporteListo(){
  this.deporte = null
}
commnets = []
  ngOnInit() {
    this.socketService.socket.on('new-comment',(comment)=>{
      this.commnets = comment.comment
    })
  }
  comments($event){
    this.news.comments = $event
  }



////////////////////////////////////77/////////////////////////////////////////////7777
//////////////////////////////////////////////////////////////////7/77777777777777777


}
