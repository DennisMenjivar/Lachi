import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
// import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
import { Pedazo } from '../../_models/Pedazo.model';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';

//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { DiariaControl } from '../../_models/DiariaControl.model';

@IonicPage()
@Component({
  selector: 'page-receipt-view',
  templateUrl: 'receipt-view.html',
  styles: ['receipt-view.scss']
})
export class ReceiptViewPage {

  // private Home
  miDiariaControl: DiariaControl;
  miDiaria: DiariaDetalle;
  telephone: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider, private socialSharing: SocialSharing,
    private alertCtrl: AlertController) {
    // this.Home = HomePage;
    this.telephone = navParams.data.pTelephone;
    this.miDiaria = navParams.data.pDiaria;
    this.miDiariaControl = new DiariaControl(0, 0, '', 0, _auxiliarService.miClosure.id);
    this.getLenght();
  }

  ionViewDidLoad() {

  }

  lenght: number = 0;

  getLenght() {
    this.database.getDiariaLenght().then((data) => {
      this.lenght = data.id + 1;
    });
  }

  updateStock() {
    this._auxiliarService.stocks.forEach(element => {
      this.database.editStock(element).then((data) => {

      }, (error) => {
        console.log("Error al modificar stock", error);
      })
    });
  }

  currentDate = new Date();
  compileData(viaWhatsapp: number) {
    this.miDiariaControl.total = this.getTotal();
    this.miDiariaControl.id_client = this.miDiaria.id_client;
    this.miDiariaControl.client = this.miDiaria.client;
    this.miDiariaControl.date = String(this.currentDate);
    this.miDiariaControl.id_closure = this._auxiliarService.miClosure.id;
    var statusVar: number = -1;
    let myControl = new DiariaControl(0, 0, '', 0, 0);
    this._auxiliarService.totalDataToSendViaWhatsapp = '';

    this.database.CreateDiariaControl(this.miDiariaControl).then((control) => {
      control.client = this.miDiaria.client;
      myControl = control;
      this._auxiliarService.totalDataToSendViaWhatsapp += control.toStringToReceiptView();
    }).then((data) => {
      this._auxiliarService.diariaDetalle.forEach(element => {
        element.id_control = myControl.id;
        element.status = 0;
        element.id_closure = this._auxiliarService.miClosure.id;

        this.database.CreateDiariaDetalle(element).then((detalle) => {
          element.id = detalle.id;
          statusVar = 0;
          // this.showToast("Diaria Detalle: " + detalle.toStringReceiptView());
        });
        this._auxiliarService.totalDataToSendViaWhatsapp += element.toStringReceiptView();
        statusVar = 0;
      });
    }).then((data) => {
      if (statusVar == 0) {
        this.updateStock();
        if (viaWhatsapp == 1) {
          this.whatsappShare(this._auxiliarService.totalDataToSendViaWhatsapp);
        }
        this.showToast("Guardado con éxito!!");
        this._auxiliarService.totalTicket = 0;
        this._auxiliarService.diariaDetalle = [];
        this.navCtrl.popToRoot();
      } else {
        this.showToast("ERROR al guardar.");
      }
    });
  }

  loadStock() {
    this._auxiliarService.stocks = [];
    this.database.getStock().then((data: Pedazo[]) => {
      this._auxiliarService.stocks = data as Pedazo[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  updateStockByNumber(number: number, pPedazos: number) {
    this._auxiliarService.stocks.forEach(element => {
      if (number == element.number) {
        element.pedazos += pPedazos;
      }
    });
  }

  goToCreateNumber() {
    // var params = {
    //   pDiaria: this.miDiaria
    // };
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
    // this.navCtrl.pop();
    // this.navCtrl.pop();
    // this.navCtrl.push(this.Home, params);
  }

  delete() {
    this.loadStock();
    this.navCtrl.popToRoot();
    this._auxiliarService.diariaDetalle = [];
    this._auxiliarService.totalTicket = 0;
    this.showToast("Todos los datos fueron eliminados!");
  }

  deleteNumber(index: DiariaDetalle) {
    var miChi = this._auxiliarService.diariaDetalle.indexOf(index, 0);
    if (miChi > -1) {
      this.updateStockByNumber(index.number, index.lempiras);
      this._auxiliarService.totalTicket -= index.lempiras;
      this._auxiliarService.diariaDetalle.splice(miChi, 1);
      this.showToast("Numero: " + index.number + " Eliminado!!");
    }
    if (this._auxiliarService.diariaDetalle.length <= 0) {
      this._auxiliarService.totalTicket = 0;
      this.navCtrl.popToRoot();
      this.showToast("Todos los datos fueron eliminados!");
    }
  }

  whatsappShare(msg: string) {
    // this.socialSharing.shareViaWhatsAppToReceiver(this.telephone, msg, null, null);
    this.socialSharing.shareViaWhatsApp(msg, null, null);
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

  showConfirmMessage() {
    this.presentConfirm("Whatsapp", "Desea enviar via Whatsapp estos datos?", "Guardar", "Enviar y Guardar");
  }

  getTotal(): number {
    let total: number = 0;
    this._auxiliarService.diariaDetalle.forEach(element => {
      total += element.lempiras;
    });
    return total;
  }

  presentConfirm(title: string, message: string, accept: string, cancel: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: accept,
          handler: () => {
            this.compileData(0);
          }
        },
        {
          text: 'Guardar y Enviar',
          handler: () => {
            this.compileData(1);
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

  presentConfirmDeleteData() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Esta seguro que desea eliminar todo?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.delete();
          }
        }
        , {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  presentConfirmDeleteByNumber(diaria: DiariaDetalle) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Esta seguro que desea eliminar el ' + diaria.number + '?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteNumber(diaria);
          }
        }
        , {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

}
