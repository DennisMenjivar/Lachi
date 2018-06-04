import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { Consolidated } from '../../_models/Consolidated.model';
import { Closure } from '../../_models/Closure.model';

@IonicPage()
@Component({
  selector: 'page-consolidated',
  templateUrl: 'consolidated.html',
})
export class ConsolidatedPage {

  miDate = new Date();
  miConsolidated: Consolidated = new Consolidated(0, 0, '', 0, 0, 0, String(this.miDate), 0, 0);
  consolidated: Consolidated[];

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

  getConsolidated() {
    this.consolidated = [];
    this.database.getConsolidatedByStatus(this.miConsolidated).then((data: Consolidated[]) => {
      this.consolidated = data as Consolidated[];
      console.log("Consolidated: ", JSON.stringify(data));

    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  createClosureFinish() {
    let myDate = String(new Date());
    let closure = new Closure(0, '', myDate, 0, 0, 0, '', 0);

    this.database.createClosureFinish(closure).then((data) => {
      if (data) {
        for (let index = 0; index < 100; index++) {
          let consolidated = new Consolidated(0, 0, '', index, 0, 0, myDate, 0, data.id);
          this.database.createConsolidatedAndStock(consolidated, index).then((data) => {

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
