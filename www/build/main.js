webpackJsonp([5],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__receipt_view_receipt_view__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ClientsPage = /** @class */ (function () {
    function ClientsPage(navCtrl, navParams, _auxiliarService, toastCtrl, loadingCtrl, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._auxiliarService = _auxiliarService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.database = database;
        this.loader = this.loadingCtrl.create({
            content: "Cargando..."
        });
        this.miChica = navParams.data.pChica;
        this.ReceiptView = __WEBPACK_IMPORTED_MODULE_2__receipt_view_receipt_view__["a" /* ReceiptViewPage */];
    }
    ClientsPage.prototype.ionViewDidLoad = function () {
        this.getAllClients();
    };
    ClientsPage.prototype.createNewClient = function () {
        this.database.CreateClient('General', '9999-9999', 'San Pedro Sula', 'general@gmail.com').then(function (data) {
            console.log(data);
        }, function (error) {
            console.log("Error: ", error);
        });
    };
    ClientsPage.prototype.getAllClients = function () {
        var _this = this;
        this.database.getAllClients().then(function (data) {
            _this.clients = data;
            console.log("Data: ", data);
        }, function (error) {
            console.log("Error: ", error);
        });
    };
    ClientsPage.prototype.goToReceiptView = function (telephone) {
        var params = {
            pChica: this.miChica,
            pTelephone: telephone
        };
        this.navCtrl.push(this.ReceiptView, params);
    };
    ClientsPage.prototype.selectedClient = function (client) {
        // this.showToast("Cliente: " + client.name);
        this.miChica.idClient = client.id;
        this.miChica.client = client.name;
        this._auxiliarService.chicas.forEach(function (element) {
            element.id = 0; //id
            element.client = client.name;
        });
        console.log("Clients: ", this._auxiliarService.chicas);
        this.goToReceiptView(client.telephone);
    };
    ClientsPage.prototype.doRefresh = function (refresher) {
        this.getAllClients();
        refresher.complete();
    };
    ClientsPage.prototype.showToast = function (msg) {
        this.loader.dismiss();
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    ClientsPage.prototype.presentLoading = function (msg) {
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    ClientsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-clients',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/clients/clients.html"*/'<!--\n  Generated template for the ClientsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Clientes</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="createNewClient()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n\n      <!-- <button ion-button icon-only (click)="action2()">\n        <ion-icon name="trash"></ion-icon>\n      </button> -->\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <!-- <ion-list>\n    <ion-item *ngFor="let c of clients" (click)="selectedClient(c)">\n      <h2>{{c.name}}</h2>\n      <p>Tel Fijo : {{c.telephone}}</p>\n      <p>Dirección: {{c.address}}</p>\n    </ion-item>\n  </ion-list> -->\n\n\n  <ion-list *ngIf="clients">\n    <ion-item-sliding *ngFor="let client of clients">\n      <ion-item (click)="selectedClient(client)">\n        <!-- <ion-avatar item-start>\n          <img src="img/slimer.png">\n        </ion-avatar> -->\n        <h2>{{client.name}}</h2>\n        <p>Tel: {{client.telephone}}</p>\n        <p>Dirección: {{client.address}}</p>\n      </ion-item>\n      <ion-item-options side="left">\n        <button ion-button color="primary">\n          <ion-icon name="text"></ion-icon>\n          Text\n        </button>\n        <button ion-button color="secondary">\n          <ion-icon name="call"></ion-icon>\n          Call\n        </button>\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button color="primary">\n          <ion-icon name="mail"></ion-icon>\n          Email\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/clients/clients.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__lib_auxiliar_service__["a" /* AuxiliarService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */]])
    ], ClientsPage);
    return ClientsPage;
}());

//# sourceMappingURL=clients.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceiptViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//library for social-sharing

var ReceiptViewPage = /** @class */ (function () {
    function ReceiptViewPage(navCtrl, navParams, _auxiliarService, toastCtrl, loadingCtrl, database, socialSharing, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._auxiliarService = _auxiliarService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.database = database;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.loader = this.loadingCtrl.create({
            content: "Cargando..."
        });
        this.Home = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.telephone = navParams.data.pTelephone;
        this.miChica = navParams.data.pChica;
    }
    ReceiptViewPage.prototype.ionViewDidLoad = function () {
    };
    ReceiptViewPage.prototype.compileData = function (viaWhatsapp) {
        var _this = this;
        var status = 0;
        this._auxiliarService.totalDataToSendViaWhatsapp = '';
        this._auxiliarService.chicas.forEach(function (element) {
            _this.database.CreateChica(element).then(function (data) {
                status = 0;
            }, function (error) {
                status = 1;
                console.log("Error: ", error);
            });
            _this._auxiliarService.totalDataToSendViaWhatsapp += element.toStringDC();
            status = 0;
        });
        if (status == 0) {
            if (viaWhatsapp == 1) {
                this.whatsappShare(this._auxiliarService.totalDataToSendViaWhatsapp);
            }
            this.showToast("Guardado con éxito!!");
            this._auxiliarService.chicas = [];
            this.navCtrl.popToRoot();
        }
        else {
            this.showToast("ERROR al guardar.");
        }
    };
    ReceiptViewPage.prototype.delete = function () {
        this.navCtrl.popToRoot();
        this._auxiliarService.chicas = [];
        this.showToast("Todos los datos fueron eliminados!");
    };
    ReceiptViewPage.prototype.goToCreateNumber = function () {
        var params = {
            pChica: this.miChica
        };
        // this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
        // this.navCtrl.pop();
        // this.navCtrl.pop();
        // this.navCtrl.push(this.Home, params);
    };
    ReceiptViewPage.prototype.deleteNumber = function (index) {
        var miChi = this._auxiliarService.chicas.indexOf(index, 0);
        if (miChi > -1) {
            this._auxiliarService.chicas.splice(miChi, 1);
            this.showToast("Numero: " + index.number + " Eliminado!!");
        }
    };
    ReceiptViewPage.prototype.whatsappShare = function (msg) {
        // this.socialSharing.shareViaWhatsAppToReceiver(this.telephone, msg, null, null);
        this.socialSharing.shareViaWhatsApp(msg, null, null);
    };
    ReceiptViewPage.prototype.doRefresh = function (refresher) {
        refresher.complete();
    };
    ReceiptViewPage.prototype.showToast = function (msg) {
        this.loader.dismiss();
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    ReceiptViewPage.prototype.presentLoading = function (msg) {
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    ReceiptViewPage.prototype.showConfirmMessage = function () {
        this.presentConfirm("Whatsapp", "Desea enviar via Whatsapp estos datos?", "Guardar", "Enviar y Guardar");
    };
    ReceiptViewPage.prototype.presentConfirm = function (title, message, accept, cancel) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: cancel,
                    role: 'cancel',
                    handler: function () {
                        _this.compileData(1);
                    }
                },
                {
                    text: accept,
                    handler: function () {
                        _this.compileData(0);
                    }
                }
            ]
        });
        alert.present();
    };
    ReceiptViewPage.prototype.presentConfirmDeleteData = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Eliminar',
            message: 'Esta seguro que desea eliminar todo?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Eliminar',
                    handler: function () {
                        _this.delete();
                    }
                }
            ]
        });
        alert.present();
    };
    ReceiptViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-receipt-view',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/receipt-view/receipt-view.html"*/'<!--\n  Generated template for the ReceiptViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{miChica.client}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="goToCreateNumber()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n\n      <!-- <button ion-button icon-only (click)="action2()">\n          <ion-icon name="trash"></ion-icon>\n        </button> -->\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngFor="let chica of _auxiliarService.chicas; let i = index;">\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <ion-card-header style="color: tomato; font-size: 100px; margin: 0%; padding: 0%; border: 0%">\n            {{chica.number | number:\'2.0-0\'}}\n          </ion-card-header>\n          <!-- [innerHtml]=chica.lempiras  -->\n          <ion-card-content style="color: salmon; font-size: 30px; margin: 0%; padding: 0%; border: 0%">\n            {{chica.lempiras | currency:\'Lps.\':true:\'1.2-2\'}}\n            <ion-fab bottom right>\n              <button ion-fab (click)="deleteNumber(chica)" color="danger">\n                <ion-icon name="trash"></ion-icon>\n              </button>\n            </ion-fab>\n          </ion-card-content>\n          <!-- <button ion-button icon-only (click)="compileData()" color="primary" clear>\n              <ion-icon class="share-icon" name="logo-whatsapp"></ion-icon>\n            </button> -->\n        </ion-col>\n        <!-- <ion-col>\n          </ion-col> -->\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n  <button ion-button full outline (click)="showConfirmMessage()">Finalizar</button>\n  <button ion-button full outline color="danger" (click)="presentConfirmDeleteData()">Eliminar todo</button>\n</ion-content>\n<!-- \n<ion-list>\n  <ion-item-sliding *ngFor="let country of countries">\n    <ion-item>\n      <ion-card>\n          <img [src]="urlImg" (click)="show()" />\n          <ion-fab right bottom>\n              <button ion-fab (click)="edit()">\n              <ion-icon name="brush"></ion-icon>\n            </button>\n            </ion-fab>\n            <div class="card-title">Amsterdam</div>\n\n      </ion-card>\n    </ion-item>\n  </ion-item-sliding>\n</ion-list> -->'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/receipt-view/receipt-view.html"*/,
            styles: ['receipt-view.scss']
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__lib_auxiliar_service__["a" /* AuxiliarService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ReceiptViewPage);
    return ReceiptViewPage;
}());

//# sourceMappingURL=receipt-view.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPedazosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Pedazo_model__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__range_numbers_range_numbers__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ControlPedazosPage = /** @class */ (function () {
    function ControlPedazosPage(navCtrl, navParams, _auxiliarService, toastCtrl, loadingCtrl, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._auxiliarService = _auxiliarService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.database = database;
        this.loader = this.loadingCtrl.create({
            content: "Cargando..."
        });
        this.RangeNumber = __WEBPACK_IMPORTED_MODULE_5__range_numbers_range_numbers__["a" /* RangeNumbersPage */];
    }
    ControlPedazosPage.prototype.ionViewDidLoad = function () {
        this.initialize();
    };
    ControlPedazosPage.prototype.getPedazos = function () {
        var _this = this;
        this.database.getPedazos().then(function (data) {
            _this.pedazos = data;
        }, function (error) {
            console.log("Error al consultar: ", error);
        });
    };
    ControlPedazosPage.prototype.initialize = function () {
        this.getPedazos();
        if (this.pedazos.length <= 0) {
            this.createPedazos();
        }
    };
    ControlPedazosPage.prototype.goToRangeNumber = function () {
        // this.initialize();
        var params = {};
        this.navCtrl.push(this.RangeNumber, params);
    };
    ControlPedazosPage.prototype.createPedazos = function () {
        var status = false;
        var cont = 0;
        while (cont < 100) {
            var miPedazo = new __WEBPACK_IMPORTED_MODULE_0__models_Pedazo_model__["a" /* Pedazo */](0, cont, 100);
            this.database.createPedazo(miPedazo).then(function (data) {
                status = true;
            }, function (error) {
                console.log("Error al crear: ", error);
            });
            cont++;
        }
        if (status = true) {
            this.showToast("Numeros creados correctamente.");
        }
        else {
            this.showToast("Error al crear numeros.");
        }
    };
    ControlPedazosPage.prototype.doRefresh = function (refresher) {
        this.getPedazos();
        refresher.complete();
    };
    ControlPedazosPage.prototype.showToast = function (msg) {
        this.loader.dismiss();
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    ControlPedazosPage.prototype.presentLoading = function (msg) {
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    ControlPedazosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-control-pedazos',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/control-pedazos/control-pedazos.html"*/'<!--\n  Generated template for the ControlPedazosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Control Pedazos</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="goToRangeNumber()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n\n      <!-- <button ion-button icon-only (click)="action2()">\n        <ion-icon name="trash"></ion-icon>\n      </button> -->\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let ped of pedazos; let i = index;">\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <ion-card-header style="color: tomato; font-size: 100px; margin: 0%; padding: 0%; border: 0%">\n            {{ped.number | number:\'2.0-0\'}}\n          </ion-card-header>\n          <!-- [innerHtml]=chica.lempiras  -->\n          <ion-card-content style="color: salmon; font-size: 30px; margin: 0%; padding: 0%; border: 0%">{{ped.pedazos | currency:\'Lps.\':true:\'1.2-2\'}}</ion-card-content>\n          <!-- <button ion-button icon-only (click)="compileData()" color="primary" clear>\n              <ion-icon class="share-icon" name="logo-whatsapp"></ion-icon>\n            </button> -->\n        </ion-col>\n        <!-- <ion-col>\n          </ion-col> -->\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/control-pedazos/control-pedazos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__lib_auxiliar_service__["a" /* AuxiliarService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */]])
    ], ControlPedazosPage);
    return ControlPedazosPage;
}());

//# sourceMappingURL=control-pedazos.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RangeNumbersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Pedazo_model__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RangeNumbersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RangeNumbersPage = /** @class */ (function () {
    function RangeNumbersPage(navCtrl, navParams, _auxiliarService, toastCtrl, loadingCtrl, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._auxiliarService = _auxiliarService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.database = database;
        this.from = null;
        this.until = null;
        this.amount = null;
        this.loader = this.loadingCtrl.create({
            content: "Cargando..."
        });
    }
    RangeNumbersPage.prototype.createPedazos = function () {
        var _this = this;
        var status = false;
        var cont = 0;
        var _loop_1 = function () {
            var miPedazo = new __WEBPACK_IMPORTED_MODULE_0__models_Pedazo_model__["a" /* Pedazo */](0, cont, 100);
            this_1.database.createPedazo(miPedazo).then(function (data) {
                _this.database.createStock(miPedazo).then(function (data) {
                });
                status = true;
            }, function (error) {
                console.log("Error al crear: ", error);
            });
            cont++;
        };
        var this_1 = this;
        while (cont < 100) {
            _loop_1();
        }
        if (status = true) {
            this.showToast("Numeros creados correctamente.");
        }
        else {
            this.showToast("Error al crear numeros.");
        }
    };
    RangeNumbersPage.prototype.setNumbers = function () {
        if (this.from != null && this.until != null) {
            this.setNumberRange(this.from, this.until, this.amount);
        }
        else if (this.from == null) {
            this.showToast("Ingrese un rango por favor.");
        }
    };
    RangeNumbersPage.prototype.setNumberRange = function (from, until, amount) {
        var status = false;
        var cont = from;
        while (cont <= until) {
            var miPedazo = new __WEBPACK_IMPORTED_MODULE_0__models_Pedazo_model__["a" /* Pedazo */](cont, cont, amount);
            this.database.editPedazo(miPedazo).then(function (data) {
                status = true;
            }, function (error) {
                console.log("Error al crear: ", error);
            });
            cont++;
        }
        if (status = true) {
            this.showToast("Numeros editado correctamente.");
        }
        else {
            this.showToast("Error al editar numeros.");
        }
    };
    RangeNumbersPage.prototype.ionViewDidLoad = function () {
    };
    RangeNumbersPage.prototype.doRefresh = function (refresher) {
        // this.getPedazos();
        refresher.complete();
    };
    RangeNumbersPage.prototype.showToast = function (msg) {
        this.loader.dismiss();
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    RangeNumbersPage.prototype.presentLoading = function (msg) {
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    RangeNumbersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-range-numbers',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/range-numbers/range-numbers.html"*/'<!--\n  Generated template for the RangeNumbersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Editar Numeros</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="createPedazos()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n\n      <!-- <button ion-button icon-only (click)="action2()">\n            <ion-icon name="trash"></ion-icon>\n          </button> -->\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-input type="tel" min="0" max="99" [value]="from" [(ngModel)]="from" placeholder="Desde" clearInput></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-input type="tel" min="0" max="99" [value]="until" [(ngModel)]="until" placeholder="Hasta" clearInput></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-input type="tel" [value]="amount" [(ngModel)]="amount" placeholder="Cantidad" clearInput></ion-input>\n  </ion-item>\n\n  <button ion-button full outline (click)="setNumbers()" *ngIf="from != null">Finalizar</button>\n\n</ion-content>'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/range-numbers/range-numbers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__lib_auxiliar_service__["a" /* AuxiliarService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */]])
    ], RangeNumbersPage);
    return RangeNumbersPage;
}());

//# sourceMappingURL=range-numbers.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 124;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/clients/clients.module": [
		292,
		4
	],
	"../pages/control-pedazos/control-pedazos.module": [
		293,
		3
	],
	"../pages/range-numbers/range-numbers.module": [
		294,
		2
	],
	"../pages/receipt-view/receipt-view.module": [
		295,
		1
	],
	"../pages/send-data/send-data.module": [
		296,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 165;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pedazo; });
