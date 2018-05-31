import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Client } from '../../_models/Client.model';
import { ReceiptViewPage } from '../receipt-view/receipt-view';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  private ReceiptView

  clients: any;
  miDiaria: DiariaDetalle;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider) {
    this.miDiaria = navParams.data.pDiaria;
    this.ReceiptView = ReceiptViewPage;
  }

  ionViewDidLoad() {
    this.getAllClients();
  }

  createNewClient() {
    this.database.CreateClient('General', '9999-9999', 'San Pedro Sula', 'general@gmail.com').then((data) => {
      // console.log(data);
    }, (error) => {
      console.log("Error: ", error);
    })
  }

  getAllClients() {
    this.database.getAllClients().then((data: any) => {
      this.clients = data;
      // console.log("Data: ", data);
    }, (error) => {
      console.log("Error: ", error);
    });
  }

  goToReceiptView(telephone: string) {
    var params = {
      pDiaria: this.miDiaria,
      pTelephone: telephone
    };
    this.navCtrl.push(this.ReceiptView, params);
  }

  selectedClient(client: Client) {
    // this.showToast("Cliente: " + client.name);
    this.miDiaria.id_client = client.id;
    this.miDiaria.client = client.name;
    this._auxiliarService.diariaDetalle.forEach(element => {
      element.id_client = client.id; //id
      element.client = client.name;
    });
    // console.log("Clients: ", this._auxiliarService.diariaDetalle);
    this.goToReceiptView(client.telephone);
  }

  doRefresh(refresher) {
    this.getAllClients();
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
