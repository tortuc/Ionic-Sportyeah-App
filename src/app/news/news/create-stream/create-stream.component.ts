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
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.scss'],
})
export class CreateStreamComponent implements OnInit {
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
  //client.setClientRole("audience")
  this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" ,role:"host"});
  //this.subscribe()
  //this.join()
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
  /* async onAgoraUserPublished(user, mediaType) {
    const track = await client.subscribe(user, mediaType);
    track.play();
  } */

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
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */

    this.rtc.localVideoTrack.play(playerContainer);

   // Publish the local audio and video tracks to the channel.
   await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
   console.log("publish success!");


   this.publicar()
   loading.dismiss();
  }
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
    playerContainer.style.width = "100%";
    playerContainer.style.height = "100%";
    playerContainer.style.marginLeft = "auto"
    playerContainer.style.marginRight = "auto"

    document.getElementById("localPlayer").appendChild(playerContainer);/*  */

    this.rtc.localVideoTrack.play(playerContainer);

    // Publish the local audio and video tracks to the channel.
    await this.rtc.client.publish([this.rtc.localVideoTrack]);
    console.log("publish success!");
   this.publicar()
   loading.dismiss();


  }

  async  subscribe(){console.log('Precionaste el Subcribe')
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
        console.log('me creo VIDEO VIDEO VIDEO VIDEO VIDEO  ')
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "640px";
        playerContainer.style.height = "480px";
        document.getElementById("localPlayer").appendChild(playerContainer);

        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
        var textnode = document.createTextNode(user.uid.toString());
        document.getElementById("remotePlayerlist").appendChild(textnode);
       
        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }
    
      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
        console.log('me creo AUDIO AUDIO AUDIO AUDIO AUDIO  ')

      }
    });
  } 

 async unSubscribe(){
    this.rtc.client.on("user-unpublished", user => {
      // Get the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      // Destroy the container.
      playerContainer.remove();
    });
      // Leave the channel.
      await this.rtc.client.leave();
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

    this.begingStream = false;
    this.commnets = [];
    loading.dismiss();
  }

 async deletePublicar(){
   //Elimina la noticia
   console.log('estoy deleteando NEWS')
await   this.newsService.deleteNews(this.newsId).subscribe((response)=>{
  console.log(response)
})

    //Elimina la publicacion
    console.log('estoy deleteando POST')

    this.postService.deleteOne(this.postId).subscribe((response)=>{
     console.log(response)
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
      console.log(response)
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
      console.log(comment.comment)
    })
  }
  comments($event){
    this.news.comments = $event
  }
}