var Pedazo = /** @class */ (function () {
    function Pedazo(pId, pNumber, pPedazos) {
        this.id = pId;
        this.number = pNumber;
        this.pedazos = pPedazos;
    }
    return Pedazo;
}());

//# sourceMappingURL=Pedazo.model.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(232);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_clients_clients__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_receipt_view_receipt_view__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_send_data_send_data__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_control_pedazos_control_pedazos__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_range_numbers_range_numbers__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_toPromise__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_database_database__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_common_http__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_clients_clients__["a" /* ClientsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_receipt_view_receipt_view__["a" /* ReceiptViewPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_send_data_send_data__["a" /* SendDataPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_control_pedazos_control_pedazos__["a" /* ControlPedazosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_range_numbers_range_numbers__["a" /* RangeNumbersPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_20__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/clients/clients.module#ClientsPageModule', name: 'ClientsPage', segment: 'clients', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/control-pedazos/control-pedazos.module#ControlPedazosPageModule', name: 'ControlPedazosPage', segment: 'control-pedazos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/range-numbers/range-numbers.module#RangeNumbersPageModule', name: 'RangeNumbersPage', segment: 'range-numbers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/receipt-view/receipt-view.module#ReceiptViewPageModule', name: 'ReceiptViewPage', segment: 'receipt-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/send-data/send-data.module#SendDataPageModule', name: 'SendDataPage', segment: 'send-data', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_clients_clients__["a" /* ClientsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_receipt_view_receipt_view__["a" /* ReceiptViewPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_send_data_send_data__["a" /* SendDataPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_control_pedazos_control_pedazos__["a" /* ControlPedazosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_range_numbers_range_numbers__["a" /* RangeNumbersPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__lib_auxiliar_service__["a" /* AuxiliarService */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__["a" /* SQLite */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_database_database__["a" /* DatabaseProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonCalculatorClass; });
var ButtonCalculatorClass = /** @class */ (function () {
    function ButtonCalculatorClass(pID, pName, pEnabled) {
        this.id = pID;
        this.name = pName;
        this.enabled = pEnabled;
    }
    return ButtonCalculatorClass;
}());

