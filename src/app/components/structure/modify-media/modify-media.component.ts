import { take } from "rxjs/operators";
import { User, UserService } from "src/app/service/user.service";
import { AlertController, ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service"
import { ReusableComponentsIonic } from "src/app/service/reusable-components-ionic.service"

/*
 * Componente para modificar los archivos multimedia.
 */
@Component({
  selector: 'app-modify-media',
  templateUrl: './modify-media.component.html',
  styleUrls: ['./modify-media.component.scss'],
})
export class ModifyMediaComponent implements OnInit {
  @Input() media: string[];
  @Input() idUser: string;
  user: User = null;
  showSlides: boolean = false;

  constructor(
    public mc: ModalController,
    public reusableCI: ReusableComponentsIonic,
    public userService: UserService,
    public alertController: AlertController,
    public reusableIMG: ImgVideoUpload
  ) {}

  ngOnInit() {
    if(this.media === null) this.media = []
    setTimeout(() => {
      this.showSlides = true;
    }, 300);
  }

  slideOpts = {
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

  //async share(img:string) {
  //  const modal = await this.mc.create({
  //    component: NewPostPage,
  //    componentProps: {
  //      img,
  //    },
  //  });
  //  await modal.present();
  //}

  async add(){
    this.reusableIMG.takeOnlyPhoto()
    this.reusableIMG.content.pipe(take(1))
      .subscribe((r:string)=>this.media.push(r))
  }
  async delete(element:string){
    const res = await this.reusableCI.desicionAlert(`¿Esta seguro de eliminar este elemento?`,``)
    if(res)
      if(this.media.length > 1){
        this.media.splice(this.media.indexOf(element),1)
        this.reusableCI.toast(`Imagen Eliminada`)
      }
      else this.reusableCI.toast(`El elemento debe tener al menos una imagen`)
  }
}
