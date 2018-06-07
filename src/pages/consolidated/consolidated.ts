import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
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

  activeContainer: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider,
    private alertCtrl: AlertController) {
    this.getConsolidated();
  }

  ionViewDidLoad() {

  }

  consolidated: Consolidated[];

  getConsolidated() {
    this.consolidated = [];
    this.database.getConsolidatedFinal(0)
      .then((data) => {
        if (data) {
          this.consolidated = data;
          this.loader.dismiss();
        }
      });
  }

  myDate = String(new Date());
  createClosureFinish() {
    let closure = new Closure(this._auxiliarService.miClosure.id, '', this.myDate, 0, this.database.totalTotalConsolidated, 0, '', 0, 0);

    this.database.createClosureFinish(closure).then((data) => {
      if (data) {
        //this._auxiliarService.miClosure = data;
        for (let index = 0; index < 100; index++) {
          this.database.createStock(index).then((data) => {
            this.getConsolidated();
            this.activeContainer = false;
          });
        }
      }
      this.presentLoading("Procesando, Porfavor espere..");
    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "Cierre",
      message: "Esta seguro que desea hacer cierre?",
      buttons: [
        {
          text: 'Guardar y Enviar',
          handler: () => {
            this.createClosureFinish();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.showToast("Cancelado!");
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.getConsolidated();
    refresher.complete();
  }

  showToast(msg: string) {
    this.loader.dismiss();

    const toast = this.toastCtrl.create({
      message: msg,
      duration: 700
    });
    toast.present();
  }

  loader = this.loadingCtrl.create({
    content: "Cargando..."
  });

  presentLoading(msg: string) {
    this.loader = this.loadingCtrl.create({
      content: msg
      , duration: 120000
    });
    this.loader.present();
  }

}
