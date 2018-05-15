import { Component } from '@angular/core';
import { NavController, NavParams, Toast, LoadingController, Button } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  principalText: string = '0';
  principalButtons: ButtonCalculatorClass[];
  option: string = 'Lempiras'

  lempiras: number = 0;
  pedazos: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.loadButtons();
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

  click(option: ButtonCalculatorClass) {
    if (this.principalText.length < 5 || option.id == -1 || option.id == -2) {
      if (option.id == -1) {
        this.principalText = '0';
      } else if (option.id == -2) {
        // Si el texto principal esta en 0 que no haga nada por que no tiene un valor
        if (this.principalText == '0') {
          this.showToast('Ingrese un monto, por favor!')
        } else {
          if (this.option == 'Lempiras') {
            this.lempiras = parseInt(this.principalText);
            this.option = 'Pedazos';
            this.principalText = '0'
            console.log("Lempiras: ", this.lempiras);
          } else if (this.option == 'Pedazos') {
            this.pedazos = parseInt(this.principalText);
            this.principalText = '0'
            console.log("Pedazos: ", this.pedazos);
          }
        }
      } else {
        if (this.principalText == '0') {
          this.principalText = '';
        }
        this.principalText += option.id;
      }
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

export class ButtonCalculatorClass {
  id: number;
  name: string;
  enabled: boolean;

  constructor(pID: number, pName: string, pEnabled: any) {
    this.id = pID;
    this.name = pName;
    this.enabled = pEnabled;
  }
}
