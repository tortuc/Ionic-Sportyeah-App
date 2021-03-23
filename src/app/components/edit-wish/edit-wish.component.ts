import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { YoutubePipe } from 'src/app/pipes/youtube.pipe';
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { WishService } from 'src/app/service/wish.service';
import * as moment from 'moment'
import { IWish } from 'src/app/models/IWish';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-wish',
  templateUrl: './edit-wish.component.html',
  styleUrls: ['./edit-wish.component.scss'],
})
export class EditWishComponent implements OnInit {

  @Input() wish:IWish

  @ViewChild('fileChooser') fileChooser:ElementRef
  @ViewChild('documentChooser') documentChooser:ElementRef
  constructor(
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController,
    private camera:Camera,
    private el:ElementRef,
    private fb:FormBuilder,
    private imageAPI:JdvimageService,
    private alertCtrl:AlertController,
    private satitizer:DomSanitizer,
    private wishService:WishService,
    private translate:TranslateService
  ) { }
  youtubePipe = new YoutubePipe(this.satitizer)

  ngOnInit(

    ) {
     
      this.setValues()
     
    }

  setValues() {
    let price = new Intl.NumberFormat('de-DE',{minimumFractionDigits:2}).format(this.wish.price)

    this.files = this.wish.files
    this.form.controls.type.setValue(this.wish.type) 
    this.form.controls.privacity.setValue(this.wish.privacity) 
    this.form.controls.title.setValue(this.wish.title) 
    this.form.controls.description.setValue(this.wish.description) 
    this.form.controls.price.setValue( price ) 
    this.form.controls.endDate.setValue(moment(this.wish.endDate).utc().format('YYYY-MM-DD')) 
    this.form.controls.location.setValue(this.wish.location) 
    this.previewUrl()
  }
  
  
    form = this.fb.group({
      type:[null,[Validators.required]],
      privacity:[null,Validators.required],
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['0,00',[Validators.min(0)]],
      endDate:[null,[Validators.required]],
      location:[null],
      files:[]
    })
  
    files = []
  
  
    newPrice(ev){
      this.form.controls.price.setValue(ev)
    }
    async openFile(){
      let action = await this.actionSheetCtrl.create({
        header:this.translate.instant('wish_files.header'),
        buttons:[
          {
            text:this.translate.instant('wish_files.image'),
            icon:'image',
            handler:()=>{
              this.photovideo()
            }
          },
          {
            text:this.translate.instant('wish_files.file'),
            icon:'document-attach',
            handler:()=>{
              this.documentChooser.nativeElement.click()
            }
          },
          {
            text:this.translate.instant('wish_files.youtube.label'),
            icon:'logo-youtube',
            handler:()=>{
              this.youtube()
            }
          },
          {
          text:this.translate.instant('close'),
          role:'close',
          icon:'close'
        }]
      })
      action.present()
    }
  
   
    photovideo() {
    
        this.camera.getPicture({
          quality:100,
          destinationType:this.camera.DestinationType.FILE_URI,
          mediaType:this.camera.MediaType.ALLMEDIA,
          encodingType:this.camera.EncodingType.JPEG
        })
          .then((data)=>{
            let base64Image = 'data:image/jpeg;base64,' + data;          
            let blob = this.DataURIToBlob(base64Image)
            let formData = new FormData()
            formData.append('image',blob)
            this.uploadImage(formData)
          })
          .catch((err)=>{
            if(err == 'cordova_not_available'){
              this.fileChooser.nativeElement.click()
            }
            
          })
      
    
    }
  
  
    uploadFile(event){
      let formData = new FormData()
      let file = event.target.files[0]
      if(file.type.split('/')[0] == 'video'){
        formData.append('video',file)
        this.uploadVideo(formData)
      }else if(file.type.split('/')[0] == 'image'){
        formData.append('image',file)
        this.uploadImage(formData)
      }else{
        // handle      
      }
    }
  
    /**
     * Sube un video al servidor
     * @param formData 
     */
  
    uploadVideo(formData: FormData) {
      this.imageAPI.uploadVideo(formData).toPromise()
        .then((url)=>{
          this.files.push({url,type:'video'})
        })
        .catch((err)=>{
          // handle
        })
    }
  
  
    /**
     * Sube una imagen al servidor y la guarda en `files`
     * @param formData 
     */
    uploadImage(formData: FormData) {
      this.imageAPI.uploadImage(formData).toPromise()
        .then((url)=>{
          this.files.push({
            url,
            type:'image'
          })
        })
        .catch((err)=>{
          // handle err
        })
    }
  
  
    /**
     * Sube un documento al servidor
     * @param event 
     */
  
    uploadDocument(event){
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file',file)
      this.imageAPI.uploadFile(formData)
        .toPromise()
        .then((obj:any)=>{
          this.files.push({
            type:'document',
            url:obj.url,
            name:obj.name
          })        
        })
        .catch((err)=>{
       
          
          // handle err
        })
    }
  
    close(){
      this.modalCtrl.dismiss()
    }
  
    minDate = moment().format('YYYY-MM-DD')
  
  
    /**
     * Convierte un base64 a un archivo blob para subirlo al servidor
     * @param dataURI 
     */
    DataURIToBlob(dataURI: string) {
      
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)
  
      return new Blob([ia], { type: mimeString })
    }
  
    /**
     * Cuando un objeto se elimina desde el preview, se actualiza los files de este componente
     * @param files 
     */
    newFiles(files){
      this.files = files
    }
  
    async create(){
      let wish      = this.form.value
      wish.files    = this.files
      wish.price    = wish.price.replace('.','').replace(',','.')

      this.wishService.edit(this.wish._id,wish).toPromise()
        .then((wish:IWish)=>{
          this.modalCtrl.dismiss({
            action:'edit',
            wish
          })
        })
        .catch((err)=>{
          // handle err
        })
      
    }
  
    async youtube(){
      let alert = await this.alertCtrl.create({
        header:this.translate.instant('wish_files.youtube.header'),
        inputs:[
          {
            type:'text',
            name:'link',
            placeholder:'www.youtube.com...'
            
          }
        ],
        buttons:[
          {
            text:this.translate.instant('cancel'),
            role:'cancel'
          },
          {
            text:this.translate.instant('agree'),
            handler:(data)=>{
              let link = this.youtubePipe.transform(data.link)
              if(link){
                this.files.push({
                  type:'youtube',
                  url:data.link
                })              
              }else{
                this.alertYoutube()
              }
                
              
            }
          }
        ]
      })
      return alert.present()
    }
  
    async alertYoutube() {
      let alert = await this.alertCtrl.create({
          header:this.translate.instant('wish_files.youtube.invalid.header'),
          message:this.translate.instant('wish_files.youtube.invalid.message'),
          buttons:[
            {
              text:this.translate.instant('agree'),
              handler:()=>{
                this.youtube()
              }
            }
          ]
      })
      return alert.present()
    }
  

    preview = null


    previewUrl(){
      try {
        let string:string = this.form.controls.location.value
        let match = string.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g)
        if(match){
          this.wishService.pageInfo(match[0])
            .toPromise()
            .then((info)=>{          
              this.preview = info
            })
            .catch(()=>{
              this.preview = null
            })
        }else{
          this.preview = null
        }
      } catch (error) {
        // handle
      }
    
    }

}
