import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Closure } from '../../_models/Closure.model';


/**
 * Generated class for the HistoricalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historical',
  templateUrl: 'historical.html',
})
export class HistoricalPage {

  closures: Closure[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public _auxiliarService: AuxiliarService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public database: DatabaseProvider, private alertCtrl: AlertController) {
    this.getClosures();
  }

  ionViewDidLoad() {
    
  }

  getClosures() {
    this.closures = [];
    this.database.getClosures().then((data) => {
      if (data) {
        this.closures = data;
      }
    });
  }

}
