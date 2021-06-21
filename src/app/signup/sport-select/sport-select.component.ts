import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import {
  sports,
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
  danceSports,
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
    console.log(sports.length);
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
      type: "sportsCycling",

      sports: sportsCycling,
      img: "assets/sports/cycling.png",
    },
    {
      type: "waterSports",

      sports: waterSports,
      img: "assets/sports/swimming.png",
    },
    {
      type: "motorSports",

      sports: motorSports,
      img: "assets/sports/wheel.png",
    },
    {
      type: "combinedTests",

      sports: combinedTests,
      img: "assets/sports/combined.png",
    },
    {
      type: "athletics",
      sports: athletics,
      img: "assets/sports/athletics.png",
    },
    {
      type: "precisionSports",
      sports: precisionSports,
      img: "assets/sports/archery.png",
    },
    {
      type: "gymnastics",
      sports: gymnastics,
      img: "assets/sports/various.png",
    },
    {
      type: "winterSports",
      sports: winterSports,
      img: "assets/sports/winter.png",
    },
    {
      type: "combatSports",
      sports: combatSports,
      img: "assets/sports/karate.png",
    },
    {
      type: "teamSports",
      sports: teamSports,
      img: "assets/sports/team.png",
    },
    {
      type: "strengthSports",
      sports: strengthSports,
      img: "assets/sports/strength.png",
    },
    {
      type: "tableSports",
      sports: tableSports,
      img: "assets/sports/table_tennis.png",
    },
    {
      type: "animalSports",
      sports: animalSports,
      img: "assets/sports/hriding.png",
    },
    {
      type: "xtremeSports",
      sports: xtremeSports,
      img: "assets/sports/climbingx.png",
    },
    {
      type: "slidingSports",
      sports: slidingSports,
      img: "assets/sports/sliding.png",
    },
    {
      type: "airSports",
      sports: airSports,
      img: "assets/sports/skydiving.png",
    },
    {
      type: "mountainSports",
      sports: mountainSports,
      img: "assets/sports/climbing.png",
    },
    {
      type: "danceSports",
      sports: danceSports,
      img: "assets/sports/dancer.png",
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
