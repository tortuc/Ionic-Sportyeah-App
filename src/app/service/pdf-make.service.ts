import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UserService } from './user.service';
import { ViewsSponsorService } from './views-sponsor.service';
import * as moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  constructor( public userService: UserService,
    public viewsSponsorService: ViewsSponsorService,
    private translate: TranslateService,) { }


dayPdf=[

]
weekPdf=[

]
monthPdf=[

]
yearPdf=[

]



  async generatePdf(name){
  
    let sponsorPages = [];
    let data;
    let jan = `Vistas totales en el mes de ${this.translate.instant(`months.0`)}`
    let feb = `Vistas totales en el mes de ${this.translate.instant(`months.1`)}`
    let mar = `Vistas totales en el mes de ${this.translate.instant(`months.2`)}`
    let apr = `Vistas totales en el mes de ${this.translate.instant(`months.3`)}`
    let may = `Vistas totales en el mes de ${this.translate.instant(`months.4`)}`
    let jun = `Vistas totales en el mes de ${this.translate.instant(`months.5`)}`
    let jul = `Vistas totales en el mes de ${this.translate.instant(`months.6`)}`
    let aug = `Vistas totales en el mes de ${this.translate.instant(`months.7`)}`
    let sep = `Vistas totales en el mes de ${this.translate.instant(`months.8`)}`
    let oct = `Vistas totales en el mes de ${this.translate.instant(`months.9`)}`
    let nov = `Vistas totales en el mes de ${this.translate.instant(`months.10`)}`
    let dec = `Vistas totales en el mes de ${this.translate.instant(`months.11`)}`
    let post = `Total de vistas por ${this.translate.instant('analytics-views.post')}`
    let chat = `Total de vistas por ${this.translate.instant('analytics-views.chat')}`
    let search = `Total de vistas por ${this.translate.instant('analytics-views.search')}`
    let profile = `Total de vistas por ${this.translate.instant('analytics-views.profile')}`
    let reaction = `Total de vistas por ${this.translate.instant('analytics-views.reaction')}`
    let comment = `Total de vistas por ${this.translate.instant('analytics-views.comment')}`
    let ranking = `Total de vistas por ${this.translate.instant('analytics-views.ranking')}`
    let news = `Total de vistas por ${this.translate.instant('analytics-views.news')}`
    
    
      data = await this.viewsSponsorService.getVisitsByYearPdf(this.userService.User._id,moment().startOf("year"),name)
      .toPromise()
        
      sponsorPages.push(
        [
          {
            text:  `${this.translate.instant("pdf.data_sponsor")}\n\n`,
            style: 'header'
          },
          {
            text:  `Vistas totales de ${name}:  ${data.total}`,
            style: 'header'
          },
          'Estos son los datos del año en curso, en fragmentos correspondiente de el origen de las vistas.\n\n',
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
        ]
      )
      
    const documentDefinition = { 
        content:sponsorPages,
        styles: {
          header: {
            fontSize: 18,
            bold: true
          },
          subheader: {
            fontSize: 15,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8
          }
        }
        
      };
      
      
      pdfMake.createPdf(documentDefinition).open();
    
        // pdfMake.createPdf(documentDefinition).download();
     }
}
