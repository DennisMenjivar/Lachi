import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricalDetailPage } from './historical-detail';

@NgModule({
  declarations: [
    HistoricalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricalDetailPage),
  ],
})
export class HistoricalDetailPageModule {}
