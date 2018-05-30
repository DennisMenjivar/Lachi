import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
// import { Http } from '@angular/http'; // don't forget to import HttpModule in app.module.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { DiariaControl } from '../../_models/DiariaControl.model';
/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {

  miControl: DiariaControl;
  miDetalle: DiariaDetalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);
  diariaDetalle: DiariaDetalle[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, public _auxiliarService: AuxiliarService,
    public database: DatabaseProvider) {
    this.miControl = navParams.data.pControl;
    this.miDetalle.id_control = this.miControl.id;
    this.getDiariaDetalle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketDetailPage');
  }

  getDiariaDetalle() {
    this.diariaDetalle = [];
    this.database.getDiariaDetalleByIdControl(this.miDetalle).then((data: DiariaDetalle[]) => {
      this.diariaDetalle = data as DiariaDetalle[];
    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

  presentConfirmDeleteByNumber(diaria: DiariaDetalle) {

  }

}
