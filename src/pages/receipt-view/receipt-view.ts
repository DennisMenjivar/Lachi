import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataChica } from '../../_models/DataChica.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { HomePage } from '../home/home';
/**
 * Generated class for the ReceiptViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-view',
  templateUrl: 'receipt-view.html',
})
export class ReceiptViewPage {

  private Home
  miChica: DataChica;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.Home = HomePage;
    this.miChica = navParams.data.pChica;
  }

  ionViewDidLoad() {
    
  }

  goToCreateNumber() {
    var params = {
      pChica: this.miChica
    };
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot()
    // this.navCtrl.pop();
    // this.navCtrl.pop();
    // this.navCtrl.push(this.Home, params);
  }

}
