webpackJsonp([0],{

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckinProductNewPageModule", function() { return CheckinProductNewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkin_product_new__ = __webpack_require__(545);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CheckinProductNewPageModule = /** @class */ (function () {
    function CheckinProductNewPageModule() {
    }
    CheckinProductNewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__checkin_product_new__["a" /* CheckinProductNewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__checkin_product_new__["a" /* CheckinProductNewPage */]),
            ],
        })
    ], CheckinProductNewPageModule);
    return CheckinProductNewPageModule;
}());

//# sourceMappingURL=checkin-product-new.module.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckinProductNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
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
 * Generated class for the CheckinProductNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CheckinProductNewPage = /** @class */ (function () {
    function CheckinProductNewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CheckinProductNewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CheckinProductNewPage');
    };
    CheckinProductNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-checkin-product-new',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\checkin-product-new\checkin-product-new.html"*/'<!--\n\n  Generated template for the CheckinProductNewPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>checkin-product-new</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<div class="green-box">\n\n  <h1>PRODUCT NAME <br/>\n\n  	Aisle 2 | Bay 1 | Shelf 2\n\n  </h1>\n\n</div>\n\n<ion-content style="margin-top: 100px;">\n\n\n\n<h1 style="text-align: center;font-weight: bold;">\n\n	ON-HAND: 25\n\n</h1>\n\n<h1 style="text-align: center;font-weight: bold;">\n\n	IN-TRANSIT: 10\n\n</h1>\n\n\n\n<ion-grid>\n\n  <ion-row>\n\n    <ion-col>\n\n      <button ion-button color="primary"><b>+</b></button>\n\n    </ion-col>\n\n    <ion-col>\n\n     <ion-input type="number"></ion-input>\n\n    </ion-col>\n\n    <ion-col>\n\n       <button ion-button color="primary"><b>-</b></button>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-grid>\n\n<ion-item>\n\n  <ion-label>New cost level</ion-label>\n\n  <ion-input type="number"></ion-input>\n\n</ion-item>\n\n\n\n <button ion-button (click)="addProduct()" style="height: 130px;margin-top:5px;" color="primary">SAVE</button>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\checkin-product-new\checkin-product-new.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], CheckinProductNewPage);
    return CheckinProductNewPage;
}());

//# sourceMappingURL=checkin-product-new.js.map

/***/ })

});
//# sourceMappingURL=0.js.map