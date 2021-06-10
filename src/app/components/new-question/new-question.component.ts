import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, ModalController } from "@ionic/angular";

@Component({
  selector: "app-new-question",
  templateUrl: "./new-question.component.html",
  styleUrls: ["./new-question.component.scss"],
})
export class NewQuestionComponent implements OnInit {
  @Input() question: any;
  @Input() edit: boolean;
  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.edit && this.question != undefined) {
      this.answers = this.question.answer;
      this.headLine = this.question.questionHeadline;
    } else {
      this.answers = [
        {
          option: "",
          position: 0,
        },
        {
          option: "",
          position: 1,
        },
      ];
    }
  }

  addAnswer() {
    this.answers.push({
      option: "",
      position: this.answers.length,
    });
  }

  deleteAnswer(id) {
    this.answers.splice(id, 1);

    for (let i = id; i <= this.answers.length - 1; i++) {
      this.answers[i].position -= 1;
    }
  }
  answers = [];
  headLine;

  async create() {
    console.log("estoy creando desde el new queistion");
    
    let exist = this.answers.find(
      (x) => x.option == "" || x.option == undefined
    );

    if (!exist) {
      let question = {
        questionHeadline: this.headLine,
        answer: this.answers,
      };

      this.modalController.dismiss({
        question,
      });
    } else {
      this.warning();
    }
  }

  async warning() {
    let alert = await this.alertCtrl.create({
      header: "Ups, algo salio mal",
      message:
        "Al parecer tienes respuestas vacias... Debes llenar los campos correctamente",
      buttons: [{ text: this.translate.instant("accept") }],
    });
    alert.present();
  }

  async editQuestion() {
    let question = {
      questionHeadline: this.headLine,
      answer: this.answers,
    };

    this.modalController.dismiss({
      question,
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
