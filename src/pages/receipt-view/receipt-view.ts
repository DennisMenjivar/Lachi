import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataChica } from '../../_models/DataChica.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-receipt-view',
  templateUrl: 'receipt-view.html',
  styles: ['receipt-view.scss']
})
export class ReceiptViewPage {

  private Home
  miChica: DataChica;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider) {
    this.Home = HomePage;
    this.miChica = navParams.data.pChica;
  }

  ionViewDidLoad() {

  }

  finalize() {
    let status: number = 0;
    this._auxiliarService.chicas.forEach(element => {
      this.database.CreateChica(element).then((data) => {
        status = 0;
      }, (error) => {
        status = 1;
        console.log("Error: ", error);
      })
    });
    if (status == 0) {
      this.showToast("Finalizado con éxito!!");
      this._auxiliarService.chicas = [];
      this.navCtrl.popToRoot();
    } else {
      this.showToast("ERROR al guardar.");
    }
  }

  delete() {
    this.navCtrl.popToRoot();
    this._auxiliarService.chicas = [];
  }

  goToCreateNumber() {
    var params = {
      pChica: this.miChica
    };
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
    // this.navCtrl.pop();
    // this.navCtrl.pop();
    // this.navCtrl.push(this.Home, params);
  }

  deleteNumber(index: DataChica) {
    var miChi = this._auxiliarService.chicas.indexOf(index, 0);
    if (miChi > -1) {
      this._auxiliarService.chicas.splice(miChi, 1);
      this.showToast("Numero: " + index.number + " Eliminado!!");
    }
  }

  doRefresh(refresher) {
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
    });
    this.loader.present();
  }

}
