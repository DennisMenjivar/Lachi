import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  principalText: string = '0';
  principalButtons: ButtonCalculatorClass[];

  constructor(public navCtrl: NavController) {
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
    if (option.id == -1) {
      this.principalText = '0';
    } else if (option.id == -2) {
      // Si el texto principal esta en 0 que no haga nada por que no tiene un valor
      if (this.principalText == '0') {
        console.log("No chele no se puede");
        
      }
    } else {
      if (this.principalText == '0') {
        this.principalText = '';
      }
      this.principalText += option.id;
    }
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
