import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import {
  sports,
  sportsSticks,
  sportsCycling,
  waterSports,
  motorSports,
  combinedTests,
  athletics,
  precisionSports,
  gymnastics,
  winterSports,
  combatSports,
  teamSports,
  strengthSports,
  tableSports,
  animalSports,
  xtremeSports,
  slidingSports,
  airSports,
  mountainSports,
} from "src/config/sports";

enum Texts {
  alertHeader = "selectSport.alertHeader",
  alertMessage = "selectSport.alertMessage",
  alertAccept = "selectSport.alertAccept",
}

@Component({
  selector: "app-sport-select",
  templateUrl: "./sport-select.component.html",
  styleUrls: ["./sport-select.component.scss"],
})
export class SportSelectComponent implements OnInit {
  constructor(
    public readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly translate: TranslateService
  ) {}

  ngOnInit() {
    console.log(sports.length)
  }

  filter() {
    this.sportsFilters = sports.filter((sport) => {
      const text: string = this.translate.instant(`allSports.${sport}`);

      return text.toLowerCase().indexOf(this.query.toLowerCase()) != -1;
    });
  }
  query = "";

  list = [
    {
      type: "sportsSticks",

      sports: sportsSticks,
    },
    {
      type: "sportsCycling",

      sports: sportsCycling,
    },
    {
      type: "waterSports",

      sports: waterSports,
    },
    {
      type: "motorSports",

      sports: motorSports,
    },
    {
      type: "combinedTests",

      sports: combinedTests,
    },
    {
      type: "athletics",
      sports: athletics,
    },
    {
      type: "precisionSports",
      sports: precisionSports,
    },
    {
      type: "gymnastics",
      sports: gymnastics,
    },
    {
      type: "winterSports",
      sports: winterSports,
    },
    {
      type: "combatSports",
      sports: combatSports,
    },
    {
      type: "teamSports",
      sports: teamSports,
    },
    {
      type: "strengthSports",
      sports: strengthSports,
    },
    {
      type: "tableSports",
      sports: tableSports,
    },
    {
      type: "animalSports",
      sports: animalSports,
    },
    {
      type: "xtremeSports",
      sports: xtremeSports,
    },
    {
      type: "slidingSports",
      sports: slidingSports,
    },
    {
      type: "airSports",
      sports: airSports,
    },
    {
      type: "mountainSports",
      sports: mountainSports,
    },
  ];

  option = null;

  setOption(option) {
    this.option = option == this.option ? null : option;
  }

  public sportsFilters = [];

  async sportSelected(event) {
    const sport = event.detail.value;

    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.alertHeader),
      message: this.translate.instant(Texts.alertMessage, {
        sport: this.translate.instant(`allSports.${sport}`),
      }),
      buttons: [
        { text: this.translate.instant("cancel"), role: "close" },
        {
          text: this.translate.instant(Texts.alertAccept),
          handler: () => {
            this.modalCtrl.dismiss(sport);
          },
        },
      ],
    });

    return await alert.present();
  }
}
