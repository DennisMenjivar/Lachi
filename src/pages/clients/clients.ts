import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Client } from '../../_models/Client.model';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  clients: Client[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadClients();
  }

  loadClients() {
    this.clients = [];
    this.clients.push(new Client(0, 'Kevin Garcia', '9897-9690', 'Col. Los Carajos.', 'kvngarcia@guarup.com'))
    this.clients.push(new Client(0, 'Melvin Melgar', '9992-7135', 'Col. Reparto los Angeles.', 'leomel@guarup.com'))
    this.clients.push(new Client(0, 'Dennis Menjivar', '9663-1616', 'Res. Los Naranjos', 'dnsmenjivar@guarup.com'))
    this.clients.push(new Client(0, 'Angie Elvir', '9897-9090', 'Tampa, Florida', 'angiemgarcia@guarup.com'))
  }

  selectedClient(client: Client) {
    this.showToast("Cliente: " + client.name);
  }

  doRefresh(refresher) {
    this.loadClients();
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
