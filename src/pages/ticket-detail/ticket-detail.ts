import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
// import { Http } from '@angular/http'; // don't forget to import HttpModule in app.module.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { DiariaControl } from '../../_models/DiariaControl.model';
import { Pedazo } from '../../_models/Pedazo.model';
import { Consolidated } from '../../_models/Consolidated.model';
/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {

  miControl: DiariaControl;
  miDetalle: DiariaDetalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);
  diariaDetalle: DiariaDetalle[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider,
    private alertCtrl: AlertController) {
    this.miControl = navParams.data.pControl;
    this.miDetalle.id_control = this.miControl.id;
    this.getDiariaDetalle();
  }

  ionViewDidLoad() {
  }

  getDiariaDetalle() {
    this.diariaDetalle = [];
    this.database.getDiariaDetalleByIdControl(this.miDetalle).then((data: DiariaDetalle[]) => {
      this.diariaDetalle = data as DiariaDetalle[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  deleteTicket() {
    let status = 0;
    this.diariaDetalle.forEach(element => {
      this.database.removeDiariaControlByID(this.miControl).then((data) => {
        this.updateStockByNumber(element.number, element.lempiras);
      });
      status == 1;
    });
    if (status = 1) {
      this.showToast("Ticket #" + this.miControl.id + " Eliminado.");
    }
  }

  updateStockByNumber(number: number, pPedazos: number) {
    let pedazo = new Pedazo(0, 0, 0, 0);
    let consolidated = new Consolidated(0, 0, '', number, pPedazos, 0, '', 0, this._auxiliarService.miClosure.id);
    this._auxiliarService.stocks.forEach(element => {
      if (number == element.number) {
        element.pedazos += pPedazos;
        pedazo.number = element.number;
        pedazo.pedazos = element.pedazos;
        this.database.editStockMinus(pedazo, consolidated).then((data) => {
        });
      }
    });
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

  presentConfirmDelete() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar Ticket',
      message: 'Esta seguro que desea eliminar?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteTicket();
            this.navCtrl.pop();
            // this.compileData(1);
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

}
