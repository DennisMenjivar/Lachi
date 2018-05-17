import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClientsPage } from '../pages/clients/clients'
import { ReceiptViewPage } from '../pages/receipt-view/receipt-view';
import { AuxiliarService } from '../_lib/auxiliar.service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ClientsPage,
    ReceiptViewPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ClientsPage,
    ReceiptViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuxiliarService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
