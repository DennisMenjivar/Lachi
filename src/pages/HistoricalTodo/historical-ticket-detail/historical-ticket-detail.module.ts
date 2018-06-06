import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricalTicketDetailPage } from './historical-ticket-detail';

@NgModule({
  declarations: [
    HistoricalTicketDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricalTicketDetailPage),
  ],
})
export class HistoricalTicketDetailPageModule {}
