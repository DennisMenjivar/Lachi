import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptViewPage } from './receipt-view';

@NgModule({
  declarations: [
    ReceiptViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptViewPage),
  ],
})
export class ReceiptViewPageModule {}
