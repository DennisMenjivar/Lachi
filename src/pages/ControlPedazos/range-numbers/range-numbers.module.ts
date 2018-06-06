import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RangeNumbersPage } from './range-numbers';

@NgModule({
  declarations: [
    RangeNumbersPage,
  ],
  imports: [
    IonicPageModule.forChild(RangeNumbersPage),
  ],
})
export class RangeNumbersPageModule {}
