import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
// import { Http } from '@angular/http'; // don't forget to import HttpModule in app.module.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-send-data',
  templateUrl: 'send-data.html',
})
export class SendDataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, public _auxiliarService: AuxiliarService, ) {

  }

  compileData() {
    let totalData: string = '';
    this._auxiliarService.chicas.forEach(element => {
      totalData += element.toStringDC();
    });
    this.whatsappShare(totalData);
  }

  whatsappShare(msg: string) {
    this.socialSharing.shareViaWhatsApp(msg, null, null);
  }

  ionViewDidLoad() {

  }

}
