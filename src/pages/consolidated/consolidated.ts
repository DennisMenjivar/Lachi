import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { DatabaseProvider } from '../../providers/database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing';
import { Consolidated } from '../../_models/Consolidated.model';

@IonicPage()
@Component({
  selector: 'page-consolidated',
  templateUrl: 'consolidated.html',
})
export class ConsolidatedPage {

  miDate = new Date();
  miConsolidated: Consolidated = new Consolidated(0, 0, '', 0, 0, 0, String(this.miDate), 0, 0);
  consolidated: Consolidated[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, public _auxiliarService: AuxiliarService,
    public database: DatabaseProvider) {
    this.getConsolidated();
  }

  ionViewDidLoad() {

  }

  getConsolidated() {
    this.consolidated = [];
    this.database.getConsolidatedByStatus(this.miConsolidated).then((data: Consolidated[]) => {
      this.consolidated = data as Consolidated[];
      console.log("Consolidated: ", JSON.stringify(data));

    }, (error) => {
      console.log("Error al consultar: ", error);
    });
  }

}
