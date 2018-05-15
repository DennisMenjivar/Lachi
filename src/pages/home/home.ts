import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ClientsPage } from '../clients/clients';
import { ButtonCalculatorClass } from '../../_models/ButtonCalculatorClass.model';
import { DataChica } from '../../_models/DataChica.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private Clients

  principalText: string;
  principalButtons: ButtonCalculatorClass[];
  option: string = 'Número';

  chica: DataChica;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.chica = new DataChica(0, 0, 0, 0, '', new Date());
    this.principalText = '0'
    this.Clients = ClientsPage;
    this.loadButtons();
  }

  cleanPrincipal() {
    this.option = "Número"
    this.principalText = '0';
    this.chica.lempiras = 0;
    this.chica.number = 0;
  }

  doRefresh(refresher) {
    this.cleanPrincipal();
    refresher.complete();
  }

  loadButtons() {
    this.principalButtons = [];
    let numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];
    for (let n of numbers) {
      if (n == -1) {
        this.principalButtons.push(new ButtonCalculatorClass(n, 'AC', false));
      } else if (n == -2) {
        this.principalButtons.push(new ButtonCalculatorClass(n, '>', true));
      } else {
        this.principalButtons.push(new ButtonCalculatorClass(n, n.toString(), true));
      }
    }

  }

  goToClients() {
    var params = {
      pChica: this.chica
    };
    this.navCtrl.push(this.Clients, params);
  }

  click(pOption: ButtonCalculatorClass) {
    if (this.option == 'Lempiras') {
      if (this.principalText.length <= 5 || pOption.id == -1 || pOption.id == -2) {
        if (pOption.id == -1) {
          this.principalText = '0';
        } else if (pOption.id == -2) {
          // Si el texto principal esta en 0 que no haga nada por que no tiene un valor
          if (this.principalText == '0') {
            this.showToast('Ingrese un monto, por favor!')
          } else {
            this.chica.lempiras = parseInt(this.principalText);
            console.log("Lempiras: ", this.chica.lempiras);
            this.principalText = '0'
            this.goToClients();
          }
        } else {
          if (this.principalText == '0') {
            this.principalText = '';
          }
          this.principalText += pOption.id;
        }
      }
    } else if (this.option == 'Número') {
      if (this.principalText.length < 2 || pOption.id == -1 || pOption.id == -2) {
        if (pOption.id == -1) {
          this.principalText = '0';
        } else if (pOption.id == -2) {
          this.chica.number = parseInt(this.principalText);
          this.option = 'Lempiras';
          console.log("Numero: ", this.chica.number);

          this.principalText = '0'

        } else {
          if (this.principalText == '0') {
            this.principalText = '';
          }
          this.principalText += pOption.id;
        }
      }
    }
    else {
      // if (this.principalText == '0') {
      //   this.principalText = '';
      // }
      this.principalText += pOption.id;
    }
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
