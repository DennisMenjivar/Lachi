import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  miDiariaDetalle: DiariaDetalle[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, public _auxiliarService: AuxiliarService,
    public database: DatabaseProvider) {
    this.getDiariaDetalle();
  }

  getDiariaDetalle() {
    this.database.getDiariaDetalleByStatus(0).then((data: DiariaDetalle[]) => {
      this.miDiariaDetalle = data as DiariaDetalle[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  compileData() {
    let totalData = JSON.stringify(this.miDiariaDetalle);
    this.whatsappShare(totalData);
  }

  whatsappShare(msg: string) {
    this.socialSharing.shareViaWhatsApp(msg, null, null);
  }

  ionViewDidLoad() {

  }

}
