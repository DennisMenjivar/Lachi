import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
// import { Http } from '@angular/http'; // don't forget to import HttpModule in app.module.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';

@IonicPage()
@Component({
  selector: 'page-send-data',
  templateUrl: 'send-data.html',
})
export class SendDataPage {

  diariaDetalle: DiariaDetalle[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, public _auxiliarService: AuxiliarService,
    public database: DatabaseProvider) {
    this.getDiariaDetalle();
  }

  getDiariaDetalle() {
    this.database.getDiariaDetalleByStatus(0).then((data: DiariaDetalle[]) => {
      this.diariaDetalle = data as DiariaDetalle[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
    //console.log("Numeros Consolidados: ", this.consolidateNumbers());
  }

  consolidateNumbers(): DiariaDetalle[] {
    let numbersConsolidated: DiariaDetalle[] = [];
    let number: number = 0;
    let lempiras: number = 0;
    for (let index = 0; index < 100; index++) {
      number = index;
      lempiras = 0;
      this.diariaDetalle.forEach(element => {
        if (number == element.number) {
          lempiras += element.lempiras;
        }
      });
      numbersConsolidated.push(new DiariaDetalle(0, 0, number, lempiras, 0, '', '', 0));
    }
    return numbersConsolidated;
  }

  compileData() {
    let totalData = JSON.stringify(this.diariaDetalle);
    this.whatsappShare(totalData);
  }

  whatsappShare(msg: string) {
    this.socialSharing.shareViaWhatsApp(msg, null, null);
  }

  ionViewDidLoad() {

  }

}
