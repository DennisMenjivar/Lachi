import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { DiariaControl } from '../../_models/DiariaControl.model';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { Closure } from '../../_models/Closure.model';
import { ToastController, AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { PopoverDataReceivedComponent } from '../../components/popover-data-received/popover-data-received';

@IonicPage()
@Component({
  selector: 'page-receive-data',
  templateUrl: 'receive-data.html',
  styles: ['receive-data.scss']
})
export class ReceiveDataPage {

  constructor(public popoverCtrl: PopoverController, private clipboard: Clipboard, public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public _auxiliarService: AuxiliarService, public toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.closure();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverDataReceivedComponent, { datas: this.datas });
    popover.present({
      ev: myEvent
    });
  }

  paste() {
    this.clipboard.paste().then(
      (resolve: string) => {
        this.dataReceived = resolve;
        this.datas = JSON.parse(resolve);
      },
      (reject: string) => {
        alert('Error: ' + reject);
      }
    );
  }

  validateFormat(): boolean {
    if (this.dataReceived.indexOf('[{') > -1 && this.dataReceived.indexOf('}]') > -1) {
      return true;
    }
    return false;
  }

  dataReceived: string = '';
  date: string = String(new Date());
  diariaControl: DiariaControl = new DiariaControl(0, 0, '', 0, 0);
  diariaDetalle: DiariaDetalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);

  datas: any;
  reloadJSONDATA() {
    if (this.validateFormat()) {
      this.datas = JSON.parse(this.dataReceived);
      this.diariaControl.id_closure = this._auxiliarService.miClosure.id;
      this.diariaControl.date = this.date;
      this.diariaControl.client = this.datas[0].seller;
      this.diariaControl.total = this.datas[0].total;

      this.database.CreateDiariaControl(this.diariaControl).then((control) => {
        for (var d of this.datas) {
          this.diariaDetalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);
          this.diariaDetalle.id_closure = this._auxiliarService.miClosure.id;
          this.diariaDetalle.number = d.number;
          this.diariaDetalle.lempiras = d.lempiras;
          this.diariaDetalle.client = d.seller;
          this.diariaDetalle.id_control = control.id;
          this.diariaDetalle.date = this.date;
          this.database.CreateFastDiariaDetalle(this.diariaDetalle);
          console.log("Consolidado: ", d.number, " - ", d.lempiras);
        }
      });
      this.dataReceived = '';
      this.showToast("Datos ingresados correctamente!");
    } else {
      this.showToast("Formato Incorrecto!");
    }
  }

  closure() {
    this.database.getClosureID().then((data: Closure) => {
      if (data) {
        this._auxiliarService.closureStatus = true;
        this._auxiliarService.miClosure = data as Closure;
      } else {
        this.presentConfirmCreateClosure();
      }
    });
  }

  presentConfirmCreateClosure() {
    let miDate = new Date();
    this._auxiliarService.miClosure.date = String(miDate);
    this._auxiliarService.miClosure.status = 0;

    let alert = this.alertCtrl.create({
      title: "Apertura",
      message: "Que Jornada desea Configurar?",
      buttons: [
        {
          text: "Mañana",
          handler: () => {
            this._auxiliarService.miClosure.description = "Mañana";
            this.createClosure();
          }
        },
        {
          text: 'Tarde',
          handler: () => {
            this._auxiliarService.miClosure.description = "Tarde";
            this.createClosure();
          }
        },
        {
          text: 'Noche',
          handler: () => {
            this._auxiliarService.miClosure.description = "Noche"
            this.createClosure();
          }
        }
        , {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.presentConfirmCreateClosure();
          }
        }
      ]
    });
    alert.present();
  }

  createClosure() {
    this.database.createClosure(this._auxiliarService.miClosure).then((data) => {
      if (data) {
        this._auxiliarService.miClosure = data as Closure;
        this._auxiliarService.closureStatus = true;
        this.showToast("Jornada " + data.description + " creada correctamente." + " #" + data.id)
      }
    })
  }

  ionViewDidLoad() {
  }

  showToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 600
    });
    toast.present();
  }
  doRefresh(refresher) {
    this.datas = null;
    this.dataReceived = '';
    refresher.complete();
  }

}
