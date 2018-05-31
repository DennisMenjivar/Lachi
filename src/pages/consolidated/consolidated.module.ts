import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsolidatedPage } from './consolidated';

@NgModule({
  declarations: [
    ConsolidatedPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsolidatedPage),
  ],
})
export class ConsolidatedPageModule {}
