import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { AuxiliarService } from '../../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../../providers/database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Closure } from '../../../_models/Closure.model';
import { HistoricalDetailPage } from '../historical-detail/historical-detail'


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

  private tickers

  closures: Closure[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public _auxiliarService: AuxiliarService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public database: DatabaseProvider, private alertCtrl: AlertController) {
    this.tickers = HistoricalDetailPage;
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

  conditionWinnigNumber(closure: Closure) {
    if (closure.winningNumber == 0) {
      this.presentConfirm(closure);
    } else {
      this.goToTickets(closure);
    }
  }

  goToTickets(closure: Closure) {
    var params = {
      pClosure: closure
    };
    this.navCtrl.push(this.tickers, params);
  }

  presentConfirm(closure: Closure) {
    let alert = this.alertCtrl.create({
      title: 'Número Ganador',
      message: 'Desea ingresar el numero ganador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.goToTickets(closure);
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.presentPrompt(closure);
          }
        }
      ]
    });
    alert.present();
  }

  presentPrompt(closure: Closure) {
    let alert = this.alertCtrl.create({
      title: 'Número Ganador',
      message: 'Ingrese el número ganador',
      inputs: [
        {
          name: 'number',
          placeholder: 'Número',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            this.goToTickets(closure);
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            closure.winningNumber = data.number;
            this.database.setWinningNumber(closure).then((data) => {
              if (data) {
                this.showToast("Número ganador ingresado.")
              }
            })
          }
        }
      ]
    });
    alert.present();
  }

  showToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 800
    });
    toast.present();
  }

}
