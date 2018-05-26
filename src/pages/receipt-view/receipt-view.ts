import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { DataChica } from '../../_models/DataChica.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { Pedazo } from '../../_models/Pedazo.model';

@IonicPage()
@Component({
  selector: 'page-receipt-view',
  templateUrl: 'receipt-view.html',
  styles: ['receipt-view.scss']
})
export class ReceiptViewPage {

  private Home
  miChica: DataChica;
  telephone: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider, private socialSharing: SocialSharing,
    private alertCtrl: AlertController) {
    this.Home = HomePage;
    this.telephone = navParams.data.pTelephone;
    this.miChica = navParams.data.pChica;
  }

  ionViewDidLoad() {

  }

  updateStock() {
    this._auxiliarService.stocks.forEach(element => {
      this.database.editStock(element).then((data) => {

      }, (error) => {
        console.log("Error al modificar stock", error);
      })
    });
  }

  compileData(viaWhatsapp: number) {
    let status: number = 0;
    this._auxiliarService.totalDataToSendViaWhatsapp = '';
    this._auxiliarService.chicas.forEach(element => {
      this.database.CreateChica(element).then((data) => {
        status = 0;
      }, (error) => {
        status = 1;
        console.log("Error: ", error);
      })
      this._auxiliarService.totalDataToSendViaWhatsapp += element.toStringDC();
      status = 0;
    });
    if (status == 0) {
      this.updateStock();
      if (viaWhatsapp == 1) {
        this.whatsappShare(this._auxiliarService.totalDataToSendViaWhatsapp);
      }
      this.showToast("Guardado con éxito!!");
      this._auxiliarService.chicas = [];
      this.navCtrl.popToRoot();
    } else {
      this.showToast("ERROR al guardar.");
    }
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
    var params = {
      pChica: this.miChica
    };
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
    // this.navCtrl.pop();
    // this.navCtrl.pop();
    // this.navCtrl.push(this.Home, params);
  }

  delete() {
    this.loadStock();
    this.navCtrl.popToRoot();
    this._auxiliarService.chicas = [];
    this.showToast("Todos los datos fueron eliminados!");
  }

  deleteNumber(index: DataChica) {
    var miChi = this._auxiliarService.chicas.indexOf(index, 0);
    if (miChi > -1) {
      this.updateStockByNumber(index.number, index.lempiras);
      this._auxiliarService.chicas.splice(miChi, 1);
      this.showToast("Numero: " + index.number + " Eliminado!!");
    }
    if (this._auxiliarService.chicas.length <= 0) {
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
    this._auxiliarService.chicas.forEach(element => {
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
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.delete();
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirmDeleteByNumber(chica: DataChica) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Esta seguro que desea eliminar el ' + chica.number + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteNumber(chica);
          }
        }
      ]
    });
    alert.present();
  }

}
