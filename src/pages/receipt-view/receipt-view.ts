import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataChica } from '../../_models/DataChica.model';
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

  miChica: DataChica;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.miChica = navParams.data.pChica;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptViewPage');
  }

}
