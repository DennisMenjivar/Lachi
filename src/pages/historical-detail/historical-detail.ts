import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import { DiariaControl } from '../../_models/DiariaControl.model';
import { TicketDetailPage } from '../TicketsTodo/ticket-detail/ticket-detail';
import { Closure } from '../../_models/Closure.model';

@IonicPage()
@Component({
  selector: 'page-historical-detail',
  templateUrl: 'historical-detail.html',
})
export class HistoricalDetailPage {

  private TicketDetailPage

  miControl: DiariaControl;
  diariaControl: DiariaControl[];
  miClosure: Closure;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _auxiliarService: AuxiliarService,
    public database: DatabaseProvider) {
    this.miClosure = this.navParams.data.pClosure;
    this.TicketDetailPage = TicketDetailPage;
    this.getDiariaControl();
  }

  ionViewDidEnter() {
    this.getDiariaControl();
  }

  getTotal(): number {
    let total: number = 0;
    this.diariaControl.forEach(element => {
      total += element.total;
    });
    return total;
  }


  getDiariaControl() {
    this.diariaControl = [];
    this.database.getDiariaControlByIDClosure(this.miClosure.id).then((data: DiariaControl[]) => {
      this.diariaControl = data as DiariaControl[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  ionViewDidLoad() {

  }

  ticketSelected(control: DiariaControl) {
    var params = {
      pControl: control
    };
    this.navCtrl.push(this.TicketDetailPage, params);
  }

  goToSeeTicketDetail() {

  }

  doRefresh(refresher) {
    this.getDiariaControl();
    refresher.complete();
  }

}
