import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { UserService } from "./user.service";
import { ViewsSponsorService } from "./views-sponsor.service";
import * as moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: "root",
})
export class PdfMakeService {
  constructor(
    public userService: UserService,
    public viewsSponsorService: ViewsSponsorService,
    private translate: TranslateService
  ) {}

  dayPdf = [];
  weekPdf = [];
  monthPdf = [];
  yearPdf = [];

  // src/assets/logos/imagotipo_azul.png
  // imagotipo_azul.png
  //logos/imagotipo_azul.png
  // assets/logos/imagotipo_azul.png
  // ../../assets/logos/imagotipo_azul.png

  userInfo = {
    text: [
      {
        text: `${this.userService.User.name}  ${this.userService.User.last_name}\n`,
        fontSize: 22,
        bold: true,
      },
      {
        text: `${this.translate.instant("sign_up.username.placeholder")} : ${
          this.userService.User.username
        }`,
        fontSize: 15,
      },
    ],
    style: "header",
  };
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }

  async generatePdf(name, date, dateTime:any) {
console.log(name,date,dateTime);
    
    let sponsorPages = [];
    let newDate;
    let data
    switch (date) {
      case "day":
        newDate = dateTime.format("DD-MM-YYYY")
        break;
      case "week":
        newDate = dateTime[0].format("DD-MM-YYYY")+' '+ dateTime[1].format("DD-MM-YYYY")
        break;
      case "month":
        newDate = dateTime.format("MM-YYYY")
        break;
      case "year":
        newDate = dateTime.format("YYYY")
        break;

      default:
        break;
    }
    let jan = `Vistas totales en el mes de ${this.translate.instant(
      `months.0`
    )}`;
    let feb = `Vistas totales en el mes de ${this.translate.instant(
      `months.1`
    )}`;
    let mar = `Vistas totales en el mes de ${this.translate.instant(
      `months.2`
    )}`;
    let apr = `Vistas totales en el mes de ${this.translate.instant(
      `months.3`
    )}`;
    let may = `Vistas totales en el mes de ${this.translate.instant(
      `months.4`
    )}`;
    let jun = `Vistas totales en el mes de ${this.translate.instant(
      `months.5`
    )}`;
    let jul = `Vistas totales en el mes de ${this.translate.instant(
      `months.6`
    )}`;
    let aug = `Vistas totales en el mes de ${this.translate.instant(
      `months.7`
    )}`;
    let sep = `Vistas totales en el mes de ${this.translate.instant(
      `months.8`
    )}`;
    let oct = `Vistas totales en el mes de ${this.translate.instant(
      `months.9`
    )}`;
    let nov = `Vistas totales en el mes de ${this.translate.instant(
      `months.10`
    )}`;
    let dec = `Vistas totales en el mes de ${this.translate.instant(
      `months.11`
    )}`;
    let post = `Total de vistas por ${this.translate.instant(
      "analytics-views.post"
    )}`;
    let chat = `Total de vistas por ${this.translate.instant(
      "analytics-views.chat"
    )}`;
    let search = `Total de vistas por ${this.translate.instant(
      "analytics-views.search"
    )}`;
    let profile = `Total de vistas por ${this.translate.instant(
      "analytics-views.profile"
    )}`;
    let reaction = `Total de vistas por ${this.translate.instant(
      "analytics-views.reaction"
    )}`;
    let comment = `Total de vistas por ${this.translate.instant(
      "analytics-views.comment"
    )}`;
    let ranking = `Total de vistas por ${this.translate.instant(
      "analytics-views.ranking"
    )}`;
    let news = `Total de vistas por ${this.translate.instant(
      "analytics-views.news"
    )}`;
    console.log("estoy");

    data = await this.viewsSponsorService.getVisitsByYearPdf(this.userService.User._id,dateTime,name)
    .toPromise()

    sponsorPages.push([
      {
        image: await this.getBase64ImageFromURL(
          "https://i.postimg.cc/0ySrrhzK/imagotipo-azul.png"
        ),
        width: 120,
        height: 95,
        absolutePosition: { x: 25, y: 70 },
      },
      {
        image: await this.getBase64ImageFromURL(
          "https://i.postimg.cc/pr95CrLq/Sportsyeah-slide.jpg"
        ),
        width: 520,
        height: 230,
        absolutePosition: { x: 145, y: 10 },
      },
      // this.userInfo,
      // {
      //   text: [
      //     { text: `${this.translate.instant("pdf.data_sponsor")}:  ${name}\n` },
      //     {
      //       text: `${this.translate.instant("pdf.date")}:  ${newDate}`,
      //     },
      //   ],
      // },
      {
        alignment: 'justify',
        columns: [
          this.userInfo,
          {
             width: '40%',//No existe el alifnment right , por ello el 40% del tamaño de la columna
              text: [
                { text: `${this.translate.instant("pdf.data_sponsor")}:\n` },
                {
                  text: `${name}\n`,
                  style:{
                    bold: true,
                  }
                },
                {
                  text: `${this.translate.instant("pdf.date")}:`,
                },
                {
                  text: `  ${newDate}`,
                  style:{
                    bold: true,
                  }
                },
              ],
              style:'headerDate'
          },
        ]
      },
      // {
      //   image: await this.getBase64ImageFromURL('https://i.postimg.cc/0ySrrhzK/imagotipo-azul.png'),
      //   width: 50,
      //   height: 50,
      // },

      {
        text:  post + ` ${data.year[0].total}`,
        style: 'header'
      },
      {
        text:  chat + ` ${data.year[1].total}`,
        style: 'header'
      },
      {
        text:  search + ` ${data.year[2].total}`,
        style: 'header'
      },
      {
        text:  profile + ` ${data.year[3].total}`,
        style: 'header'
      },
      {
        text:  reaction + ` ${data.year[4].total}`,
        style: 'header'
      },
      {
        text:  comment + ` ${data.year[5].total}`,
        style: 'header'
      },
      {
        text:  ranking + ` ${data.year[6].total}`,
        style: 'header'
      },
      {
        text:  news + ` ${data.year[7].total}`,
        style: 'header'
      },
      // {
      //   text: 'Subheader 1 - using subheader style',
      //   style: 'subheader'
      // },
      // 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      // 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      // 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
      // {
      //   text: 'Subheader 2 - using subheader style',
      //   style: 'subheader'
      // },
      // 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      // 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
      // {
      //   text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
      //   style: ['quote', 'small']
      // }
    ]);

    const documentDefinition = {
      content: sponsorPages,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 170, 0, 50],
        },
        headerDate: {
          fontSize: 12,
          margin: [0, 170, 0, 50],
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();

    // pdfMake.createPdf(documentDefinition).download();
  }
}
