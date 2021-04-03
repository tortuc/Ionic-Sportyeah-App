import { OpenImgComponent } from "src/app/components/open-img/open-img.component";
import { Injectable } from '@angular/core';
import { 
  ToastController, 
  AlertController, 
  ModalController,
  LoadingController
} from '@ionic/angular';

/*
 * Servicio para facilitar el uso de componentes de IONIC
 * Te animo a crear el tuyo
 */

@Injectable({
  providedIn: 'root'
})
export class ReusableComponentsIonic {
  constructor(
    public       toastCtrl          : ToastController,
    public       alertCtrl          : AlertController,
    public       mc                 : ModalController,
    public       loadingCtrl            : LoadingController,
  ){}

  /*
   * Presenta una modal de carga
   * Para cerralo solo se debe colocar el id de esta forma
   * this.loading.dismiss(null,null,id)
   */
  async loading(id: string): Promise<void> {
    const loadingC = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Cargando...",
      id,
    });
    await loadingC.present();
  }

  /*
   * Funcion para generar un toast
   */
  async toast(
    message:string,
  ){
    const toast = await this.toastCtrl.create({
      message,
      cssClass:"centerToast",
      duration:2000
    })
    await toast.present()
  } 

  /*
   * Funcion para crear una modal de desicion
   */
  desicionAlert(header:string,message:string): Promise<boolean>{
    return new Promise(async(resolve,reject)=>{
      let alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          {
            text:'Cancelar',
            handler:()=>{
              resolve(false)
            }
          },

          {
            text: 'De Acuerdo',
            role: 'acept',
            handler:()=>{
              resolve(true)
            }
          },
        ],
      });

      await alert.present()
    })
  }

  /*
   * Funcion para abrir una imagen
   * No es de Ionic pero puede ser util
   */
  async openImg(img:string,idUser:string){
    const modal = await this.mc.create({
      component: OpenImgComponent,
      componentProps: {
        img,
        idUser,
        delete: false,
      },
    });
    await modal.present();
  }

  /*
   * Configuracion default del slider de ionic
   */
  public slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(
          swiper.originalParams,
          overwriteParams
        );
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex =
            -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal()
              ? $slideEl.find(".swiper-slide-shadow-left")
              : $slideEl.find(".swiper-slide-shadow-top");
            let shadowAfter = swiper.isHorizontal()
              ? $slideEl.find(".swiper-slide-shadow-right")
              : $slideEl.find(".swiper-slide-shadow-bottom");
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(
                `<div class="swiper-slide-shadow-${
                  swiper.isHorizontal() ? "left" : "top"
                }"></div>`
              );
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(
                `<div class="swiper-slide-shadow-${
                  swiper.isHorizontal() ? "right" : "bottom"
                }"></div>`
              );
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length)
              shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length)
              shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl.transform(
            `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          );
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ["webkitTransitionEnd", "transitionend"];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    },
  };

}