//# sourceMappingURL=ButtonCalculatorClass.model.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataChica; });
var DataChica = /** @class */ (function () {
    function DataChica(pID, pLempiras, pNumber, pIdClient, pClient, pFecha, pStatus) {
        this.id = pID;
        this.lempiras = pLempiras;
        this.number = pNumber;
        this.idClient = pIdClient;
        this.client = pClient;
        this.fecha = pFecha;
        this.status = pStatus;
    }
    DataChica.prototype.toStringDC = function () {
        return String(this.id) + " - " + String(this.number) + " - " + String(this.lempiras) + " - " + this.client + "\n";
    };
    return DataChica;
}());

//# sourceMappingURL=DataChica.model.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_send_data_send_data__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_control_pedazos_control_pedazos__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Principal', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Enviar Datos', component: __WEBPACK_IMPORTED_MODULE_5__pages_send_data_send_data__["a" /* SendDataPage */] },
            { title: 'Configurar Números', component: __WEBPACK_IMPORTED_MODULE_6__pages_control_pedazos_control_pedazos__["a" /* ControlPedazosPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuxiliarService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuxiliarService = /** @class */ (function () {
    function AuxiliarService(_http) {
        this._http = _http;
        this.totalDataToSendViaWhatsapp = '';
    }
    //  current_api: string = "http://creaxisapi.creaxis.xyz/";
    //current_api: string = "http://localhost:8081/";
    //current_api: string = "http://localhost:56782/";
    /* Funciones para Interaccion con Web API */
    AuxiliarService.prototype.objectToParams = function (f) {
        var tparams = new URLSearchParams();
        for (var key in f) {
            if (f.hasOwnProperty(key)) {
                var val = f[key];
                tparams.set(key, val);
            }
        }
        return tparams;
    };
    AuxiliarService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AuxiliarService);
    return AuxiliarService;
}());

//# sourceMappingURL=auxiliar.service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(platform, http, sqlite) {
        this.platform = platform;
        this.http = http;
        this.sqlite = sqlite;
        this.dbReady = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.createDataBase();
    }
    DatabaseProvider.prototype.createDataBase = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.sqlite.create({
                name: 'Lachi.db',
                location: 'default'
            })
                .then(function (db) {
                _this.database = db;
                _this.createTables().then(function () {
                    //communicate we are ready!
                    _this.dbReady.next(true);
                });
            });
        });
    };
    DatabaseProvider.prototype.createTables = function () {
        var _this = this;
        return this.database.executeSql("CREATE TABLE IF NOT EXISTS clients \n    (id INTEGER PRIMARY KEY AUTOINCREMENT\n      , name TEXT, telephone TEXT\n      , address TEXT\n      , email TEXT);", {})
            .then(function () {
            return _this.database.executeSql("CREATE TABLE IF NOT EXISTS chicas \n          (id INTEGER PRIMARY KEY AUTOINCREMENT\n            , lempiras INTEGER\n            , number INTEGER\n            , idClient INTEGER\n            , client TEXT\n            , fecha TEXT\n            , status INTEGER);", {})
                .then(function () {
                return _this.database.executeSql("CREATE TABLE IF NOT EXISTS pedazos \n                (id INTEGER PRIMARY KEY AUTOINCREMENT\n                  ,number INTEGER\n                  , pedazos INTEGER);", {});
            }).then(function () {
                return _this.database.executeSql("CREATE TABLE IF NOT EXISTS stocktaking \n                  (id INTEGER PRIMARY KEY AUTOINCREMENT\n                  ,number INTEGER\n                  , pedazos INTEGER);", {});
            });
        })
            .catch(function (err) { return console.log("Error detected creating tables", err); });
    };
    DatabaseProvider.prototype.isReady = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //if dbReady is true, resolve
            if (_this.dbReady.getValue()) {
                resolve();
            }
            else {
                _this.dbReady.subscribe(function (ready) {
                    if (ready) {
                        resolve();
                    }
                });
            }
        });
    };
    DatabaseProvider.prototype.createStock = function (pedazo) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("INSERT INTO stocktaking (number, pedazos) VALUES (" + pedazo.number + "," + pedazo.pedazos + ");", {}).then(function (result) {
                if (result.insertId) {
                    console.log("Data a Guardar: ", result);
                    return _this.getStockById(result.insertId);
                }
            });
        });
    };
    DatabaseProvider.prototype.editStock = function (pedazo) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("UPDATE stocktaking SET pedazos = ? WHERE number = ?", [pedazo.pedazos, pedazo.number]).then(function (result) {
                if (result.insertId) {
                    console.log("Data a Editar: ", result);
                    return _this.getListChicas(result.insertId);
                }
            });
        });
    };
    DatabaseProvider.prototype.getStockById = function (number) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM stocktaking WHERE number = " + number, [])
                .then(function (data) {
                if (data.rows.length) {
                    return data.rows.item(0);
                }
                return null;
            });
        });
    };
    DatabaseProvider.prototype.createPedazo = function (pedazo) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("INSERT INTO pedazos (number, pedazos) VALUES (" + pedazo.number + "," + pedazo.pedazos + ");", {}).then(function (result) {
                if (result.insertId) {
                    console.log("Data a Guardar: ", result);
                    return _this.getListPedazos(result.insertId);
                }
            });
        });
    };
    DatabaseProvider.prototype.getListPedazos = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM pedazos WHERE id = " + id, [])
                .then(function (data) {
                if (data.rows.length) {
                    return data.rows.item(0);
                }
                return null;
            });
        });
    };
    DatabaseProvider.prototype.editPedazo = function (pedazo) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("UPDATE pedazos SET number = ?, pedazos = ? WHERE number = ?", [pedazo.number, pedazo.pedazos, pedazo.number]).then(function (result) {
                if (result.insertId) {
                    console.log("Data a Editar: ", result);
                    return _this.getListChicas(result.insertId);
                }
            });
        });
    };
    DatabaseProvider.prototype.getPedazos = function () {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM pedazos", [])
                .then(function (data) {
                var lists = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        lists.push({
                            number: data.rows.item(i).number,
                            pedazos: data.rows.item(i).pedazos
                        });
                    }
                }
                return lists;
            });
        });
    };
    DatabaseProvider.prototype.getPedazosById = function (number) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM pedazos WHERE number = " + number, [])
                .then(function (data) {
                var lists = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        lists.push({
                            number: data.rows.item(i).number,
                            pedazos: data.rows.item(i).pedazos
                        });
                    }
                }
                return lists;
            });
        });
    };
    DatabaseProvider.prototype.getChicaById = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM chicas WHERE id = " + id, [])
                .then(function (data) {
                var lists = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        lists.push({
                            id: data.rows.item(i).id,
                            lempiras: data.rows.item(i).lempiras,
                            number: data.rows.item(i).number,
                            idClient: data.rows.item(i).idClient,
                            client: data.rows.item(i).client,
                            fecha: data.rows.item(i).fecha,
                            status: data.rows.item(i).status
                        });
                    }
                }
                return lists;
            });
        });
    };
    DatabaseProvider.prototype.CreateChica = function (chica) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("INSERT INTO chicas (number, lempiras, idClient, client, fecha, status) VALUES ('" + chica.number + "','" + chica.lempiras + "','" + chica.idClient + "','" + chica.client + "','" + chica.fecha + "','" + chica.status + "');", {}).then(function (result) {
                if (result.insertId) {
                    return _this.getListChicas(result.insertId);
                }
            });
        });
    };
    DatabaseProvider.prototype.getListChicas = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM chicas WHERE id = " + id, [])
                .then(function (data) {
                if (data.rows.length) {
                    return data.rows.item(0);
                }
                return null;
            });
        });
    };
    DatabaseProvider.prototype.removeChica = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("DELETE FROM chicas WHERE id = " + id, []);
        });
    };
    DatabaseProvider.prototype.getChicas = function () {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM chicas", [])
                .then(function (data) {
                var lists = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        lists.push({
                            id: data.rows.item(i).id,
                            lempiras: data.rows.item(i).lempiras,
                            number: data.rows.item(i).number,
                            idClient: data.rows.item(i).idClient,
                            client: data.rows.item(i).client,
                            fecha: data.rows.item(i).fecha,
                            status: data.rows.item(i).status
                        });
                    }
                }
                return lists;
            });
        });
    };
    DatabaseProvider.prototype.getAllClients = function () {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM clients", [])
                .then(function (data) {
                var lists = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        lists.push({
                            id: data.rows.item(i).id,
                            name: data.rows.item(i).name,
                            telephone: data.rows.item(i).telephone,
                            address: data.rows.item(i).address,
                            email: data.rows.item(i).email
                        });
                    }
                }
                return lists;
            });
        });
    };
    DatabaseProvider.prototype.CreateClient = function (name, telephone, address, email) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("INSERT INTO clients (name, telephone, address, email) VALUES ('" + name + "','" + telephone + "','" + address + "','" + email + "');", {}).then(function (result) {
                if (result.insertId) {
                    return _this.getList(result.insertId);
                }
            });
        });
    };
    DatabaseProvider.prototype.getList = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM clients WHERE id = " + id, [])
                .then(function (data) {
                if (data.rows.length) {
                    return data.rows.item(0);
                }
                return null;
            });
        });
    };
    DatabaseProvider.prototype.deleteList = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("DELETE FROM clients WHERE id = " + id, []);
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Http } from '@angular/http'; // don't forget to import HttpModule in app.module.ts


