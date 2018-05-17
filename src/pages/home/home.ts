import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ClientsPage } from '../clients/clients';
import { ButtonCalculatorClass } from '../../_models/ButtonCalculatorClass.model';
import { DataChica } from '../../_models/DataChica.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private Clients

  principalText: string;
  principalButtons: ButtonCalculatorClass[];
  option: string = 'Número';

  miChica: DataChica;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.miChica = new DataChica(0, 0, 0, 0, '', new Date());
    this.principalText = '0'
    this.Clients = ClientsPage;
    this.loadButtons();
    _auxiliarService.chicas = [];
  }

  createNewNumber() {
    this._auxiliarService.chicas.push(this.miChica);
    this.cleanPrincipal();
  }

  cleanPrincipal() {
    this.option = "Número"
    this.principalText = '0';
    this._auxiliarService.chicas = [];
    this.miChica = new DataChica(0, 0, 0, 0, '', new Date());
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
    if (this.miChica.lempiras == 0) {
      this.showToast("Ingrese un monto, porfavor!")
    } else {
      var params = {
        pChica: this.miChica
      };
      this.navCtrl.push(this.Clients, params);
    }
  }

  click(pOption: ButtonCalculatorClass) {
    if (this.option == 'Lempiras') {
      if (this.principalText.length <= 5 || pOption.id == -1 || pOption.id == -2) {
        if (pOption.id == -1) {
          this.principalText = '0';
        }
        else if (pOption.id == -2) {
          // Si el texto principal esta en 0 que no haga nada por que no tiene un valor
          if (this.principalText == '0') {
            this.showToast('Ingrese un monto, por favor!')
          }
          else {
            this.miChica.lempiras = parseInt(this.principalText);
            this._auxiliarService.chicas.push(this.miChica);
            console.log("Lempiras: ", this.miChica.lempiras);
            this.principalText = '0'
            this.goToClients();
          }
        }
        else {
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
          this.miChica.number = parseInt(this.principalText);
          this._auxiliarService.chicas.push(this.miChica);
          this.option = 'Lempiras';
          console.log("Numero: ", this.miChica.number);
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
