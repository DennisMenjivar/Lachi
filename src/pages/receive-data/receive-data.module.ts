import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveDataPage } from './receive-data';

@NgModule({
  declarations: [
    ReceiveDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiveDataPage),
  ],
})
export class ReceiveDataPageModule {}