//library for social-sharing

var SendDataPage = /** @class */ (function () {
    function SendDataPage(navCtrl, navParams, socialSharing, _auxiliarService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this._auxiliarService = _auxiliarService;
    }
    SendDataPage.prototype.compileData = function () {
        var totalData = '';
        this._auxiliarService.chicas.forEach(function (element) {
            totalData += element.toStringDC();
        });
        this.whatsappShare(totalData);
    };
    SendDataPage.prototype.whatsappShare = function (msg) {
        this.socialSharing.shareViaWhatsApp(msg, null, null);
    };
    SendDataPage.prototype.ionViewDidLoad = function () {
    };
    SendDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-send-data',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/send-data/send-data.html"*/'<!--\n  Generated template for the SendDataPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Enviar Datos</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="compileData()">\n        <ion-icon class="share-icon" name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngFor="let chica of _auxiliarService.chicas; let i = index;">\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <ion-card-header style="color: tomato; font-size: 100px; margin: 0%; padding: 0%; border: 0%">\n            {{chica.number}}\n          </ion-card-header>\n          <!-- [innerHtml]=chica.lempiras  -->\n          <ion-card-content style="color: salmon; font-size: 30px; margin: 0%; padding: 0%; border: 0%">{{chica.lempiras | currency:\'Lps.\':true:\'1.2-2\'}}</ion-card-content>\n          <!-- <button ion-button icon-only (click)="compileData()" color="primary" clear>\n            <ion-icon class="share-icon" name="logo-whatsapp"></ion-icon>\n          </button> -->\n        </ion-col>\n        <!-- <ion-col>\n        </ion-col> -->\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/send-data/send-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_2__lib_auxiliar_service__["a" /* AuxiliarService */]])
    ], SendDataPage);
    return SendDataPage;
}());

