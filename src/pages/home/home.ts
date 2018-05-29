import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ClientsPage } from '../clients/clients';
import { ButtonCalculatorClass } from '../../_models/ButtonCalculatorClass.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { SendDataPage } from '../send-data/send-data';
// import { RangeNumbersPage } from '../range-numbers/range-numbers';
import { Pedazo } from '../../_models/Pedazo.model';
import { DatabaseProvider } from '../../providers/database/database';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: ['home.scss']
})
export class HomePage {
  private Clients
  private SendData
  private RangeNumbers

  principalText: string;
  principalButtons: ButtonCalculatorClass[];
  option: string = 'Número';

  miDiaria: DiariaDetalle;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auxiliarService: AuxiliarService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public database: DatabaseProvider) {

    this.loadStock();
    this.miDiaria = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0);
    this.principalText = '0';
    this.Clients = ClientsPage;
    this.SendData = SendDataPage;
    this.RangeNumbers = this.RangeNumbers;
    this.loadButtons();
    _auxiliarService.diariaDetalle = [];
  }

  numberSelected: Pedazo;

  loadStock() {
    this.database.getStock().then((data: Pedazo[]) => {
      this._auxiliarService.stocks = data as Pedazo[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  getStockByNumber(pNumber: number) {
    this.numberSelected = new Pedazo(0, 0, 0);
    this._auxiliarService.stocks.forEach(element => {
      if (element.number == pNumber) {
        this.numberSelected = element;
      }
    });
  }

  validatePedazo(pPedazos: number): boolean {
    if (pPedazos <= this.numberSelected.pedazos) {
      this.updateStockByNumber(this.miDiaria.number, pPedazos);
      return true;
    }
    this.showToast("Solo tiene disponible: Lps." + this.numberSelected.pedazos + ".00 del: " + this.miDiaria.number)
    return false;
  }

  updateStockByNumber(number: number, pPedazos: number) {
    this._auxiliarService.stocks.forEach(element => {
      if (number == element.number) {
        element.pedazos -= pPedazos;
      }
    });
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
    if (this.principalText == '0' && this.option == 'Lempiras') {
      this.showToast("Ingrese un monto, porfavor!");
    } else {
      var params = {
        pDiaria: this.miDiaria
      };
      this.navCtrl.push(this.Clients, params);
    }
  }

  checkOut() {
    if (this.option == 'Número' && this._auxiliarService.diariaDetalle.length > 0) {
      this.goToClients();
      return;
    }
    if (this.principalText != '0' && this.option == 'Lempiras') {
      if (this.validatePedazo(parseInt(this.principalText))) {
        this.miDiaria.lempiras = parseInt(this.principalText);
        this._auxiliarService.diariaDetalle.push(this.miDiaria);
        this.showToast("Se agregó el número: " + this.miDiaria.number);
        console.log("Lempiras: ", this.miDiaria.lempiras);
        console.log("GoToClient: ", this.miDiaria);
        this.goToClients();
        this.principalText = '0';
        this.option = 'Número';
        this.miDiaria = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0);
      }
    } else {
      this.showToast('Ingrese un monto, por favor!');
      return;
    }
  }

  click(pOption: ButtonCalculatorClass) {
    if (this.option == 'Lempiras') {
      if (this.principalText.length <= 4 || pOption.id == -1 || pOption.id == -2) {
        if (pOption.id == -1) {
          this.principalText = '0';
        }
        else if (pOption.id == -2) {
          if (this.principalText == '0') {
            this.showToast('Ingrese un monto, por favor!');
            return;
          }
          else {
            if (this.validatePedazo(parseInt(this.principalText))) {
              this.principalButtons[11].name = '>';
              this.miDiaria.lempiras = parseInt(this.principalText);
              this._auxiliarService.diariaDetalle.push(this.miDiaria);
              this.showToast("Se agregó el número: " + this.miDiaria.number);
              this.cleanPrincipal();
            }
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
          this.principalButtons[11].name = '+';
          this.miDiaria.number = parseInt(this.principalText);
          this.getStockByNumber(this.miDiaria.number);
          this.option = 'Lempiras';
          console.log("Numero: ", this.miDiaria.number);
          this.principalText = '0';
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

  cleanPrincipal() {
    this.principalButtons[11].name = '>';
    this.option = "Número";
    this.principalText = '0';
    // this._auxiliarService.chicas = [];
    this.miDiaria = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0);
  }

  doRefresh(refresher) {
    this.cleanPrincipal();
    refresher.complete();
  }

  gotoSendData() {
    var params = {
      // pChica: this.miChica
    };
    this.navCtrl.push(this.SendData, params);
  }
}
