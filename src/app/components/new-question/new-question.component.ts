import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user.service';
import { QuestionService } from '../../service/question.service';
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {
  @Input() question: any
  @Input() edit: boolean
  constructor(
    public questionService:QuestionService,
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    if(this.edit && this.question != undefined){
      this.answers = this.question.answer;
      this.headLine = this.question.questionHeadline
    }
  }

addAnswer(){
  this.answers.push({
    option   : '',
    position : this.answers.length
  })
}
deleteAnswer(id){
  this.answers.splice(id,1)
  for(let i= id; i <= this.answers.length-1; i++){
    this.answers[i].position -= 1; 
  }
  // this.ejemplo.pop();
}
answers = []
// ejemplo = []
headLine;
  form = this.fb.group({
    questionHeadline:['',[Validators.required]],
    answer:['',[Validators.required]],
  })
ready:boolean=false;

 async create(){
  let exist
  exist = this.answers.find(x => x.option == '' || x.option == undefined)
 
   if(!exist){
    let question = this.form.value
    question.questionHeadline = this.headLine;
    question.answer = this.answers;
     let loading = await this.loadingCtrl.create({
       message: this.translate.instant("loading"),
     });
       loading.present();
       this.modalController.dismiss({
         question,
       })
       loading.dismiss();
   }
}

 async editQuestion(){
    let question = this.form.value
   question.questionHeadline = this.headLine;
   question.answer = this.answers;
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
      loading.present();
      this.modalController.dismiss({
        question,
      })
      loading.dismiss();
  }
  
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }



}

