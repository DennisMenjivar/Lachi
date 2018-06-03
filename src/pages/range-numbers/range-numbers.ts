import { Pedazo } from '../../_models/Pedazo.model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import { Consolidated } from '../../_models/Consolidated.model';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider) {

  }

  createPedazos() {
    let status: boolean = false;
    let cont: number = 0;
    let date = String(new Date());

    while (cont < 100) {
      let consolidated: Consolidated = new Consolidated(0, 0, 'user', 0, 0, 0, date, 0, this._auxiliarService.miClosure.id);
      let miPedazo: Pedazo = new Pedazo(0, cont, 10000, 0);
      consolidated.number = cont;
      this.database.createPedazo(miPedazo, consolidated).then((data) => {
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
      this.setNumberRange(this.from, this.until, this.amount);
    } else if (this.from == null) {
      this.showToast("Ingrese un rango por favor.")
    }
  }

  setNumberRange(from: number, until: number, amount: number) {
    let status: boolean = false;
    let cont: number = from;
    while (cont <= until) {
      let miPedazo: Pedazo = new Pedazo(cont, cont, amount, 0);
      this.database.editPedazo(miPedazo).then((data) => {
        this.database.editStock(miPedazo).then((data) => {
          status = true;
        }, (error) => {
          console.log("Error al crear: ", error);
        })
      }, (error) => {
        console.log("Error al crear: ", error);
      });
      cont++;
    }
    if (status = true) {
      this.showToast("Numeros editado correctamente.")
    } else {
      this.showToast("Error al editar numeros.")
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