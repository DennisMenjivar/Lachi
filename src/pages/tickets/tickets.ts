import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
// import { Http } from '@angular/http'; // don't forget to import HttpModule in app.module.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { DiariaControl } from '../../_models/DiariaControl.model';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
/**
 * Generated class for the TicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
})
export class TicketsPage {

  private TicketDetailPage

  miControl: DiariaControl;
  diariaControl: DiariaControl[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public _auxiliarService: AuxiliarService,
    public database: DatabaseProvider) {
    this.TicketDetailPage = TicketDetailPage;
    this.getDiariaControl();
  }

  ionViewDidEnter() {
    this._auxiliarService.totalTicket = 0;
    this.getDiariaControl();
  }


  getDiariaControl() {
    this.miControl = new DiariaControl(0, 0, '', 0, 0)
    this.diariaControl = [];
    this.database.getDiariaControlByStatus(this.miControl).then((data: DiariaControl[]) => {
      this.diariaControl = data as DiariaControl[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
    //console.log("Numeros Consolidados: ", this.consolidateNumbers());
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TicketsPage');
  }

  ticketSelected(control: DiariaControl) {
    var params = {
      pControl: control
    };
    this.navCtrl.push(this.TicketDetailPage, params);
  }

  goToSeeTicketDetail() {

  }

}
