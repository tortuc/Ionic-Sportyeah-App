import { UserService } from './../../../service/user.service';
import { ReusableComponentsIonic } from "src/app/service/reusable-components-ionic.service"
import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { take } from "rxjs/operators";
import { INode } from "src/app/profile/structure/structure.component"
import { ModifyMediaComponent } from "src/app/components/structure/modify-media/modify-media.component"

@Component({
  selector: "app-new-node",
  templateUrl: "./new-node.component.html",
  styleUrls: ["./new-node.component.scss"],
})
export class NewNodeComponent implements OnInit {
  /*
   * Slide Options para darle estilo al componente slide de html
   * 110 lineas
   */
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

  /*
   * La estructura completa
   */
  @Input() structure: INode;
  /*
   * El nodo/elemento actual
   */
  @Input() actualNode: INode;
  /*
   * El padre del nodo
   */
  @Input() parentNode: INode;

  /*
   * Variable para evitar el bug de slides ionic
   */
  showSlides: boolean = false;
  /*
   * Formulario
   */
  form: FormGroup = null;
  constructor(
    public reusableCI: ReusableComponentsIonic,
    private fb: FormBuilder,
    public userService: UserService,
    private viUp: ImgVideoUpload,
    public mc: ModalController
  ) {}

  ngOnInit() {
    console.log(this.actualNode)
    /*
     * Evita el bug de slides
     */
    setTimeout(() => {
      this.showSlides = true;
    }, 300);
    if(!this.actualNode)
      this.actualNode={
        id:null,
        media:null,
        title:null,
        subtitle:null,
        text:null,
        idUser:null,
        sponsors:[],
        childs:[]
      }
    this.generateForm()
  }

  /*
   * Genera el formulario
   */
  generateForm() {
    this.form = this.fb.group({
      id: [
        this.actualNode.id
        ? this.actualNode.id
        : null
      ],
      media: [
        this.actualNode.media 
           ? this.actualNode.media
           : [`./assets/images/logox.png`]
      ],
      title: [this.actualNode.title, [Validators.required]],
      subtitle: [
      this.actualNode.subtitle 
      ? this.actualNode.subtitle.split(" / ").reverse()[0]
      : null ,
        [Validators.required],
      ],
      text: [
        this.actualNode.text, 
        [Validators.required]
      ],
      idUser:[this.actualNode.idUser]
    });
  }


  /*
   * Genera un numero random
   */
  randomNumber() {
    return Math.floor(Math.random() * 1000000);
  }


  save(form: any) {
    /*
     * Buscar todos los nodos padre de dicho nodo para poder darle 
     * el subtitulo
     * adecuado...
     */
    const resp = this.recopilarSubtitles(
      this.structure.subtitle,
      this.structure,
      this.parentNode
    );
    const array = resp.split(" / ");
    array.length === 1 && array[0] === ""
      ? array.splice(array.length - 1, 1)
      : null;
    array.push(form.subtitle);
    form.subtitle = array.join(" / ");
    this.mc.dismiss(form);
  }

  recopilarSubtitles(subtitle: string, node: any, parentNode: any) {
    if (node.id === 1 && this.actualNode?.id === node.id) {
      return "";
    } else if (this.actualNode?.id === node.id) {
      return subtitle;
    } else if (node.id === parentNode?.id && node.id !== 1) {
      subtitle = `${subtitle} / ${node.subtitle.split(" / ").reverse()[0]}`;
      return subtitle;
    } else if (node.id === 1 && node.id === parentNode?.id) {
      return subtitle;
    } else if (node.id === 1) {
    } else {
      subtitle = `${subtitle} / ${node.subtitle.split(" / ").reverse()[0]}`;
    }
    for (let i in node.childs) {
      const resp = this.recopilarSubtitles(
        subtitle,
        node.childs[i],
        this.parentNode
      );
      if (resp !== `Error`) {
        return resp;
      }
    }
    return `Error`;
  }

  //editPhoto() {
  //  this.viUp.takeOnlyPhoto();
  //  this.viUp.content.pipe(take(1)).subscribe((r: string) => (this.photo = r));
  //}
  async editMedia(node: INode){
    const modal = await this.mc.create({
      component: ModifyMediaComponent,
      cssClass: "my-custom-class",
      componentProps: {
        media: node.media,
        idUser: null
      }
    })
    await modal.present()
    const { data } = await modal.onDidDismiss()
    if(data){
      const newMedia = data
      this.form.controls.media.setValue(newMedia)
    }
  }
}
