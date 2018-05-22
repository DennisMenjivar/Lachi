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
import { SocialSharing } from '@ionic-native/social-sharing';
import { SendDataPage } from '../pages/send-data/send-data';
import { ControlPedazosPage } from '../pages/control-pedazos/control-pedazos';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ClientsPage,
    ReceiptViewPage,
    SendDataPage,
    ControlPedazosPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ClientsPage,
    ReceiptViewPage,
    SendDataPage,
    ControlPedazosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuxiliarService,
    SocialSharing,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider
  ]
})
export class AppModule { }
