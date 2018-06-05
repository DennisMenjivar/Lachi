import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { Closure } from '../../_models/Closure.model';
import { Consolidated } from '../../_models/Consolidated.model';

@IonicPage()
@Component({
  selector: 'page-consolidated',
  templateUrl: 'consolidated.html',
})
export class ConsolidatedPage {

  miDate = new Date();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider) {
    this.getConsolidated();
  }

  ionViewDidLoad() {

  }

  consolidated: Consolidated[] = [];

  getConsolidated() {
    this.database.getConsolidatedFinal(0)
      .then((data) => {
        if (data) {
          this.consolidated = data;
        }
      });
  }

  myDate = String(new Date());
  createClosureFinish() {
    let closure = new Closure(0, '', this.myDate, 0, 0, 0, '', 0);

    this.database.createClosureFinish(closure).then((data) => {
      if (data) {
        for (let index = 0; index < 100; index++) {
          this.database.createStock(index).then((data) => {

          });
        }
      }
      this.presentLoading("Porfavor espere..");
    });
  }

  doRefresh(refresher) {
    this.getConsolidated();
    refresher.complete();
  }

  showToast(msg: string) {
    this.loader.dismiss();

    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  loader = this.loadingCtrl.create({
    content: "Cargando..."
  });

  presentLoading(msg: string) {
    this.loader = this.loadingCtrl.create({
      content: msg
      , duration: 12000
    });
    this.loader.present();
  }

}
