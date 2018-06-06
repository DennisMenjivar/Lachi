import { Pedazo } from '../../_models/Pedazo.model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import { RangeNumbersPage } from '../range-numbers/range-numbers';

@IonicPage()
@Component({
  selector: 'page-control-pedazos',
  templateUrl: 'control-pedazos.html',
})
export class ControlPedazosPage {

  private RangeNumber

  pedazos: Pedazo[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider) {
    this.RangeNumber = RangeNumbersPage;
  }

  ionViewDidLoad() {
    this.initialize();
  }

  getPedazos() {
    this.pedazos = [];
    this.database.getPedazos().then((data: Pedazo[]) => {
      this.pedazos = data;
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  initialize() {
    this.getPedazos();
  }

  goToRangeNumber() {
    // this.initialize();
    var params = {
      pPedazos: this.pedazos
    };
    this.navCtrl.push(this.RangeNumber, params);
  }

  // createPedazos() {
  //   let status: boolean = false;
  //   let cont: number = 0;
  //   while (cont < 100) {
  //     let miPedazo: Pedazo = new Pedazo(0, cont, 100, 0);
  //     this.database.createPedazo(miPedazo).then((data) => {
  //       status = true;
  //     }, (error) => {
  //       console.log("Error al crear: ", error);
  //     });
  //     cont++;
  //   }
  //   if (status = true) {
  //     this.showToast("Numeros creados correctamente.")
  //   } else {
  //     this.showToast("Error al crear numeros.")
  //   }
  // }

  doRefresh(refresher) {
    this.getPedazos();
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