//# sourceMappingURL=send-data.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__clients_clients__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ButtonCalculatorClass_model__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_DataChica_model__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_auxiliar_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__send_data_send_data__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, _auxiliarService, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._auxiliarService = _auxiliarService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.option = 'Número';
        this.loader = this.loadingCtrl.create({
            content: "Cargando..."
        });
        this.miChica = new __WEBPACK_IMPORTED_MODULE_4__models_DataChica_model__["a" /* DataChica */](0, 0, 0, 0, '', new Date(), 0);
        this.principalText = '0';
        this.Clients = __WEBPACK_IMPORTED_MODULE_2__clients_clients__["a" /* ClientsPage */];
        this.SendData = __WEBPACK_IMPORTED_MODULE_6__send_data_send_data__["a" /* SendDataPage */];
        this.RangeNumbers = this.RangeNumbers;
        this.loadButtons();
        _auxiliarService.chicas = [];
    }
    HomePage.prototype.createNewNumber = function () {
        if (this.principalText == '0') {
            this.showToast('Ingrese un monto, por favor!');
        }
        else {
            this.miChica.lempiras = parseInt(this.principalText);
            this._auxiliarService.chicas.push(this.miChica);
        }
        console.log("CreateNewNumber: ", this.miChica);
        this.cleanPrincipal();
    };
    HomePage.prototype.gotoSendData = function () {
        var params = {};
        this.navCtrl.push(this.SendData, params);
    };
    HomePage.prototype.cleanPrincipal = function () {
        this.option = "Número";
        this.principalText = '0';
        // this._auxiliarService.chicas = [];
        this.miChica = new __WEBPACK_IMPORTED_MODULE_4__models_DataChica_model__["a" /* DataChica */](0, 0, 0, 0, '', new Date(), 0);
    };
    HomePage.prototype.doRefresh = function (refresher) {
        this.cleanPrincipal();
        refresher.complete();
    };
    HomePage.prototype.loadButtons = function () {
        this.principalButtons = [];
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];
        for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
            var n = numbers_1[_i];
            if (n == -1) {
                this.principalButtons.push(new __WEBPACK_IMPORTED_MODULE_3__models_ButtonCalculatorClass_model__["a" /* ButtonCalculatorClass */](n, 'AC', false));
            }
            else if (n == -2) {
                this.principalButtons.push(new __WEBPACK_IMPORTED_MODULE_3__models_ButtonCalculatorClass_model__["a" /* ButtonCalculatorClass */](n, '>', true));
            }
            else {
                this.principalButtons.push(new __WEBPACK_IMPORTED_MODULE_3__models_ButtonCalculatorClass_model__["a" /* ButtonCalculatorClass */](n, n.toString(), true));
            }
        }
    };
    HomePage.prototype.goToClients = function () {
        if (this.miChica.lempiras == 0) {
            this.showToast("Ingrese un monto, porfavor!");
        }
        else {
            var params = {
                pChica: this.miChica
            };
            this.navCtrl.push(this.Clients, params);
        }
    };
    HomePage.prototype.click = function (pOption) {
        if (this.option == 'Lempiras') {
            if (this.principalText.length <= 4 || pOption.id == -1 || pOption.id == -2) {
                if (pOption.id == -1) {
                    this.principalText = '0';
                }
                else if (pOption.id == -2) {
                    this.miChica.lempiras = parseInt(this.principalText);
                    this._auxiliarService.chicas.push(this.miChica);
                    console.log("Lempiras: ", this.miChica.lempiras);
                    console.log("GoToClient: ", this.miChica);
                    this.goToClients();
                    this.principalText = '0';
                    this.option = 'Número';
                    this.miChica = new __WEBPACK_IMPORTED_MODULE_4__models_DataChica_model__["a" /* DataChica */](0, 0, 0, 0, '', new Date(), 0);
                }
                else {
                    if (this.principalText == '0') {
                        this.principalText = '';
                    }
                    this.principalText += pOption.id;
                }
            }
        }
        else if (this.option == 'Número') {
            if (this.principalText.length < 2 || pOption.id == -1 || pOption.id == -2) {
                if (pOption.id == -1) {
                    this.principalText = '0';
                }
                else if (pOption.id == -2) {
                    this.miChica.number = parseInt(this.principalText);
                    this.option = 'Lempiras';
                    console.log("Numero: ", this.miChica.number);
                    this.principalText = '0';
                }
                else {
                    if (this.principalText == '0') {
                        this.principalText = '';
                    }
                    this.principalText += pOption.id;
                }
            }
        }
        else {
            this.principalText += pOption.id;
        }
    };
    HomePage.prototype.showToast = function (msg) {
        this.loader.dismiss();
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    HomePage.prototype.presentLoading = function (msg) {
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/dennismenjivar/Documents/Lachi/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Lachi</ion-title>\n    <ion-buttons end *ngIf="option == \'Lempiras\'">\n      <button ion-button icon-only (click)="createNewNumber()">\n        <!-- (click)="createNewClient()" -->\n        {{_auxiliarService.chicas.length}}\n        <ion-icon name="add"></ion-icon>\n      </button>\n      <!-- <button ion-button icon-only (click)="action2()">\n        <ion-icon name="trash"></ion-icon>\n      </button> -->\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="padding: 0%; margin: 0%; border: 0%;  width: 100%; height: 100%">\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div class="container" style="height: 20%; padding: 0%; margin: 0%; border: 0%">\n    <h1 style="width: 100%; text-align: center;color: tomato; vertical-align: center; padding: 0%; margin: 0%; border: 0%">{{principalText | number : \'1.0-0\'}}</h1>\n  </div>\n  <h5 style="text-align: center;color: tomato">{{option}}</h5>\n  <div class="container" style="margin: 0%; border: 0%; padding: 0%; width: 100%; height: 55%">\n    <div class="row" style="width: 100%; height: 100%">\n      <div class="col-4" *ngFor="let b of principalButtons" style="width: 33.33%; margin: 0%; padding: 0%; border: 0%">\n        <button (click)="click(b)" large ion-button style="width: 100%; margin: 0%; padding: 0%; border: 0%;height: 100%; background-color: transparent; color: tomato">{{b.name}}</button>\n      </div>\n    </div>\n  </div>\n  <!-- <button (click)="gotoSendData()" large ion-button style="width: 100%; margin: 0%; padding: 0%; border: 0%;height: 100%; background-color: transparent; color: tomato">Send Data</button> -->\n</ion-content>'/*ion-inline-end:"/Users/dennismenjivar/Documents/Lachi/src/pages/home/home.html"*/,
            styles: ['home.scss']
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__lib_auxiliar_service__["a" /* AuxiliarService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map