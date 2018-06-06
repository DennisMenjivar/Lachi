import { Pedazo } from '../../_models/Pedazo.model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the RangeNumbersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-range-numbers',
  templateUrl: 'range-numbers.html',
})
export class RangeNumbersPage {

  from: number = null;
  until: number = null;
  amount: number = null;

  number: number;

  pedazos: Pedazo[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider, public alertCtrl: AlertController) {
    this.pedazos = navParams.data.pPedazos;
  }

  createPedazos() {
    this.pedazos = [];
    let status: boolean = false;
    let cont: number = 0;
    let date = String(new Date());
    let idClosure: number = this._auxiliarService.miClosure.id;
    while (cont < 100) {
      let miPedazo: Pedazo = new Pedazo(0, cont, 10000, idClosure);
      this.database.createPedazo(miPedazo).then((data) => {
        status = true;
      }, (error) => {
        console.log("Error al crear: ", error);
      });
      cont++;
    }
    if (status = true) {
      this.showToast("Numeros creados correctamente.")
    } else {
      this.showToast("Error al crear numeros.")
    }
  }

  setNumbers() {
    if (this.from != null && this.until != null) {
      this.conditionRange(this.from, this.until, this.amount);
    } else if (this.from == null) {
      this.showToast("Ingrese un rango por favor.")
    }
  }

  conditionRange(from: number, until: number, amount: number) {
    this.presentLoading("Por favor espere..");
    this.database.getDiariaLenghtByStatus()
      .then((data) => {
        if (data) {
          this.loader.dismiss();
          this.presentAlert();
        } else {
          this.setNumberRange(from, until, amount);
        }
      })
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'No puede configurar numeros cuando tiene tickets ya vendidos.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  setNumberRange(from: number, until: number, amount: number) {
    let status: number = 0;
    let cont: number = from;
    while (cont <= until) {
      let miPedazo: Pedazo = new Pedazo(0, cont, amount, 0);
      this.database.editPedazoAndStocking(miPedazo).then((data) => {
        if (data) {
          status == 1;
        }
      });
      cont++;
    }
    if (status = 1) {
      this.loader.dismiss();
      this.showToast("Numeros editados correctamente.")
    }
  }

  ionViewDidLoad() {

  }

  doRefresh(refresher) {
    // this.getPedazos();
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