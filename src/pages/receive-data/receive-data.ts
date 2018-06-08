import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { DiariaControl } from '../../_models/DiariaControl.model';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
/**
 * Generated class for the ReceiveDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-data',
  templateUrl: 'receive-data.html',
})
export class ReceiveDataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public _auxiliarService: AuxiliarService) {

  }

  dataReceived: string = '';
  date: string = String(new Date());
  diariaControl: DiariaControl = new DiariaControl(0, 0, '', 0, 0);
  diariaDetalle: DiariaDetalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);

  reloadJSONDATA() {
    let datas = JSON.parse(this.dataReceived);

    this.diariaControl.id_closure = this._auxiliarService.miClosure.id;
    this.diariaControl.date = this.date;
    this.diariaControl.client = datas[0].seller;
    this.diariaControl.total = parseInt(datas[0].total);

    this.database.CreateDiariaControl(this.diariaControl).then((control) => {
      for (var d of datas) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiveDataPage');
  }

}
