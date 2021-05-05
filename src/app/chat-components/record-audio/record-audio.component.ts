import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import getBlobDuration from "get-blob-duration";
import { take } from "rxjs/operators";
import { JdvimageService } from "src/app/service/jdvimage.service";

declare var MediaRecorder: any;

@Component({
  selector: "record-audio",
  templateUrl: "./record-audio.component.html",
  styleUrls: ["./record-audio.component.scss"],
})
export class RecordAudioComponent implements OnInit {
  constructor(
    public JDVImage:JdvimageService
  ) {}

  @Output() newAudio = new EventEmitter<string>()


  ngOnInit() {
    
  }

  /**
   * Funciones para grabar audio
   */

  /**
   * Variable de control para guardar el recorder de MediaRecorder
   */
  mediaRecorder = null;

  /**
   * Variable de control para saber si el audio se guardara, o el usuario cancelo la grabacion
   */
  saveAudio = false;

  /**
   * Variable de control para el temporizador del grabador de audio
   */
  diffRecord = 0;

  /**
   * Variable de control para el setInterval que hace funcionar el temporizador
   * se apaga cuando no esta en uso, para ahorrar memoria
   */

  interval = null;

  /**
   * Cuando empieza a grabar, se crea un stream, entonces se guarda localmente para luego poder destruirla
   */

  localStream = null;

  /**
   * Sube un audio al servidor
   * @param formData
   */
  uploadAudio(formData: FormData) {
    this.JDVImage.uploadAudio(formData)
      .pipe(take(1))
      .subscribe((url:string) => {
        this.newAudio.emit(url)
     
      });
  }

  /**
   * Deja de grabar
   * @param {boolean} option `true` si desea guardar el audio `false` si no se desea
   */
  stopRecord(option) {
    this.saveAudio = option;
    this.mediaRecorder.stop();
    clearInterval(this.interval);
    this.diffRecord = 0;
    this.localStream
      .getTracks() // get all tracks from the MediaStream
      .forEach((track) => track.stop());
  }

  /**
   * Diferencia o temporizador del audio
   */

  diff() {
    this.diffRecord = 0;
    this.interval = setInterval(() => {
      this.diffRecord += 1;
    }, 1000);
  }

  /**
   *
   */

  /**
   * Funcion para empezar a grabar audio en el chat
   */
  captureAudio() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        this.localStream = stream;
        this.mediaRecorder = await new MediaRecorder(stream);
        let that = this;
        this.mediaRecorder.ondataavailable = async function (e) {
          if (that.saveAudio) {
            let formData = new FormData();
            let chunck = [];
            chunck.push(e.data);
            const blob = new Blob(chunck, { type: "audio/mp3" });
            const duration = await getBlobDuration(blob);

            formData.append("audio", blob);
            formData.append("duration", duration.toString(10));

            that.uploadAudio(formData);
          }
        };

        this.diff();
        this.mediaRecorder.start();
      });
  }
}
