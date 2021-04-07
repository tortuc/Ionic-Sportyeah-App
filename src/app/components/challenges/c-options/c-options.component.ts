import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { ChallengeService } from 'src/app/service/challenge.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-c-options',
  templateUrl: './c-options.component.html',
  styleUrls: ['./c-options.component.scss'],
})
export class COptionsComponent implements OnInit {
  @Input() id: string

  ngOnInit() { }

  constructor(
    public popover            : PopoverController,
    public alertController    : AlertController,
    public cs                 : ChallengeService
  ) {}

  deleteChallengeButton(){
    this.alert('¿Seguro que desea eliminar este desafio?','');
  }

  close(){
    this.popover.dismiss()
  }


  deleteChallenge(){
    this.cs.deleteChallenge(this.id)
      .pipe(take(1))
      .subscribe((r:any)=>{
      })
    this.popover.dismiss()
  }

  async alert(header: string, message: string): Promise<any> {
    let alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text:'Cancelar',
          handler:()=>{
          }
        },

        {
          text: 'Eliminar',
          role: 'acept',
          handler:()=>{
            this.deleteChallenge()
          }
        },
      ],
    });

    await alert.present();
  }


}
