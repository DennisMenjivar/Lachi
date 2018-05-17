import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendDataPage } from './send-data';

@NgModule({
  declarations: [
    SendDataPage,
  ],
  imports: [
    IonicPageModule.forChild(SendDataPage),
  ],
})
export class SendDataPageModule {}
