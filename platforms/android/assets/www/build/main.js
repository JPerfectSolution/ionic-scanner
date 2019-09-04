webpackJsonp([1],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesmanDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_order_search_new_order_search__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__salesman_choose_route_salesman_choose_route__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(67);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the SalesmanDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SalesmanDashboardPage = /** @class */ (function (_super) {
    __extends(SalesmanDashboardPage, _super);
    function SalesmanDashboardPage(japi, navCtrl, navParams, napi, geolocation) {
        var _this = _super.call(this) || this;
        _this.japi = japi;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.napi = napi;
        _this.geolocation = geolocation;
        _this.type = 'line';
        _this.loading = false;
        _this.selRange = "24 HRS";
        _this.currentDate = "";
        _this.total = 0;
        _this.startDate = new Date();
        _this.endDate = new Date(_this.startDate.getTime() - (84600 * 1000));
        _this.customers = 0;
        _this.name = "";
        _this.data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Sales",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: true,
                    pointRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderColor: '#fff',
                    pointBackgroundColor: '#fff'
                }
            ]
        };
        _this.options = {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                        display: true,
                        position: 'right',
                        ticks: {
                            fontColor: '#fff',
                            fontSize: 11,
                            beginAtZero: true,
                            callback: function (value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }],
                xAxes: [{
                        ticks: {
                            fontSize: 8,
                            display: false,
                        }
                    }]
            }
        };
        _this.japi.http.get(_this.japi.URL + "customers", _this.japi.httpOptions)
            .subscribe(function (res) {
            _this.customers = res.data.length;
        });
        japi.storage
            .get("email")
            .then(function (email) {
            _this.email = email;
            _this.updateValDisp();
        });
        return _this;
    }
    SalesmanDashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalesmanDashboardPage');
        this.dateRange = "24";
    };
    SalesmanDashboardPage.prototype.newOrder = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_order_search_new_order_search__["a" /* NewOrderSearchPage */], { action: 0 });
    };
    SalesmanDashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var d = new Date();
        this.currentDate = d.toLocaleString();
        if (this.email)
            this.updateValDisp();
        this.japi.storage.get("name")
            .then(function (data) {
            _this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    SalesmanDashboardPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            _this.napi.checkOnActiveRoute(resp.coords);
        }).catch(function (error) {
            console.log('Error getting location', JSON.stringify(error));
        });
    };
    SalesmanDashboardPage.prototype.updateValDisp = function () {
        var range = parseInt(this.dateRange);
        if (range == 24) {
            this.endDate = new Date(this.startDate.getTime() - (84600 * 1000));
            this.selRange = "24 HRS";
        }
        if (range == 30) {
            this.endDate = new Date(this.startDate.getTime() - (30 * 84600 * 1000));
            this.selRange = "1 Month";
        }
        if (range == 1) {
            this.endDate = new Date(this.startDate.getTime() - (7 * 84600 * 1000));
            this.selRange = "1 Week";
        }
        this.updateChart();
    };
    SalesmanDashboardPage.prototype.updateChart = function () {
        var _this = this;
        this.loading = true;
        var query = { fields: ["total", "taxValue"], start: this.startDate, end: this.endDate, owner: this.email };
        this.japi.http.post(this.japi.URL + "sale_stats", query, this.japi.httpOptions)
            .subscribe(function (res) {
            if (!res.success) {
                console.log(res);
                return;
            }
            _this.data.labels = res.data.labels;
            _this.data.datasets[0].data = res.data.set;
            _this.loading = false;
            _this.getTotal(res.data.set);
        });
    };
    SalesmanDashboardPage.prototype.getTotal = function (dataset) {
        this.total = 0;
        for (var i = dataset.length - 1; i >= 0; i--) {
            var data = dataset[i];
            this.total += parseFloat(data);
        }
        this.total = parseFloat(this.total.toFixed(2));
    };
    SalesmanDashboardPage.prototype.showOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_order_search_new_order_search__["a" /* NewOrderSearchPage */], { action: 1 });
    };
    SalesmanDashboardPage.prototype.showRoutes = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__salesman_choose_route_salesman_choose_route__["a" /* SalesmanChooseRoutePage */], {});
    };
    SalesmanDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-salesman-dashboard',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-dashboard\salesman-dashboard.html"*/'<!--\n\n  Generated template for the SalesmanDashboardPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<core-toolbar></core-toolbar>\n\n<div style="padding-top: 2px;" class="green-box">\n\n  <h1>Welcome {{ name }},<br>\n\n   <span>{{currentDate}}</span>\n\n    </h1>\n\n</div>\n\n<ion-content no-bounce class="sm-pad-top" padding>\n\n  <ion-chip style="width: 100%; text-align: center;">\n\n    <ion-icon name="stats" color="primary"></ion-icon>\n\n    <ion-label>SALES {{ selRange }} | CUSTOMERS {{ customers }}</ion-label>\n\n  </ion-chip>\n\n  <h3 style="text-align: center;padding-top: 5px;">{{ total.toLocaleString() }} USD</h3>\n\n  <div class="card" style="margin:10px;background-color: red;">\n\n    <p *ngIf="loading">Loading...</p>\n\n    <div *ngIf="!loading">\n\n      <chart [type]="type" [data]="data" [options]="options"></chart>\n\n    </div>\n\n  </div>\n\n  <ion-segment (ionChange)="updateValDisp()" color="dark" [(ngModel)]="dateRange">\n\n    <ion-segment-button value="24">\n\n      24 Hours\n\n    </ion-segment-button>\n\n    <ion-segment-button value="1">\n\n      1 Week\n\n    </ion-segment-button>\n\n    <ion-segment-button value="30">\n\n      1 Month\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n  <button ion-button (click)="showOrders()" color="dark">Search past orders</button>\n\n  <br>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-6>\n\n        <button ion-button (click)="showRoutes()" color="dark">Show routes</button>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <button ion-button (click)="newOrder()" color="danger">New order</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-dashboard\salesman-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */]])
    ], SalesmanDashboardPage);
    return SalesmanDashboardPage;
}(__WEBPACK_IMPORTED_MODULE_6__net_controller__["a" /* NetController */]));

//# sourceMappingURL=salesman-dashboard.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewOrderSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__salesman_choose_route_salesman_choose_route__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customer_profile_customer_profile__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__salesman_customer_order_summary_salesman_customer_order_summary__ = __webpack_require__(53);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the NewOrderSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewOrderSearchPage = /** @class */ (function (_super) {
    __extends(NewOrderSearchPage, _super);
    function NewOrderSearchPage(japi, navCtrl, navParams) {
        var _this = _super.call(this) || this;
        _this.japi = japi;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.action = _this.navParams.get("action");
        _this.japi.setResource("customers");
        return _this;
    }
    NewOrderSearchPage.prototype.selectRow = function (customer) {
        switch (this.action) {
            case 0:
                // code...
                this.newOrder(customer);
                break;
            default:
                // code...
                this.openHistory(customer);
                break;
        }
    };
    NewOrderSearchPage.prototype.openHistory = function (customer) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__customer_profile_customer_profile__["a" /* CustomerProfilePage */], {
            customer: customer
        });
    };
    NewOrderSearchPage.prototype.newOrder = function (customer) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__salesman_customer_order_summary_salesman_customer_order_summary__["a" /* SalesmanCustomerOrderSummaryPage */], {
            customer: customer
        });
    };
    NewOrderSearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.japi.getAll().then(function (res) {
            _this.data = res.data;
        });
    };
    NewOrderSearchPage.prototype.viewRoute = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__salesman_choose_route_salesman_choose_route__["a" /* SalesmanChooseRoutePage */], {});
    };
    NewOrderSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-new-order-search',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\new-order-search\new-order-search.html"*/'<!--\n\n  Generated template for the CustomerProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Search</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<ion-content style="margin-top: 40px;height:calc(100% - 40px);">\n\n  <ion-list>\n\n\n\n    <ion-item style="margin-bottom: 1.2em;">\n\n      <ion-label color="primary"  floating>Search for customer</ion-label>\n\n      <ion-input [(ngModel)]="filterString"></ion-input>\n\n    </ion-item>\n\n    <button ion-item  *ngFor="let customer of data" [hidden]="!inFilter(customer.name)" (click)="selectRow(customer)">\n\n     {{ customer.name }}\n\n    </button>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\new-order-search\new-order-search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], NewOrderSearchPage);
    return NewOrderSearchPage;
}(__WEBPACK_IMPORTED_MODULE_5__net_controller__["a" /* NetController */]));

//# sourceMappingURL=new-order-search.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesmanChooseRoutePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route_home_route_home__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the SalesmanChooseRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SalesmanChooseRoutePage = /** @class */ (function (_super) {
    __extends(SalesmanChooseRoutePage, _super);
    function SalesmanChooseRoutePage(navCtrl, navParams, lctrl, japi, napi, alertCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.lctrl = lctrl;
        _this.japi = japi;
        _this.napi = napi;
        _this.alertCtrl = alertCtrl;
        _this.api = _this.japi;
        _this.customers = _this.fetchResourceList("customers", "customers", "name", _this.generateResourceFilter("", ""));
        _this.products = _this.fetchResourceList("products", "items", "itemName", _this.generateResourceFilter("", ""));
        _this.routes = [];
        _this.napi.getRoutes();
        return _this;
    }
    SalesmanChooseRoutePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.napi.getRoutes();
        this.japi.http.get(this.japi.URL + "truck_information", this.japi.httpOptions)
            .subscribe(function (res) {
            if (!res.data || !res.data.routes) {
                __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show("Error, failed to get employee routes, is this employee assigned?", "", "");
                return;
            }
            _this.routes = res.data.routes;
            for (var i = _this.routes.length - 1; i >= 0; i--) {
                var route = _this.routes[i];
                var routeLocal = _this.napi.getRouteByIdSync(route._id);
                _this.routes[i] = Object.assign(_this.routes[i], routeLocal);
            }
        });
    };
    SalesmanChooseRoutePage.prototype.ionViewDidLoad = function () {
    };
    SalesmanChooseRoutePage.prototype.openRoute = function (route) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__route_home_route_home__["a" /* RouteHomePage */], {
            route: route
        });
    };
    SalesmanChooseRoutePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-salesman-choose-route',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-choose-route\salesman-choose-route.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>ROUTE SELECTOR</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h1>SELECT A ROUTE</h1>\n\n</div>\n\n<ion-content style="margin-top: 40px;">\n\n  <div *ngIf="products && products.length" style="text-align: center;padding: 10px;">\n\n    <ion-chip style="width: 80%; text-align: center;margin: 0 auto;">\n\n      <ion-icon name="car" color="primary"></ion-icon>\n\n      <ion-label>{{ customers.length }} CUSTOMERS | {{ products.length }} PRODUCTS</ion-label>\n\n    </ion-chip>\n\n  </div>\n\n  <ion-list>\n\n    <div *ngIf="napi.localIndex.length == 0">\n\n      <ion-item style="text-align: center;">\n\n        <h4>No routes found...</h4>\n\n      </ion-item>\n\n    </div>\n\n    <ion-item *ngFor="let route of routes" (click)="openRoute(route)">\n\n      <ion-label item-start style="flex:3">\n\n        <ion-icon *ngIf="route.done" color="success" name="checkmark-circle"></ion-icon>\n\n        <ion-icon *ngIf="!route.done" color="danger" name="checkmark-circle"></ion-icon>\n\n        {{ route.name }}\n\n      </ion-label>\n\n      <ion-label item-end style="text-align: right;position: relative;top: -6px;">\n\n        <ion-icon>\n\n          <p class="text-muted">\n\n            {{ route.status ? route.status : "pending"  }}\n\n            <ion-icon color="primary" name="arrow-forward"></ion-icon>\n\n          </p>\n\n        </ion-icon>\n\n      </ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-choose-route\salesman-choose-route.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SalesmanChooseRoutePage);
    return SalesmanChooseRoutePage;
}(__WEBPACK_IMPORTED_MODULE_3__net_controller__["a" /* NetController */]));

//# sourceMappingURL=salesman-choose-route.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Mapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loadable; });
var Mapping = /** @class */ (function () {
    function Mapping() {
    }
    Mapping.baseURL = "https://test.getstorehub.com";
    Mapping.URL = Mapping.baseURL + "/api/";
    return Mapping;
}());

var Loadable = /** @class */ (function () {
    function Loadable(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
    }
    Loadable.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 8000,
            spinner: 'dots'
        });
        this.loading.present();
    };
    Loadable.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    return Loadable;
}());

//# sourceMappingURL=mapping.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_navigation_api_navigation_api__ = __webpack_require__(25);
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
 * Generated class for the RouteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RouteListPage = /** @class */ (function () {
    function RouteListPage(navCtrl, navParams, view, napi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.napi = napi;
        this.shouldReorder = true;
        this.route = navParams.get("route");
    }
    RouteListPage.prototype.dismiss = function (route) {
        this.napi.updateRoute(this.route);
        this.view.dismiss(route);
    };
    RouteListPage.prototype.reorderItems = function (indexes) {
        this.route.stops = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* reorderArray */])(this.route.stops, indexes);
    };
    RouteListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-route-list',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-list\route-list.html"*/'<!--\n\n  Generated template for the RouteHomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Manage {{ route.name }} stops </ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="dismiss(route)" ion-button icon-only>\n\n        done\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="margin-top: 40px;">\n\n  <ion-list [reorder]="shouldReorder" (ionItemReorder)="reorderItems($event)">\n\n    <ion-item *ngFor="let stop of route.stops">\n\n       {{ stop.name }}\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-list\route-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */]])
    ], RouteListPage);
    return RouteListPage;
}());

//# sourceMappingURL=route-list.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_flow_payment_flow__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_iot_api_iot_api__ = __webpack_require__(41);
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
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InvoicePage = /** @class */ (function () {
    function InvoicePage(alertCtrl, japi, navCtrl, navParams, modalCtrl, iotapi) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.japi = japi;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.iotapi = iotapi;
        this.default = {
            total: 0,
            taxValue: 0
        };
        this.invoice = Object.assign(this.default, navParams.get("invoice"));
        this.customer = navParams.get("customer");
        this.invoice.comi = this.customer.comi;
        this.taxRates = [];
        this.getTotal();
        this.getLocation();
        this.japi.http.get(this.japi.URL + "taxrates", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.taxRates = res.data;
        });
    }
    InvoicePage.prototype.tryReturn = function (item) {
    };
    InvoicePage.prototype.getLocation = function () {
        var _this = this;
        if (this.invoice.location == this.customer._id) {
            this.location = this.customer;
            return;
        }
        this.japi.http.get(this.japi.URL + "locations/query?_id=" + this.invoice.location, this.japi.httpOptions)
            .subscribe(function (res) {
            if (res.data) {
                _this.location = res.data;
            }
        });
    };
    InvoicePage.prototype.addNote = function (invoice) {
        var alert = this.alertCtrl.create({
            title: "Add a note to your invoice",
            inputs: [
                {
                    name: 'note',
                    placeholder: 'Note',
                    type: 'text'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Add note',
                    handler: function (data) {
                        invoice.note = data.note;
                    }
                }
            ]
        });
        alert.present();
    };
    InvoicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InvoicePage');
    };
    InvoicePage.prototype.isTypeCoffee = function (item) {
        var catString = item.category.join(",").toLowerCase();
        return catString.includes("coffee") || catString.includes("notax");
    };
    InvoicePage.prototype.makeId = function () {
        return Math.random().toString(36).substring(0, 8);
    };
    InvoicePage.prototype.shouldClone = function (invoice) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm clone',
            message: 'Please enter the ID of this new invoice',
            inputs: [
                {
                    name: 'id',
                    placeholder: 'ID',
                    type: 'text'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Clone',
                    handler: function (data) {
                        if (!data.id)
                            data.id = _this.makeId();
                        invoice.id = data.id;
                        _this.clone(invoice);
                    }
                }
            ]
        });
        alert.present();
    };
    InvoicePage.prototype.clone = function (invoice) {
        var _this = this;
        var copy = Object.assign({}, invoice);
        delete copy._id;
        delete copy.value;
        this.japi.http.post(this.japi.URL + "invoices", copy, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.navCtrl.pop();
        });
    };
    InvoicePage.prototype.getTotal = function () {
        console.log("get total");
        this.invoice.total = 0;
        this.invoice.taxValue = 0;
        for (var i = this.invoice.list.length - 1; i >= 0; i--) {
            var item = this.invoice.list[i];
            if (item.amt) {
                this.invoice.total += item.unitPrice * item.amt;
            }
            if (this.invoice.taxRate) {
                if (!item.category || !this.isTypeCoffee(item)) {
                    var itemTax = (item.unitPrice * item.amt) * (this.invoice.taxRate / 100);
                    this.invoice.taxValue += itemTax;
                }
            }
        }
        return this.invoice.total;
    };
    InvoicePage.prototype.email = function (invoice) {
        var _this = this;
        invoice.customerEmail = this.customer.email;
        invoice.customerAddress = this.customer.address;
        invoice.customerPhone = this.customer.contactNo;
        this.japi.http.post(this.japi.URL + "email_invoice", invoice, this.japi.httpOptions)
            .subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: 'Success',
                subTitle: 'Invocie emailed...',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    InvoicePage.prototype.print = function (invoice) {
        invoice.customerEmail = this.customer.email;
        console.log(this.location);
        invoice.customerAddress = this.location.address;
        invoice.customerPhone = this.customer.contactNo;
        this.iotapi.print(invoice);
    };
    InvoicePage.prototype.charge = function (invoice) {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__payment_flow_payment_flow__["a" /* PaymentFlowPage */], { invoice: invoice });
        profileModal.onDidDismiss(function (data) {
            if (data) {
                if (!data)
                    return;
                _this.invoice = data;
                _this.update(_this.invoice);
            }
        });
        profileModal.present();
    };
    InvoicePage.prototype.update = function (invoice) {
        var _this = this;
        invoice.value = parseFloat(invoice.value);
        this.japi.edit(invoice._id, invoice)
            .then(function (res) {
            var alert = _this.alertCtrl.create({
                title: 'Success',
                subTitle: 'Resource updated',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    InvoicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-invoice',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\invoice\invoice.html"*/'<!--\n\n  Generated template for the InvoicePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Invoice # {{ invoice.id }}</ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="shouldClone(invoice)" ion-button icon-only>\n\n        Clone\n\n      </button>\n\n       <button (click)="addNote(invoice)" ion-button icon-only>\n\n        Add note\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box" style="text-align: left;">\n\n  <h3>Customer : {{ invoice.customer }}</h3>\n\n  <h3 *ngIf="invoice.po">PO# : {{ invoice.po }}</h3>\n\n  <p *ngIf="invoice.note">Note : {{ invoice.note }}</p>\n\n  <H5>Invoice balance: {{ ( ( invoice.value ? invoice.value : 0 )  - ( invoice.total + invoice.taxValue ) ).toFixed(2) }} USD</H5>\n\n  <h5 *ngIf="location">Shipping to {{ location.name }}</h5>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-6>\n\n        <button (click)="email(invoice)" [disabled]="!invoice.history || invoice.history.length == 0" full round color="danger" ion-button>EMAIL</button>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <button (click)="print(invoice)" [disabled]="!invoice.history || invoice.history.length == 0" full round color="danger" ion-button>PRINT</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</div>\n\n<ion-content style="margin-top: 270px;height:calc(100% - 270px);">\n\n  <ion-item>\n\n    <ion-label color="primary" floating>Update invoice balance manually</ion-label>\n\n    <ion-input type="number" [(ngModel)]="invoice.value"></ion-input>\n\n  </ion-item>\n\n  <ion-item *ngIf="!invoice.taxPredefined">\n\n    <ion-label>Tax rate</ion-label>\n\n    <ion-select (ionChange)="getTotal()" [(ngModel)]="invoice.taxRate">\n\n      <ion-option *ngFor="let taxrate of taxRates" [value]="taxrate.percentage">{{ taxrate.name }}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item>\n\n    <h5>Tax value : {{ invoice.taxValue.toFixed(2) }} ( {{ invoice.taxRate}} % )</h5>\n\n    <h5>Sub total : {{ invoice.total.toFixed(2) }}</h5>\n\n    <h3>Total : {{  (invoice.total + invoice.taxValue ).toFixed(2) }}</h3>\n\n  </ion-item>\n\n  <h3 style="text-align: center;">Items</h3>\n\n  <ion-list>\n\n    <ion-item *ngFor="let item of invoice.list" (click)="tryReturn(item)">\n\n      <ion-label item-start> {{ item.itemName }} | {{ item.sku }} </ion-label>\n\n      <ion-label item-content>\n\n        Qx {{ item.amt }}\n\n      </ion-label>\n\n      <ion-label item-end style="text-align: right;">\n\n        <p class="text-muted">\n\n          {{ ( item.unitPrice * item.amt ).toFixed(2) }} USD\n\n        </p>\n\n      </ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n  <div style="padding:10px;" *ngIf="invoice.clientSignature">\n\n      <p>Client signature</p>\n\n      <img src="{{ invoice.clientSignature }}" style="width: 100%;">\n\n  </div>\n\n  <div style="height:75px;"></div>\n\n</ion-content>\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-7>\n\n          <button ion-button color="danger" full round (click)="charge(invoice)">COLLECT PAYMENT</button>\n\n        </ion-col>\n\n        <ion-col col-5>\n\n          <button ion-button color="primary" full round (click)="update(invoice)">UPDATE</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\invoice\invoice.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_iot_api_iot_api__["a" /* IotApiProvider */]])
    ], InvoicePage);
    return InvoicePage;
}());

//# sourceMappingURL=invoice.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverNavPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__route_list_route_list__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stopsto_pick_stopsto_pick__ = __webpack_require__(130);
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
 * Generated class for the DriverNavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DriverNavPage = /** @class */ (function () {
    function DriverNavPage(navCtrl, navParams, japi, actionSheet, napi, modalCtrl, geolocation, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.actionSheet = actionSheet;
        this.napi = napi;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.route = { stops: [] };
        this.routes = [];
        this.loadMap();
    }
    DriverNavPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.japi.presentLoading();
        this.napi.storage.keys()
            .then(function (keys) {
            if (keys.indexOf("shouldClear") !== -1) {
                _this.clearStop();
                __WEBPACK_IMPORTED_MODULE_7__ToastReplacement__["a" /* Toast */].show("Stop cleared", "", "");
                _this.napi.storage.remove("shouldClear")
                    .then(function () { return console.log("Hook removed!"); });
            }
        });
        setTimeout(function () {
            _this.getTruckInformation();
            _this.napi.storage.get("route")
                .then(function (route) {
                _this.japi.hideLoading();
                if (route) {
                    _this.route = route;
                    _this.loadMap();
                }
            }).catch(function (err) {
                console.log(err);
                _this.japi.hideLoading();
            });
        }, 1300);
        // detect any stores
    };
    DriverNavPage.prototype.clearRoute = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Reset route.',
            message: 'Do you want to clear route settings?',
            buttons: [
                'Cancel',
                {
                    text: 'Select',
                    handler: function () {
                        _this.napi.storage.remove("route")
                            .then(function () {
                            _this.route = { stops: [] };
                            _this.ionViewDidEnter();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    DriverNavPage.prototype.getTruckInformation = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "truck_information", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.truck = res.data;
            _this.routes = _this.truck.routes;
        });
    };
    DriverNavPage.prototype.getInvoice = function (locationId) {
        var result;
        for (var i = this.route.invoices.length - 1; i >= 0; i--) {
            var inv = this.route.invoices[i];
            if (inv.location == locationId) {
                result = inv;
                break;
            }
        }
        return result;
    };
    DriverNavPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            var stopClose = _this.napi.locationTool
                .detectClosestStore(_this.route.list, resp.coords);
            if (stopClose) {
                _this.route = _this.napi.locationTool
                    .clearStop(_this.route, stopClose);
                _this.napi.storage
                    .set("route", _this.route)
                    .then(function () {
                    console.log("Route information saved.");
                });
            }
        }).catch(function (error) {
            console.log('Error getting location', JSON.stringify(error));
            __WEBPACK_IMPORTED_MODULE_7__ToastReplacement__["a" /* Toast */].show("Error, could not get location", '3000', 'top');
        });
    };
    DriverNavPage.prototype.getRoute = function (req) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Select route.',
            message: 'Do you want to select this route?',
            buttons: [
                'Cancel',
                {
                    text: 'Select',
                    handler: function () {
                        _this.saveRoute(req);
                    }
                }
            ]
        });
        alert.present();
    };
    DriverNavPage.prototype.saveRoute = function (req) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "truck_route", req, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            __WEBPACK_IMPORTED_MODULE_7__ToastReplacement__["a" /* Toast */].show(res.message, '5000', 'top');
            if (res.data) {
                _this.route = Object.assign({}, res.data);
                for (var i = _this.route.stops.length - 1; i >= 0; i--) {
                    var stop_1 = _this.route.stops[i];
                    if (_this.route.route.indexOf(stop_1._id) == -1) {
                        _this.route.route.push(stop_1._id);
                    }
                }
                _this.napi.storage.set("route", _this.route)
                    .then(function () { return _this.loadMap(); });
            }
        });
    };
    DriverNavPage.prototype.alertRouteStart = function () {
        this.japi.http.get(this.japi.URL + "start_truck_route/" + this.truck.name, this.japi.httpOptions)
            .subscribe(function (res) {
        });
    };
    DriverNavPage.prototype.alertRouteEnd = function () {
        this.japi.http.get(this.japi.URL + "end_truck_route/" + this.truck.name, this.japi.httpOptions)
            .subscribe(function (res) {
        });
    };
    DriverNavPage.prototype.routeAction = function (route) {
        // move too, toast 
        // and open in maps after a bit
        var nextStop = this.nextStop(route);
        if (route.status == 'pending') {
            this.alertRouteStart();
            route.status = 'active';
        }
        if (!nextStop) {
            this.alertRouteEnd();
            this.completeRoute(route);
            return;
        }
        this.focusTo(nextStop);
        this.updateRoute();
    };
    DriverNavPage.prototype.getIds = function (route) {
        var ids = [];
        for (var i = route.invoices.length - 1; i >= 0; i--) {
            ids.push(route.invoices[i]._id);
        }
        return ids.join(",");
    };
    DriverNavPage.prototype.completeRoute = function (route) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "truck_complete/" + this.getIds(route), this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            __WEBPACK_IMPORTED_MODULE_7__ToastReplacement__["a" /* Toast */].show(res.message, '5000', 'top');
            if (res.success) {
                _this.route = { stops: [] };
                _this.map.clear();
                _this.napi.storage.remove("route")
                    .then(function () {
                    console.log("route removed.");
                });
            }
        });
    };
    DriverNavPage.prototype.nextStop = function (route) {
        var result = false;
        for (var i = route.stops.length - 1; i >= 0; i--) {
            if (!route.stops[i].cleared) {
                result = route.stops[i];
                break;
            }
        }
        return result;
    };
    DriverNavPage.prototype.getRouteFrom = function (stops) {
        var result = [];
        for (var i = stops.length - 1; i >= 0; i--) {
            result.push(stops[i]._id);
        }
        return result;
    };
    DriverNavPage.prototype.openInvoice = function (stop) {
        var invoice = this.getInvoice(stop._id);
        var stops = this.getRouteFrom(this.route.stops);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__stopsto_pick_stopsto_pick__["a" /* StopstoPickPage */], {
            fc: true,
            route: stops,
            id: invoice._id
        });
    };
    DriverNavPage.prototype.generateActionHandler = function (contrl) {
        return function (stop, marker) {
            var buttonLabels = ['Open in GPS', 'Scan invoice items', 'Move to next stop', 'Not available'];
            var options = {
                title: 'Manage stop',
                subtitle: 'Choose an action',
                buttonLabels: buttonLabels,
                addDestructiveButtonWithLabel: 'Cancel',
                destructiveButtonLast: true
            };
            var alert;
            contrl.actionSheet.show(options).then(function (buttonIndex) {
                console.log(buttonIndex);
                switch (buttonIndex) {
                    case 0:
                        break;
                    case 1:
                        contrl.napi.openInMaps(stop);
                        break;
                    case 2:
                        // code...
                        var invoice = contrl.getInvoice(stop._id);
                        contrl.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__stopsto_pick_stopsto_pick__["a" /* StopstoPickPage */], {
                            fc: true,
                            id: invoice._id
                        });
                        break;
                    case 3:
                        alert = contrl.alertCtrl.create({
                            title: 'Confirm completion',
                            message: 'Have you finished selling to this this location?',
                            buttons: [
                                'Cancel',
                                {
                                    text: 'Next',
                                    handler: function () {
                                        contrl.clearStop();
                                        marker.remove();
                                    }
                                }
                            ]
                        });
                        alert.present();
                        break;
                    case 4:
                        alert = contrl.alertCtrl.create({
                            title: 'Confirm Unavailability',
                            message: 'This stop will be disabled for 12 hours?',
                            buttons: [
                                'Cancel',
                                {
                                    text: 'Next',
                                    handler: function () {
                                        contrl.clearStop();
                                        marker.remove();
                                        var res = stop.locations ? "customers" : "locations";
                                        contrl.disableStop(res, stop._id);
                                    }
                                }
                            ]
                        });
                        alert.present();
                        break;
                    default:
                        break;
                }
            });
        };
    };
    DriverNavPage.prototype.disableStop = function (res, id) {
        this.japi.http.put("" + this.japi.URL + res + "/" + id, { disabled: (new Date()).getTime() }, this.japi.httpOptions)
            .subscribe(function (res) {
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
        });
    };
    DriverNavPage.prototype.clearStop = function () {
        var stopClose = this.nextStop(this.route);
        this.route = this.napi.locationTool
            .clearStop(this.route, stopClose._id);
        this.napi.updateRoute(this.route);
        this.routeAction(this.route);
    };
    DriverNavPage.prototype.focusTo = function (location) {
        this.map.animateCamera({
            target: { lat: location.geometry.location.lat, lng: location.geometry.location.lng },
            zoom: 18,
            tilt: 30,
            duration: 5000
        });
    };
    DriverNavPage.prototype.listView = function (route) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__route_list_route_list__["a" /* RouteListPage */], { route: this.route });
        modal.onDidDismiss(function (data) {
            _this.route = data;
            _this.updateRoute();
        });
        modal.present();
    };
    DriverNavPage.prototype.updateRoute = function () {
        this.napi.storage
            .set("route", this.route)
            .then(function () {
            console.log("Route information saved.");
        });
    };
    DriverNavPage.prototype.sortByRoute = function () {
        var newStops = [];
        for (var i = this.route.route.length - 1; i >= 0; i--) {
            var r = this.route.route[i];
            var l = this.getLocationById(this.route.stops, r);
            if (l) {
                newStops.push(l);
            }
        }
        this.route.stops = newStops;
    };
    DriverNavPage.prototype.getLocationById = function (locations, id) {
        var result = false;
        for (var i = locations.length - 1; i >= 0; i--) {
            var l = locations[i];
            if (id == l._id) {
                result = l;
                break;
            }
        }
        return result;
    };
    DriverNavPage.prototype.loadMap = function () {
        if (this.map) {
            this.map.clear();
        }
        if (!this.route.status) {
            this.route.status = "pending";
        }
        if (this.route.stops.length > 0) {
            var stop_2 = this.route.stops[0];
            this.focusTo(stop_2);
            this.sortByRoute();
        }
        var current = (new Date()).getTime() - (42300 * 1000);
        for (var i = this.route.stops.length - 1; i >= 0; i--) {
            var stop = this.route.stops[i];
            if (stop.disabled) {
                if (stop.disabled > current) {
                    this.route.stops.splice(i, 1);
                }
            }
        }
        if (!this.map) {
            var centerAt = this.route.stops.length != 0 ? this.route.stops[0] : {
                geometry: {
                    location: { lat: 44.477500, lng: -73.174870 }
                }
            };
            var mapOptions = {
                camera: {
                    target: {
                        lat: centerAt.geometry.location.lat,
                        lng: centerAt.geometry.location.lng
                    },
                    zoom: 18,
                    tilt: 30
                }
            };
            this.map = __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', mapOptions);
        }
        this.napi.addLocations(this.map, this.route.stops, 'orange', this.generateActionHandler(this));
    };
    DriverNavPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DriverNavPage');
    };
    DriverNavPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-driver-nav',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\driver-nav\driver-nav.html"*/'<!--\n\n  Generated template for the RouteHomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>{{ route.name ? route.name : "Select a route to serve."  }}</ion-title>\n\n       <ion-buttons end>\n\n      <button (click)="clearRoute()" ion-button icon-only>\n\n        Clear\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div id="map_canvas" class="map_content"></div>\n\n<ion-content no-bounce style="margin-top: 40px;" [style.height.px]="!route || !route.name || (route.stops && route.stops.length == 0) ? 500 : 110" >\n\n  <ion-list  *ngIf="!route || !route.name || (route.stops && route.stops.length == 0)" >\n\n      <ion-item *ngFor="let rte of routes" (click)="getRoute(rte)" >\n\n          {{rte.name }}\n\n      </ion-item>\n\n    \n\n  </ion-list>\n\n\n\n  <button ion-button *ngIf="route && route.name &&  route.stops.length > 0" color="danger" (click)="listView(route)" full>\n\n    LIST VIEW\n\n  </button>\n\n</ion-content>\n\n<ion-footer *ngIf="route" color="dark">\n\n  <ion-toolbar color="dark">\n\n    <button (click)="routeAction(route)" *ngIf="route && route.stops && route.stops.length != 0" ion-button color="info" full>\n\n      <span *ngIf="route.status == \'active\'">NEXT STOP</span>\n\n      <span *ngIf="route.status == \'pending\'">START</span>\n\n    </button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\driver-nav\driver-nav.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_5__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DriverNavPage);
    return DriverNavPage;
}());

//# sourceMappingURL=driver-nav.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StopstoPickPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_iot_api_iot_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__invoice_invoice__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







/**
 * Generated class for the StopstoPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StopstoPickPage = /** @class */ (function () {
    function StopstoPickPage(navCtrl, navParams, japi, iapi, loadingCtrl, alertCtrl, actionSheetController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.iapi = iapi;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetController = actionSheetController;
        this.route = { list: [] };
        this.stops = [];
        this.aisles = [];
        this.truck = navParams.get("truck");
        this.route._id = navParams.get("id");
        this.forceLocal = navParams.get("fc") ? true : false;
        this.stops = navParams.get("route");
        this.routeName = navParams.get("routeName");
        if (this.forceLocal) {
            this.japi.http.post(this.japi.URL + "record_log", {
                name: this.truck,
                text: "Driver open product scan screen"
            }, this.japi.httpOptions)
                .subscribe(function (res) {
            });
        }
        this.refreshData();
    }
    StopstoPickPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StopstoPickPage');
    };
    StopstoPickPage.prototype.count = function (list) {
        var result = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].amt)
                result += list[i].amt;
        }
        return result;
    };
    StopstoPickPage.prototype.getLocation = function () {
        var _this = this;
        if (!this.route.location)
            return;
        this.japi.http.get(this.japi.URL + "locations/" + this.route.location, this.japi.httpOptions)
            .subscribe(function (res) {
            if (!res.data) {
                _this.getCustomerLocation();
                return;
            }
            _this.location = res.data;
        });
    };
    StopstoPickPage.prototype.getCustomerLocation = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "customers/" + this.route.location)
            .subscribe(function (res) {
            if (!res.data) {
                return;
            }
            _this.location = res.data;
        });
    };
    StopstoPickPage.prototype.open = function (invoice, customer) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__invoice_invoice__["a" /* InvoicePage */], {
            invoice: invoice,
            customer: customer
        });
    };
    StopstoPickPage.prototype.getStatus = function (item) {
        var key = "scanned";
        if (this.forceLocal) {
            key = "delivered";
        }
        return (item.amt - (item[key] ? item[key] : 0) == 0) ? 'success' : 'danger';
    };
    StopstoPickPage.prototype.localScan = function (item) {
        var _this = this;
        if (item.delivered == item.amt) {
            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show('This item has been completely scanned.', '', '');
            return;
        }
        var alert = this.alertCtrl.create({
            title: 'Enter barcode',
            inputs: [
                {
                    name: 'bar',
                    placeholder: 'PRODUCT BARCODE'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Confirm',
                    handler: function (data) {
                        if (!data.bar)
                            return;
                        if (!item.barcode || item.barcode.indexOf(data.bar) == -1) {
                            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("Error, wrong item scanned", '', '');
                            return;
                        }
                        if (!item.delivered)
                            item.delivered = 0;
                        item.delivered++;
                        _this.backUpInvoice(_this.route);
                        _this.checkIfDelivered();
                    }
                }
            ]
        });
        alert.present();
    };
    StopstoPickPage.prototype.checkIfDelivered = function () {
        var amountLeft = 0;
        for (var i = this.route.list.length - 1; i >= 0; i--) {
            var item = this.route.list[i];
            amountLeft += item.amt - (item.delivered ? item.delivered : 0);
        }
        if (amountLeft == 0) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__invoice_invoice__["a" /* InvoicePage */], {
                customer: this.customer,
                invoice: this.route
            });
        }
    };
    StopstoPickPage.prototype.scan = function (item) {
        var _this = this;
        if (this.forceLocal) {
            this.localScan(item);
            return;
        }
        if (item.scanned == item.amt) {
            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show('This item has been completely scanned.', '', '');
            return;
        }
        var alert = this.alertCtrl.create({
            title: 'Enter barcode',
            inputs: [
                {
                    name: 'bar',
                    placeholder: 'PRODUCT BARCODE'
                }
            ],
            buttons: [
                {
                    text: 'Use camera',
                    handler: function () {
                        _this.iapi.scanBarcode()
                            .then(function (code) {
                            if (!code || code == "" || !item.barcode || item.barcode.indexOf(code) == -1) {
                                __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("Error, wrong item scanned", '', '');
                                return;
                            }
                            item.barcode = code;
                            _this.updateItem(item);
                        })
                            .catch(function (err) {
                            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("Error, barcode was not scanned!", "", "");
                        });
                    }
                },
                'Cancel',
                {
                    text: 'Confirm',
                    handler: function (data) {
                        if (!data.bar) {
                            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("Error, no barcode entered", '', '');
                            return;
                        }
                        if (!item.barcode || item.barcode.indexOf(data.bar) == -1) {
                            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("Error, wrong item scanned", '', '');
                            return;
                        }
                        item.barcode = data.bar;
                        _this.updateItem(item);
                    }
                }
            ]
        });
        alert.present();
    };
    StopstoPickPage.prototype.print = function (invoice) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            title: 'Print actions',
                            buttons: [{
                                    text: 'Print all picking tickets',
                                    handler: function () {
                                        var labels = [];
                                        var indexOf = _this.stops.indexOf(_this.location._id);
                                        for (var i = invoice.list.length - 1; i >= 0; i--) {
                                            var item = invoice.list[i];
                                            for (var v = 0; v < item.amt; v++) {
                                                var label = {
                                                    customer: _this.customer.name,
                                                    address: _this.location.address,
                                                    id: _this.route.id,
                                                    po: _this.route.po,
                                                    stop: indexOf === -1 ? "STOP NOT FOUND!" : indexOf + 1,
                                                    route: _this.routeName,
                                                    current: v + 1,
                                                    total: item.amt
                                                };
                                                labels.push(label);
                                            }
                                        }
                                        generateAllShipLabel(labels)
                                            .then(function (shipLabel) {
                                            _this.iapi.printSticker(shipLabel);
                                        });
                                    }
                                }, {
                                    text: 'Print invoice',
                                    handler: function () {
                                        _this.iapi.print(invoice);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'destructive',
                                    handler: function () {
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StopstoPickPage.prototype.updateItem = function (item) {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Updating " + item.itemName
        });
        this.loader.present();
        var indexOf = this.stops.indexOf(this.location._id);
        if (!item.scanned)
            item.scanned = 0;
        var label = {
            customer: this.customer.name,
            address: this.location.address,
            id: this.route.id,
            po: this.route.po,
            stop: indexOf === -1 ? "STOP NOT FOUND!" : indexOf + 1,
            route: this.routeName,
            current: item.scanned + 1,
            total: item.amt
        };
        generateShipLabel(label)
            .then(function (shipLabel) {
            _this.iapi.printSticker(shipLabel);
            _this.japi.http.post(_this.japi.URL + "scan_item/" + _this.route._id, item, _this.japi.httpOptions)
                .subscribe(function (res) {
                if (res.data.error)
                    __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show(res.data.error, "", "");
                _this.loader.dismiss();
                _this.refreshData();
            });
        });
    };
    StopstoPickPage.prototype.backUpInvoice = function (route) {
        this.japi.http.put(this.japi.URL + "invoices/" + this.route._id, route, this.japi.httpOptions)
            .subscribe(function (res) {
            console.log("Invoice backed up.");
        });
    };
    StopstoPickPage.prototype.refreshData = function () {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "invoices/" + this.route._id, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.route = res.data;
            _this.route.list.sort(_this.sortByProximity);
            _this.generateAisles(_this.route);
            _this.getCustomer();
            _this.getLocation();
        });
    };
    StopstoPickPage.prototype.parseInt = function (int) {
        return parseInt(int);
    };
    StopstoPickPage.prototype.generateAisles = function (invoice) {
        for (var i = invoice.list.length - 1; i >= 0; i--) {
            var item = invoice.list[i];
            if (this.aisles.indexOf(parseInt(item.aisle)) === -1) {
                this.aisles.push(parseInt(item.aisle));
            }
        }
        this.aisles.sort(this.sortNumber);
        console.log(this.aisles);
    };
    StopstoPickPage.prototype.sortNumber = function (a, b) {
        return a - b;
    };
    StopstoPickPage.prototype.sortByProximity = function (a, b) {
        if (!a.aisle || !b.aisle)
            return 0;
        if (parseInt(a.aisle) > parseInt(b.aisle)) {
            if (parseInt(a.shelf) > parseInt(b.shelf)) {
                if (parseInt(a.slot) > parseInt(b.slot)) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return -1;
        }
        return 1;
    };
    StopstoPickPage.prototype.getCustomer = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "customers/query?name=" + this.route.customer, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.customer = res.data;
            _this.route.customerEmail = _this.customer.email;
            _this.route.customerPhone = _this.customer.contactNo;
            _this.route.customerAddress = _this.customer.address;
        });
    };
    StopstoPickPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stopsto-pick',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\stopsto-pick\stopsto-pick.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n    <ion-navbar color="light">\n\n        <ion-title>Invoice picker</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n    <h1>PICKING : {{ route.name ? route.name : route.id }}</h1>\n\n    <h5 *ngIf="location">Shipping to {{ location.name }}</h5>\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col col-6>\n\n                <button (click)="print(route)" full round color="danger" ion-button>PRINT</button>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <button (click)="open(route, customer)" [disabled]="!customer" full round color="danger" ion-button>OPEN</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</div>\n\n<ion-content>\n\n    <div style="text-align: center;padding: 10px;">\n\n        <ion-chip style="width: 80%; text-align: center;margin: 0 auto;">\n\n            <ion-icon name="color-filter" color="primary"></ion-icon>\n\n            <ion-label>{{ count(route.list) }} PRODUCTS<span *ngIf="truck">[{{ truck.name }}]</span></ion-label>\n\n        </ion-chip>\n\n    </div>\n\n    <ion-list>\n\n        <div *ngFor="let aisle of aisles">\n\n            <ion-item-divider color="primary">\n\n                <p style="color:#fff;text-align:center ">AISLE {{ aisle }}</p>\n\n            </ion-item-divider>\n\n            <div *ngFor="let item of route.list">\n\n                <ion-item *ngIf="parseInt(item.aisle) == aisle" (click)="scan(item)">\n\n                    <ion-label text-wrap item-start style="flex:6;">\n\n                        <ion-icon [color]="getStatus(item)" name="checkmark-circle"></ion-icon>\n\n                        {{ item.itemName }} <br />\n\n                        Bay : {{ item.bay }} | Bin : {{ item.bin }}\n\n                    </ion-label>\n\n                    <ion-label item-end style="text-align: right;position: relative;top: -6px;">\n\n                        <ion-icon>\n\n                            <p *ngIf="!forceLocal" class="text-muted">\n\n                                {{ item.amt - ( item.scanned ? item.scanned : 0 ) }}\n\n                                <ion-icon color="primary" name="barcode"></ion-icon>\n\n                            </p>\n\n                            <p *ngIf="forceLocal" class="text-muted">\n\n                                {{ item.amt - ( item.delivered ? item.delivered : 0 ) }}\n\n                                <ion-icon color="primary" name="barcode"></ion-icon>\n\n                            </p>\n\n                        </ion-icon>\n\n                    </ion-label>\n\n                </ion-item>\n\n            </div>\n\n        </div>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\stopsto-pick\stopsto-pick.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_iot_api_iot_api__["a" /* IotApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], StopstoPickPage);
    return StopstoPickPage;
}());

function generateAllShipLabel(labels) {
    return new Promise(function (resolve, reject) {
        window["root-rec"].innerHTML = " <style type=\"text/css\">\n        table {\n          border-spacing: 5px;\n        }\n\n        #act-rec h1 {\n          font-size : 2em;\n          font-weight:bold;\n        }\n      </style>\n     ";
        for (var i = labels.length - 1; i >= 0; i--) {
            var label = labels[i];
            var labelTemplate = "\n     <div id=\"act-rec\" style=\"width:320px;font-size:15px;margin-bottom:8px;\">\n      <img style=\"position:absolute;left:10px;width:65px;\" src=\"data:image/png;base64,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\">\n      <table style=\"margin-left:105px;\">\n        <tr>\n          <th align=\"left\" width=\"220\">Java Traders of Vermont</th>\n          <th align=\"left\"  style=\"padding-left: 10px;\" width=\"220\">" + label.customer + "</th> \n        </tr>\n        <tr>\n          <td>400 Patchen Rd<br>\n        South Burlington VT 05403</td>\n           <td  style=\"padding-left: 10px;\">" + label.address + "</td>\n        </tr>\n      </table>\n      <h3 style=\"margin-top: 10px;text-align: center;\"><b>INVOICE: " + label.id + "</b><br/>\n      PO : " + label.po + "</h3>\n      <table >\n        <tr>\n          <th  width=\"183\"><u><b>STOP</b></u></th>\n          <th  width=\"183\"><u><b>ROUTE</b></u></th>\n          <th  width=\"183\"><u><b>PIECE</b></u></th>\n        </tr>\n        <tr>\n            <td><h1 style=\"text-align: center; margin-top: 0px;color:#333;\">" + label.stop + "</h1></td>\n            <td><h1 style=\"text-align: center; margin-top: 0px;color:#333;\">" + label.route + "</h1></td>\n            <td><h1 style=\"text-align: center; margin-top: 0px;color:#333;\">" + label.current + "-" + label.total + "</h1></td>\n        </tr>\n      </table>\n      </div>";
            window["root-rec"].innerHTML += labelTemplate;
        }
        setTimeout(function () {
            window["html2canvas"](document.getElementById("act-rec")).then(function (canvas) {
                resolve("<img style=\"width:130px;\" src=\"" + canvas.toDataURL() + "\" />")
                    , function (err) { return console.log(err); };
            });
        }, 1100);
    });
}
function generateShipLabel(label) {
    return new Promise(function (resolve, reject) {
        var labelTemplate = "\n      <style type=\"text/css\">\n        table {\n          border-spacing: 5px;\n        }\n\n        #act-rec h1 {\n          font-size : 2em;\n          font-weight:bold;\n        }\n      </style>\n      <div id=\"act-rec\" style=\"width:320px;font-size:15px;\">\n      <img style=\"position:absolute;left:10px;width:65px;\" src=\"data:image/png;base64,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\">\n      <table style=\"margin-left:105px;\">\n        <tr>\n          <th align=\"left\" width=\"220\">Java Traders of Vermont</th>\n          <th align=\"left\"  style=\"padding-left: 10px;\" width=\"220\">" + label.customer + "</th> \n        </tr>\n        <tr>\n          <td>400 Patchen Rd<br>\n        South Burlington VT 05403</td>\n           <td  style=\"padding-left: 10px;\">" + label.address + "</td>\n        </tr>\n      </table>\n      <h3 style=\"margin-top: 10px;text-align: center;\"><b>INVOICE: " + label.id + "</b><br/>\n      PO : " + label.po + "</h3>\n      <table >\n        <tr>\n          <th  width=\"183\"><u><b>STOP</b></u></th>\n          <th  width=\"183\"><u><b>ROUTE</b></u></th>\n          <th  width=\"183\"><u><b>PIECE</b></u></th>\n        </tr>\n        <tr>\n            <td><h1 style=\"text-align: center; margin-top: 0px;color:#333;\">" + label.stop + "</h1></td>\n            <td><h1 style=\"text-align: center; margin-top: 0px;color:#333;\">" + label.route + "</h1></td>\n            <td><h1 style=\"text-align: center; margin-top: 0px;color:#333;\">" + label.current + "-" + label.total + "</h1></td>\n        </tr>\n      </table>\n      </div>";
        window["root-rec"].innerHTML = labelTemplate;
        setTimeout(function () {
            window["html2canvas"](document.getElementById("act-rec")).then(function (canvas) {
                resolve("<img style=\"width:130px;\" src=\"" + canvas.toDataURL() + "\" />")
                    , function (err) { return console.log(err); };
            });
        }, 1100);
    });
}
//# sourceMappingURL=stopsto-pick.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StopsSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picking_order_picking_order__ = __webpack_require__(261);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StopsSelectionPage = /** @class */ (function () {
    function StopsSelectionPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.print_type = "invoice";
    }
    StopsSelectionPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    StopsSelectionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    StopsSelectionPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    StopsSelectionPage.prototype.gotoPickingOrder = function () {
        // console.log("clicked");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__picking_order_picking_order__["a" /* PickingOrderPage */]);
    };
    StopsSelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stops-selection',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\stops-selection\stops-selection.html"*/'<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">STOPS</div>\n\n      <ion-icon name="md-sync"></ion-icon>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="sub-title">\n\n    <span class="sub-title-circle"></span>\n\n    <span>BURLINGTON ROUTE | HERO TRUCK</span>\n\n  </div>\n\n  <div class="routes-progress-outer">\n\n    <div class="routes-progress-inner" style="width: 33.33%">\n\n    </div>\n\n    <div class="routes-pro"><span class="routes-done">12</span>/30 <span class="routes-done">Routes</span></div>\n\n  </div> \n\n  <div class="prod-item d-flex-middle border-bottom-0">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="print-types">\n\n      <ion-select [(ngModel)]="print_type" >\n\n        <ion-option value="invoice">Print Invoice</ion-option>\n\n        <ion-option value="Tickets">Print Picking Tickets</ion-option>\n\n        <ion-option value="Labels">Print Shipping Labels</ion-option>\n\n      </ion-select>\n\n      <div class="prod-btn">Print</div>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="gotoPickingOrder()" [style.background-color]="\'$green-color\'">\n\n      <div class="prod-item-header">\n\n        <span class="item-name green-color">Aram Store</span>\n\n        <div class="item-unit">\n\n          <div class="progress">Picked</div>\n\n          <span class="progress-status">10/10</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>Invoice #87997 PO# 19 Position 2</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="gotoPickingOrder()" [style.background-color]="\'$orange-color\'">\n\n      <div class="prod-item-header">\n\n        <span class="item-name orange-color">My Store</span>\n\n        <div class="item-unit">\n\n          <div class="progress orange-bg-color">In Process</div>\n\n          <span class="progress-status">7/40</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>Invoice #87997 PO# 19 Position 2</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="gotoPickingOrder()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name red-color">Your Store</span>\n\n        <div class="item-unit">\n\n          <div class="progress red-bg-color">Incomplete</div>\n\n          <span class="progress-status">0/8</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>Invoice #87997 PO# 19 Position 2</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\stops-selection\stops-selection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], StopsSelectionPage);
    return StopsSelectionPage;
}());

//# sourceMappingURL=stops-selection.js.map

/***/ }),

/***/ 143:
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
webpackEmptyAsyncContext.id = 143;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toast; });
var Toast = /** @class */ (function () {
    function Toast() {
    }
    Toast.show = function (message, duration, position) {
        var alert = this.alt.create({
            title: 'Alert',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    return Toast;
}());

//# sourceMappingURL=ToastReplacement.js.map

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/checkin-product-new/checkin-product-new.module": [
		544,
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
webpackAsyncContext.id = 185;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__salesman_dashboard_salesman_dashboard__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__driver_nav_driver_nav__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__picker_checker_dash_picker_checker_dash__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__ = __webpack_require__(15);
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.user = {};
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.openInterface = function (type) {
        switch (type) {
            case "sale":
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__salesman_dashboard_salesman_dashboard__["a" /* SalesmanDashboardPage */]);
                break;
            case "driver":
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__driver_nav_driver_nav__["a" /* DriverNavPage */]);
                break;
            default:
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__picker_checker_dash_picker_checker_dash__["a" /* PickerCheckerDashPage */]);
                break;
        }
    };
    LoginPage.prototype.login = function (user) {
        var _this = this;
        this.japi.login(user)
            .then(function () {
            // move to dashboard
            _this.openInterface(_this.user.type);
        })
            .catch(function (err) {
            console.log("error logging in ");
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('Error, failed to signin, incorrect username/password combination.', '5000', 'top');
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n  <div class="green-box">\n\n  		<h1>Login</h1>\n\n  </div>\n\n<ion-content style="margin-top: 140px;" padding>\n\n\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>Account type</ion-label>\n\n      <ion-select [(ngModel)]="user.type" >\n\n        <ion-option value="sale">Sale</ion-option>\n\n        <ion-option value="driver">Driver</ion-option>\n\n        <ion-option value="picker">Picker/Checker</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating>\n\n        <ion-icon name="person"></ion-icon> Username</ion-label>\n\n      <ion-input [(ngModel)]="user.username" ></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating>\n\n        <ion-icon name="lock"></ion-icon> Password</ion-label>\n\n      <ion-input [(ngModel)]="user.password" type="password"></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n  <button ion-button color="danger" (click)="login(user)">Login</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route_add_stop_route_add_stop__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__route_list_route_list__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__customer_profile_customer_profile__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_action_sheet__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_maps__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__salesman_customer_order_summary_salesman_customer_order_summary__ = __webpack_require__(53);
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
 * Generated class for the RouteHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RouteHomePage = /** @class */ (function () {
    function RouteHomePage(navCtrl, navParams, napi, alertCtrl, actionSheet, japi, modalCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.napi = napi;
        this.alertCtrl = alertCtrl;
        this.actionSheet = actionSheet;
        this.japi = japi;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.route = false;
        this.cacheCount = 0;
    }
    RouteHomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var route = this.navParams.get("route");
        var routeId = route._id;
        this.getCustomers();
        this.napi.getRouteById(routeId)
            .then(function (res) {
            if (!res) {
                _this.napi.addRoute(route.name, route.stops, route._id);
                _this.japi.loading = _this.japi.loadingCtrl.create({
                    content: 'Downloading location data',
                    spinner: 'dots'
                });
                _this.japi.loading.present();
                if (!route.stops)
                    route.stops = [];
                _this.napi.storage.get("route_order_" + route._id).then(function (val) {
                    console.log("Getting cache");
                    if (val) {
                        var pastStops = JSON.parse(val);
                        var newStopArray = [];
                        for (var i = pastStops.length - 1; i >= 0; i--) {
                            newStopArray.push(pastStops[i]._id);
                        }
                        for (var j = route.stops.length - 1; j >= 0; j--) {
                            var stop = route.stops[j];
                            if (newStopArray.indexOf(stop) === -1) {
                                newStopArray.push(stop);
                            }
                        }
                        route.stops = newStopArray;
                    }
                    route.stops = route.stops.filter(function (stop) { return stop != null; });
                    _this.cacheCount = route.stops.length;
                    route.id = route._id;
                    route.status = "pending";
                    _this.route = route;
                    for (var k = route.stops.length - 1; k >= 0; k--) {
                        var stopId = route.stops[k];
                        if (stopId)
                            _this.getLocationData(stopId);
                    }
                }, function (error) { return console.log(error); });
            }
            else {
                delete route.stops;
                delete route.id;
                _this.route = Object.assign(res, route);
                _this.loadMap();
            }
        });
    };
    RouteHomePage.prototype.getLocationData = function (location) {
        var _this = this;
        if (!location) {
            this.updateCache();
            return;
        }
        this.japi.http.get(this.japi.URL + "locations/" + location, this.japi.httpOptions)
            .subscribe(function (res) {
            if (!res.data) {
                _this.getCustomerData(location);
                return;
            }
            var index = _this.route.stops.indexOf(location);
            _this.route.stops[index] = res.data;
            _this.napi.updateRoute(_this.route);
            _this.updateCache();
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
            _this.getLocationData(location);
        });
    };
    RouteHomePage.prototype.updateCache = function () {
        this.cacheCount--;
        if (this.cacheCount <= 0) {
            var current = (new Date()).getTime() - (42300 * 1000);
            for (var i = this.route.stops.length - 1; i >= 0; i--) {
                var stop = this.route.stops[i];
                if (stop.disabled) {
                    if (stop.disabled > current) {
                        var indx = this.findStopIndex(stop._id, this.route.stops);
                        this.route.stops.splice(indx, 1);
                    }
                }
            }
            if (this.japi.loading)
                this.japi.hideLoading();
            this.loadMap();
            console.log("finished", this.route);
        }
    };
    RouteHomePage.prototype.getCustomerData = function (customer) {
        var _this = this;
        this.japi.http.get(this.japi.URL + "customers/" + customer, this.japi.httpOptions)
            .subscribe(function (res) {
            if (res.data) {
                var index = _this.route.stops.indexOf(customer);
                _this.route.stops[index] = res.data;
                _this.route.stops[index].customer = res.data.name;
                _this.route.stops[index].isCustomer = true;
                _this.napi.updateRoute(_this.route);
            }
            _this.updateCache();
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
            _this.getCustomerData(customer);
        });
    };
    RouteHomePage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            _this.napi.checkOnActiveRoute(resp.coords);
        }).catch(function (error) {
            console.log('Error getting location', JSON.stringify(error));
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show("Error, could not get location", '3000', 'top');
        });
    };
    RouteHomePage.prototype.getCustomers = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "customers", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.customers = res.data;
        });
    };
    RouteHomePage.prototype.routeAction = function (route) {
        switch (route.status) {
            case "pending":
                this.shouldStart(route);
                break;
            case "complete":
                this.checkStopsUnsoldFor(this.route);
                this.route = this.defaultRoute(this.route);
                __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('Route complete', '', '');
                this.route.status = "pending";
                break;
            default:
                this.nextStop(route);
                break;
        }
    };
    RouteHomePage.prototype.checkStopsUnsoldFor = function (route) {
        for (var i = route.stops.length - 1; i >= 0; i--) {
            if (!route.stops[i].soldTo) {
                this.sendAlert(route.stops[i]);
            }
        }
    };
    RouteHomePage.prototype.sendAlert = function (stop) {
        this.japi.http.post(this.japi.URL + "alerts", {
            title: "No orders were placed on stop " + stop.name,
            description: "No orders were placed while salesman was here."
        }, this.japi.httpOptions)
            .subscribe(function (res) {
        });
    };
    RouteHomePage.prototype.defaultRoute = function (route) {
        for (var i = route.stops.length - 1; i >= 0; i--) {
            route.stops[i].cleared = false;
        }
        return route;
    };
    RouteHomePage.prototype.nextStop = function (route) {
        var result = false;
        for (var i = 0; i < route.stops.length; i++) {
            // code...
            var stop_1 = route.stops[i];
            if (!stop_1.cleared) {
                this.focusTo(stop_1);
                result = stop_1;
                break;
            }
        }
        if (!result) {
            this.napi.activeRoute = false;
            this.route.status = "complete";
            this.route.active = false;
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('Route complete!', '', '');
            this.napi.updateRoute(this.route);
        }
        return result;
    };
    RouteHomePage.prototype.focusTo = function (location) {
        this.map.animateCamera({
            target: { lat: location.geometry.location.lat, lng: location.geometry.location.lng },
            zoom: 18,
            tilt: 30,
            duration: 5000
        });
    };
    RouteHomePage.prototype.clearStop = function () {
        var stopClose = this.nextStop(this.route);
        this.route = this.napi.locationTool
            .clearStop(this.route, stopClose._id);
        this.napi.activeRoute = this.route;
        this.napi.updateRoute(this.route);
        this.routeAction(this.route);
    };
    RouteHomePage.prototype.shouldStart = function (route) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm route',
            message: 'Do you want to start this route, once started you will not be able to update your stops?',
            buttons: [
                'Cancel',
                {
                    text: 'Start',
                    handler: function () {
                        _this.nextStop(route);
                        route.status = "active";
                        route.active = true;
                        _this.napi.updateRoute(route);
                    }
                }
            ]
        });
        alert.present();
    };
    RouteHomePage.prototype.shouldDelete = function (route) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to remove this route?',
            buttons: [
                'Cancel',
                {
                    text: 'Remove',
                    handler: function () {
                        _this.napi.removeRoute(route);
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    RouteHomePage.prototype.addStop = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__route_add_stop_route_add_stop__["a" /* RouteAddStopPage */], {
            route: this.route,
            customers: this.customers
        });
    };
    RouteHomePage.prototype.listView = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__route_list_route_list__["a" /* RouteListPage */], { route: this.route });
        modal.onDidDismiss(function (data) {
            _this.route = data;
            _this.napi.updateRoute(_this.route);
        });
        modal.present();
    };
    RouteHomePage.prototype.firstStopWithGeometry = function (stops) {
        var result = false;
        for (var i = stops.length - 1; i >= 0; i--) {
            if (stops[i].geometry) {
                result = stops[i];
                break;
            }
        }
        return result;
    };
    RouteHomePage.prototype.loadMap = function () {
        if (this.map) {
            this.map.clear();
        }
        if (!this.map) {
            var centerAt = this.route.stops.length != 0 && this.route.stops[0].geometry.location ? this.route.stops[0] : {
                geometry: {
                    location: { lat: 44.477500, lng: -73.174870 }
                }
            };
            var mapOptions = {
                camera: {
                    target: {
                        lat: centerAt.geometry.location.lat,
                        lng: centerAt.geometry.location.lng
                    },
                    zoom: 18,
                    tilt: 30
                }
            };
            this.map = __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', mapOptions);
        }
        this.napi.addLocations(this.map, this.route.stops, 'blue', this.generateActionHandler(this));
    };
    RouteHomePage.prototype.openProfile = function (customer) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__customer_profile_customer_profile__["a" /* CustomerProfilePage */], {
            customer: customer
        });
    };
    RouteHomePage.prototype.findCustomer = function (name) {
        var result = false;
        for (var i = this.customers.length - 1; i >= 0; i--) {
            if (this.customers[i].name == name) {
                result = this.customers[i];
                break;
            }
        }
        return result;
    };
    RouteHomePage.prototype.findStopIndex = function (id, stops) {
        var result = -1;
        for (var i = stops.length - 1; i >= 0; i--) {
            if (stops[i]._id == id) {
                result = i;
                break;
            }
        }
        return result;
    };
    RouteHomePage.prototype.removeStop = function (stop) {
        var stops = this.route.stops;
        var index = this.findStopIndex(stop._id, stops);
        this.removeStopLock(stop);
        this.route.stops.splice(index, 1);
        this.napi.updateRoute(this.route);
        __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('Stop removed', '3000', 'top');
    };
    RouteHomePage.prototype.removeStopLock = function (stop) {
        var _this = this;
        this.japi.http.delete(this.japi.URL + "route_lock/" + stop._id, this.japi.httpOptions)
            .subscribe(function (res) {
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show(res.success ? 'Stop removed...' : 'Stop could not be removed, please try again...', '5000', 'top');
            if (res.success) {
                _this.removeStop(stop);
            }
        });
    };
    RouteHomePage.prototype.newInvoice = function (customer, stop) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__salesman_customer_order_summary_salesman_customer_order_summary__["a" /* SalesmanCustomerOrderSummaryPage */], {
            customer: customer,
            stop: stop
        });
    };
    RouteHomePage.prototype.disableStop = function (res, id) {
        this.japi.http.put("" + this.japi.URL + res + "/" + id, { disabled: (new Date()).getTime() }, this.japi.httpOptions)
            .subscribe(function (res) {
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
        });
    };
    RouteHomePage.prototype.generateActionHandler = function (contrl) {
        return function (stop, marker) {
            if (!contrl.customers) {
                __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('One moment... (loading customers)', '5000', 'top');
                return;
            }
            var buttonLabels = ['Open in GPS', 'New invoice', 'Open customer profile', 'Move to next stop', 'Not available'];
            var options = {
                title: 'Manage stop',
                subtitle: 'Choose an action',
                buttonLabels: buttonLabels,
                addDestructiveButtonWithLabel: 'Cancel',
                destructiveButtonLast: true
            };
            contrl.actionSheet.show(options).then(function (buttonIndex) {
                switch (buttonIndex) {
                    case 0:
                        break;
                    case 1:
                        contrl.napi.openInMaps(stop);
                        break;
                    case 2:
                        var c = contrl.findCustomer(stop.customer);
                        contrl.newInvoice(c, stop._id);
                        break;
                    case 3:
                        // code...
                        var customer = contrl.findCustomer(stop.customer);
                        contrl.openProfile(customer);
                        break;
                    case 4:
                        var alert_1 = contrl.alertCtrl.create({
                            title: 'Confirm completion',
                            message: 'Have you finished selling to this this location?',
                            buttons: [
                                'Cancel',
                                {
                                    text: 'Next',
                                    handler: function () {
                                        contrl.clearStop();
                                        marker.remove();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                        break;
                    case 5:
                        var alert1 = contrl.alertCtrl.create({
                            title: 'Confirm Unavailability',
                            message: 'This stop will be disabled for 12 hours?',
                            buttons: [
                                'Cancel',
                                {
                                    text: 'Next',
                                    handler: function () {
                                        contrl.clearStop();
                                        marker.remove();
                                        var res = stop.isCustomer ? "customers" : "locations";
                                        contrl.disableStop(res, stop._id);
                                    }
                                }
                            ]
                        });
                        alert1.present();
                        break;
                    default:
                        break;
                }
            });
        };
    };
    RouteHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-route-home',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-home\route-home.html"*/'<!--\n\n  Generated template for the RouteHomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title *ngIf="route">{{ route.name }}</ion-title>\n\n     <ion-buttons end>\n\n      <button (click)="shouldDelete(route)"  ion-button icon-only>\n\n        Clear data\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div id="map_canvas" class="map_content"></div>\n\n<ion-content *ngIf="route && route.status == \'pending\'" no-bounce style="margin-top: 40px;">\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-12>\n\n      <button ion-button *ngIf="route && route.stops" (click)="listView(route)" outline full>\n\n      	LIST VIEW\n\n      </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <button (click)="routeAction(route)" *ngIf="route && route.stops && route.stops.length != 0" ion-button color="info" full>\n\n       <span *ngIf="route.status == \'active\'">NEXT STOP</span>\n\n        <span *ngIf="route.status == \'complete\'">RESTART</span>\n\n       <span *ngIf="route.status == \'pending\'">START</span>\n\n    </button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-home\route-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_9__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_10__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */]])
    ], RouteHomePage);
    return RouteHomePage;
}());

//# sourceMappingURL=route-home.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteAddStopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_action_sheet__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__net_controller__ = __webpack_require__(31);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the RouteAddStopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RouteAddStopPage = /** @class */ (function (_super) {
    __extends(RouteAddStopPage, _super);
    function RouteAddStopPage(navCtrl, navParams, japi, napi, actionSheet) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.japi = japi;
        _this.napi = napi;
        _this.actionSheet = actionSheet;
        _this.assignedCustomers = [];
        _this.route = navParams.get("route");
        _this.customers = navParams.get("customers");
        _this.japi.http.get(_this.japi.URL + "truck_information", _this.japi.httpOptions)
            .subscribe(function (res) {
            if (res.data.stops)
                _this.assignedCustomers = res.data.stops;
            _this.fetchLocks();
        });
        return _this;
    }
    RouteAddStopPage.prototype.fetchLocks = function () {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "routeLocks", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.locks = res.data;
            _this.fetchEmployees();
        });
    };
    RouteAddStopPage.prototype.fetchEmployees = function () {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "employees", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.employees = res.data;
            _this.fetchLocations();
        });
    };
    RouteAddStopPage.prototype.getEmployeeName = function (email) {
        var result = "";
        for (var i = this.employees.length - 1; i >= 0; i--) {
            if (this.employees[i].email == email) {
                result = this.employees[i].name;
                break;
            }
        }
        return result;
    };
    RouteAddStopPage.prototype.lockedBy = function (location) {
        var result;
        for (var i = this.locks.length - 1; i >= 0; i--) {
            if (this.locks[i].locationId == location._id) {
                var owner = this.locks[i].owner;
                if (owner && owner.includes("@") && owner.length != 0) {
                    result = this.getEmployeeName(owner);
                }
                else {
                    result = "Unknown";
                }
                break;
            }
        }
        return result;
    };
    RouteAddStopPage.prototype.fetchLocations = function () {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "locations", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.locations = res.data;
            for (var i = _this.customers.length - 1; i >= 0; i--) {
                var customer = _this.customers[i];
                var hasLocation = _this.hasLocation(res.data, customer);
                if (!hasLocation) {
                    customer.customer = customer.name;
                    _this.locations.push(customer);
                }
            }
            _this.filterAssignedLocations();
            _this.filterReservedLocations();
            _this.loadMap();
        });
    };
    RouteAddStopPage.prototype.filterReservedLocations = function () {
        for (var i = this.locations.length - 1; i >= 0; i--) {
            var location_1 = this.locations[i];
            var reservedBy = this.lockedBy(location_1);
            if (reservedBy) {
                this.locations[i].name = location_1.name + " \u2014 Reserved by " + reservedBy;
            }
        }
    };
    RouteAddStopPage.prototype.filterAssignedLocations = function () {
        var newLocations = [];
        for (var i = this.locations.length - 1; i >= 0; i--) {
            if (this.assignedCustomers.indexOf(this.locations[i]._id) !== -1) {
                newLocations.push(this.locations[i]);
            }
        }
        if (newLocations.length == 0) {
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('Error, this employee has not been assigned any routes...', '', '');
        }
        this.locations = newLocations;
    };
    RouteAddStopPage.prototype.hasLocation = function (locations, customer) {
        var result = false;
        for (var i = locations.length - 1; i >= 0; i--) {
            if (locations[i].customer == customer.name) {
                result = true;
                break;
            }
        }
        return result;
    };
    RouteAddStopPage.prototype.focusTo = function (location) {
        this.filterString = "";
        this.map.animateCamera({
            target: { lat: location.geometry.location.lat, lng: location.geometry.location.lng },
            zoom: 18,
            tilt: 30,
            duration: 5000
        });
    };
    RouteAddStopPage.prototype.loadMap = function () {
        var centerAt = this.locations.length > 0 ? this.locations[0].geometry.location :
            { lat: 44.477500, lng: -73.174870 };
        var mapOptions = {
            camera: {
                target: {
                    lat: centerAt.lat,
                    lng: centerAt.lng
                },
                zoom: 18,
                tilt: 30
            }
        };
        this.map = __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_add', mapOptions);
        this.napi.addLocations(this.map, this.locations, 'red', this.generateActionHandler(this));
    };
    RouteAddStopPage.prototype.addStop = function (stop, marker) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "route_lock", stop, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show(res.message, '5000', 'top');
            if (res.success) {
                _this.route.stops.push(stop);
                _this.napi.updateRoute(_this.route);
                marker.remove();
            }
        });
    };
    RouteAddStopPage.prototype.generateActionHandler = function (contrl) {
        return function (stop, marker) {
            var buttonLabels = ['Take stop'];
            var options = {
                title: 'Add stop',
                subtitle: 'Choose an action',
                buttonLabels: buttonLabels,
                addDestructiveButtonWithLabel: 'Cancel',
                destructiveButtonLast: true
            };
            contrl.actionSheet.show(options).then(function (buttonIndex) {
                switch (buttonIndex) {
                    case 1:
                        // code...
                        contrl.addStop(stop, marker);
                        break;
                    default:
                        break;
                }
            });
        };
    };
    RouteAddStopPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-route-add-stop',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-add-stop\route-add-stop.html"*/'<!--\n\n  Generated template for the RouteHomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>ADD STOP</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n\n\n<div id="map_add" class="map_content"></div>\n\n\n\n<ion-content [style.height.px]="filterString == \'\' ? 105 : 400">\n\n  <ion-searchbar [(ngModel)]="filterString" placeholder="Search by customer name"></ion-searchbar>\n\n  <ion-list *ngIf="filterString != \'\'">\n\n    <ion-item *ngFor="let location of locations" [hidden]="!location.geometry || !inFilter(location.name)" (click)="focusTo(location)">\n\n        {{ location.name }} <span *ngIf="location.customer">— {{ location.customer }}</span>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-add-stop\route-add-stop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_action_sheet__["a" /* ActionSheet */]])
    ], RouteAddStopPage);
    return RouteAddStopPage;
}(__WEBPACK_IMPORTED_MODULE_7__net_controller__["a" /* NetController */]));

//# sourceMappingURL=route-add-stop.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentFlowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_cc_enter_cc__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signature_pad_signature_pad__ = __webpack_require__(247);
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
 * Generated class for the PaymentFlowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentFlowPage = /** @class */ (function () {
    function PaymentFlowPage(view, navParams, japi, alertCtrl, modalCtrl, napi) {
        this.view = view;
        this.navParams = navParams;
        this.japi = japi;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.napi = napi;
        this.cards = [];
        this.invoice = {};
        this.invoice = navParams.get("invoice");
        this.getTotal();
        this.getCards(this.invoice.history);
    }
    PaymentFlowPage.prototype.ionViewDidLoad = function () {
    };
    PaymentFlowPage.prototype.getTotal = function () {
        this.invoice.total = 0;
        this.invoice.taxValue = 0;
        for (var i = this.invoice.list.length - 1; i >= 0; i--) {
            var item = this.invoice.list[i];
            if (item.amt) {
                this.invoice.total += item.unitPrice * item.amt;
            }
            if (this.invoice.taxRate) {
                if (!item.category || !this.isTypeCoffee(item)) {
                    var itemTax = (item.unitPrice * item.amt) * (this.invoice.taxRate / 100);
                    this.invoice.taxValue += itemTax;
                }
            }
        }
    };
    PaymentFlowPage.prototype.isTypeCoffee = function (item) {
        var catString = item.category.join(",").toLowerCase();
        return catString.includes("coffee") || catString.includes("notax");
    };
    PaymentFlowPage.prototype.getCards = function (history) {
        this.cards = [];
        if (history) {
            for (var i = history.length - 1; i >= 0; i--) {
                var entry = history[i];
                if (entry.type == "CARD") {
                    var card = {
                        id: entry.id,
                        name: "Card on File # " + (i + 1)
                    };
                    this.cards.push(card);
                }
            }
        }
    };
    PaymentFlowPage.prototype.addCard = function (invoice) {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__enter_cc_enter_cc__["a" /* EnterCcPage */], {
            invoice: invoice
        });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                _this.invoice = data;
                _this.getCards(_this.invoice.history);
            }
        });
        profileModal.present();
    };
    PaymentFlowPage.prototype.charge = function (invoice) {
        var _this = this;
        if (invoice.method == "") {
            this.showAlert("Error", "Please select a payment method");
            return;
        }
        var signModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__signature_pad_signature_pad__["a" /* SignaturePadPage */], {});
        signModal.onDidDismiss(function (data) {
            console.log(data);
            if (!data) {
                _this.showAlert("Error", "No client signature was provided.");
                return;
            }
            _this.invoice.clientSignature = data;
            invoice.amount = parseFloat(invoice.amt);
            _this.japi.presentLoading();
            _this.japi.http.post(_this.japi.URL + "charge", invoice, _this.japi.httpOptions)
                .subscribe(function (res) {
                _this.japi.hideLoading();
                _this.showAlert(res.success ? 'Success' : 'Error', res.message);
                if (res.success) {
                    _this.invoice = res.data;
                    delete _this.invoice.check_number;
                    _this.napi.storage.set("shouldClear", "clear")
                        .then(function () { return console.log("should clear saved!"); });
                    _this.view.dismiss(_this.invoice);
                }
            });
        });
        signModal.present();
    };
    PaymentFlowPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    PaymentFlowPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    PaymentFlowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-payment-flow',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\payment-flow\payment-flow.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Collecting on #{{ invoice.id }} </ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="dismiss()" ion-button icon-only>\n\n        cancel\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="margin-top: 40px;">\n\n\n\n  \n\n\n\n  <div style="padding:15px;">\n\n    <h4>Subtotal : {{ invoice.total.toFixed(2) }} USD</h4>\n\n    <div *ngIf="invoice.taxRate">\n\n    <h4>Tax : {{ invoice.taxValue.toFixed(2) }} USD ({{ invoice.taxRate }} %)</h4>\n\n    </div>\n\n    <hr color="primary">\n\n    <h4>Total : {{ (invoice.taxValue + invoice.total).toFixed(2) }} USD</h4>\n\n    <h4>Amount left : {{ ( (invoice.taxValue + invoice.total) - (invoice.value ? invoice.value : 0) ).toFixed(2)  }} USD</h4>\n\n    <ion-item>\n\n      <ion-label>Payment method</ion-label>\n\n      <ion-select [(ngModel)]="invoice.method">\n\n        <ion-option>CASH</ion-option>\n\n        <ion-option>CHECK</ion-option>\n\n        <ion-option>UPDATE</ion-option>\n\n        <ion-option *ngFor="let card of cards" [value]="card.id">{{ card.name }}</ion-option>\n\n        <ion-option value="NEW">Add new card</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <button color="primary" (click)="addCard(invoice)" ion-button *ngIf="invoice.method ==\'NEW\'">ADD NEW CARD</button>\n\n    <ion-item *ngIf="invoice.method == \'CHECK\'">\n\n      <ion-label color="primary" floating>CHECK NUMBER</ion-label>\n\n      <ion-input [(ngModel)]="invoice.check_number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item >\n\n      <ion-label color="primary" floating>Amount to charge</ion-label>\n\n      <ion-input [(ngModel)]="invoice.amt"></ion-input>\n\n    </ion-item>\n\n\n\n  </div>\n\n</ion-content>\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <button ion-button full color="info" (click)="charge(invoice)" round>Collect</button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\payment-flow\payment-flow.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */]])
    ], PaymentFlowPage);
    return PaymentFlowPage;
}());

//# sourceMappingURL=payment-flow.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterCcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_stripe__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__ = __webpack_require__(6);
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
 * Generated class for the EnterCcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EnterCcPage = /** @class */ (function () {
    function EnterCcPage(navCtrl, navParams, stripe, view, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.stripe = stripe;
        this.view = view;
        this.japi = japi;
        this.card = {};
        this.invoice = navParams.get("invoice");
        stripe.setPublishableKey('my_publishable_key');
    }
    EnterCcPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    EnterCcPage.prototype.save = function (cc, invoice) {
        var _this = this;
        var card = {
            number: cc.number,
            expMonth: cc.month,
            expYear: cc.year,
            cvc: cc.cvc
        };
        this.stripe.createCardToken(card)
            .then(function (token) { return _this.storeToken(invoice, token); })
            .catch(function (error) { return _this.somethingWentWrong(); });
    };
    EnterCcPage.prototype.storeToken = function (invoice, token) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "customer_id", { token: token.id, customer: invoice.customer }, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            if (!res.sucess) {
                _this.somethingWentWrong();
                return;
            }
            if (!invoice.history)
                invoice.history = [];
            var timeID = (new Date()).getTime() + '';
            var card = {
                type: 'CARD',
                id: timeID,
                token: res.data
            };
            __WEBPACK_IMPORTED_MODULE_3__ToastReplacement__["a" /* Toast */].show('Card information saved.', '5000', 'top');
            invoice.history.push(card);
            invoice.method = timeID;
            _this.view.dismiss(invoice);
        });
    };
    EnterCcPage.prototype.somethingWentWrong = function () {
        __WEBPACK_IMPORTED_MODULE_3__ToastReplacement__["a" /* Toast */].show('Something went wrong, please try again.', '5000', 'top');
    };
    EnterCcPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-enter-cc',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\enter-cc\enter-cc.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Add a new credit card</ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="dismiss()" ion-button icon-only>\n\n        cancel\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="margin-top: 40px;">\n\n  <div style="padding:15px;">\n\n    <ion-item>\n\n      <ion-label color="primary" stacked>Credit card number</ion-label>\n\n      <ion-input type="text" [(ngModel)]="card.number" placeholder="000000000000"></ion-input>\n\n    </ion-item>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <ion-item>\n\n            <ion-label color="primary" stacked>Expiration Month</ion-label>\n\n            <ion-input type="number" [(ngModel)]="card.month" placeholder="00"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <ion-item>\n\n            <ion-label color="primary" stacked>Expiration Year</ion-label>\n\n            <ion-input type="number" [(ngModel)]="card.year" placeholder="0000"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <ion-item>\n\n      <ion-label color="primary" stacked>CVC code</ion-label>\n\n      <ion-input [(ngModel)]="card.cvc" type="text" placeholder="000"></ion-input>\n\n    </ion-item>\n\n  </div>\n\n</ion-content>\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <button ion-button full color="info" (click)="save(card, invoice)" round>Save</button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\enter-cc\enter-cc.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_stripe__["a" /* Stripe */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], EnterCcPage);
    return EnterCcPage;
}());

//# sourceMappingURL=enter-cc.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignaturePadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_signaturepad_signature_pad__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_signaturepad_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_signaturepad_signature_pad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
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
 * Generated class for the SignaturePadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignaturePadPage = /** @class */ (function () {
    function SignaturePadPage(navCtrl, navParams, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.signaturePadOptions = {
            'minWidth': 2,
            'canvasWidth': 450,
            'canvasHeight': 400
        };
    }
    SignaturePadPage.prototype.ionViewDidLoad = function () {
    };
    SignaturePadPage.prototype.ionViewDidEnter = function () {
        this.clear();
    };
    SignaturePadPage.prototype.dismiss = function () {
        this.view.dismiss(this.data);
    };
    SignaturePadPage.prototype.clear = function () {
        this.data = false;
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    };
    SignaturePadPage.prototype.drawComplete = function () {
        // will be notified of szimek/signature_pad's onEnd event
        this.data = this.signaturePad.toDataURL();
    };
    SignaturePadPage.prototype.drawStart = function () {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_angular2_signaturepad_signature_pad__["SignaturePad"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_angular2_signaturepad_signature_pad__["SignaturePad"])
    ], SignaturePadPage.prototype, "signaturePad", void 0);
    SignaturePadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signature-pad',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\signature-pad\signature-pad.html"*/'<!--\n\n  Generated template for the SignaturePadPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n  <ion-buttons start>\n\n      <button (click)="clear()" ion-button icon-only>\n\n        Clear\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Client signature</ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="dismiss()" ion-button icon-only>\n\n        Save\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-bounce >\n\n  <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\signature-pad\signature-pad.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["u" /* ViewController */]])
    ], SignaturePadPage);
    return SignaturePadPage;
}());

//# sourceMappingURL=signature-pad.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationApiProvider; });
/* unused harmony export LocationTool */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapping__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__java_api_java_api__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/*
  Generated class for the NavigationApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  handles background service...
*/
var NavigationApiProvider = /** @class */ (function (_super) {
    __extends(NavigationApiProvider, _super);
    function NavigationApiProvider(lctrl, storage, backgroundGeolocation, localNotifications, japi, device) {
        var _this = _super.call(this, lctrl) || this;
        _this.lctrl = lctrl;
        _this.storage = storage;
        _this.backgroundGeolocation = backgroundGeolocation;
        _this.localNotifications = localNotifications;
        _this.japi = japi;
        _this.device = device;
        _this.localIndex = [];
        _this.activeRoute = false;
        _this.locationTool = new LocationTool(_this.localNotifications);
        _this.locationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: false,
            stopOnTerminate: true,
        };
        return _this;
    }
    NavigationApiProvider.prototype.getCustomerID = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.localNotifications.isPresent(1)) {
                reject({});
                return;
            }
            _this.localNotifications.get(1)
                .then(function (notification) {
                resolve(notification.data);
            });
        });
    };
    NavigationApiProvider.prototype.makeId = function () {
        return Math.random().toString(36);
    };
    NavigationApiProvider.prototype.openInMaps = function (location) {
        var str = this.device.platform;
        var loc = location.geometry.location;
        var geocoords = loc.lat + ',' + loc.lng;
        if (str == "Android") {
            var label = encodeURI(location.name); // encode the label!
            window.open('geo:0,0?q=' + geocoords + '(' + label + ')', '_system');
            return;
        }
        window.open('maps://?q=' + geocoords, '_system');
    };
    NavigationApiProvider.prototype.getLocationInBackground = function () {
        var _this = this;
        this.backgroundGeolocation.configure(this.locationConfig)
            .subscribe(function (location) {
            // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
            // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
            // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
            _this.backgroundGeolocation.finish(); // FOR IOS ONLY
            _this.checkOnActiveRoute(location);
        });
        // start recording location
        this.backgroundGeolocation.start();
    };
    NavigationApiProvider.prototype.checkOnActiveRoute = function (location) {
        if (!this.activeRoute) {
            console.log("No route!!!");
            return;
        }
        var stopsLeft = this.locationTool.stopsRemaining(this.activeRoute.stops);
        if (stopsLeft == 0) {
            this.locationTool.alertComplete(this.activateRoute);
            this.removeRoute(this.activeRoute);
            this.activeRoute = false;
            return;
        }
        var anyId = this.locationTool.detectClosestStore(this.localIndex, location);
        if (anyId) {
            this.activeRoute = this.locationTool.clearStop(this.activeRoute, anyId);
            this.saveActiveRoute();
        }
    };
    // Route manager
    NavigationApiProvider.prototype.getRoutes = function () {
        var _this = this;
        this.presentLoading();
        this.storage.get('routes').then(function (val) {
            _this.hideLoading();
            if (!val) {
                return;
            }
            _this.localIndex = val;
            _this.setActiveRoute(_this.localIndex);
        });
    };
    NavigationApiProvider.prototype.getRouteByIdSync = function (id) {
        var result;
        this.storage.get('routes').then(function (val) {
            for (var i = val.length - 1; i >= 0; i--) {
                var rt = val[i];
                if (rt.id == id) {
                    result = rt;
                    break;
                }
            }
        });
        return result;
    };
    NavigationApiProvider.prototype.getRouteById = function (id) {
        var _this = this;
        this.presentLoading();
        return new Promise(function (resolve, reject) {
            _this.storage.get('routes').then(function (val) {
                _this.hideLoading();
                var found = false;
                if (val)
                    for (var i = val.length - 1; i >= 0; i--) {
                        var rt = val[i];
                        if (rt.id == id) {
                            resolve(rt);
                            found = true;
                            break;
                        }
                    }
                if (!found)
                    resolve(found);
            });
        });
    };
    NavigationApiProvider.prototype.saveRoutes = function () {
        this.storage.set("routes", this.localIndex);
    };
    NavigationApiProvider.prototype.saveActiveRoute = function () {
        var index = this.activeRoute;
        this.localIndex[index] = this.activeRoute;
        this.saveRoutes();
    };
    NavigationApiProvider.prototype.setActiveRoute = function (index) {
        for (var i = index.length - 1; i >= 0; i--) {
            if (index[i].active) {
                this.activeRoute = index[i];
                break;
            }
        }
    };
    NavigationApiProvider.prototype.activateRoute = function (route) {
        var index = this.routeIndex(route);
        if (this.anyActive()) {
            __WEBPACK_IMPORTED_MODULE_6__pages_ToastReplacement__["a" /* Toast */].show('You are already on another route.', '5000', 'top');
            return false;
        }
        route.active = true;
        this.activeRoute = route;
        this.localIndex[index] = route;
        this.saveRoutes();
        __WEBPACK_IMPORTED_MODULE_6__pages_ToastReplacement__["a" /* Toast */].show('Route started...', '5000', 'top');
        return true;
    };
    NavigationApiProvider.prototype.addRoute = function (name, stops, id) {
        this.localIndex.push({ id: id, name: name, status: 'pending', stops: [] });
        this.storage.set("routes", this.localIndex);
    };
    NavigationApiProvider.prototype.routeIndex = function (route) {
        var index = 0;
        for (var i = this.localIndex.length - 1; i >= 0; i--) {
            if (this.localIndex[i].id == route.id) {
                index = i;
                break;
            }
        }
        return index;
    };
    NavigationApiProvider.prototype.addLocations = function (map, locations, icon, action) {
        for (var i = locations.length - 1; i >= 0; i--) {
            var stop_1 = locations[i];
            if (!stop_1.cleared)
                this.setupMarker(map, stop_1, icon, action, i);
        }
    };
    NavigationApiProvider.prototype.anyActive = function () {
        var result = false;
        for (var i = this.localIndex.length - 1; i >= 0; i--) {
            if (this.localIndex[i].active) {
                result = true;
                break;
            }
        }
        return result;
    };
    NavigationApiProvider.prototype.setupMarker = function (map, stop, icon, action, index) {
        if (!stop.geometry)
            return;
        var coords = stop.geometry.location;
        //.lng
        var marker = map.addMarkerSync({
            title: stop.name + "\nStop #" + (index + 1),
            icon: icon,
            animation: 'DROP',
            position: {
                lat: coords.lat,
                lng: coords.lng
            }
        });
        if (marker.on)
            marker.on(__WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK).subscribe(function () {
                action(stop, marker);
            });
    };
    NavigationApiProvider.prototype.updateRoute = function (route) {
        var index = this.routeIndex(route);
        this.localIndex[index] = route;
        this.saveRoutes();
        this.storage.set("route_order_" + route._id, JSON.stringify(route.stops));
        if (route.active) {
            this.activeRoute = route;
        }
    };
    NavigationApiProvider.prototype.generateRouteLocationIDs = function (stops) {
        var ids = [];
        for (var i = 0; i < stops.length; i++) {
            ids.push(stops[i]._id);
        }
        return ids;
    };
    NavigationApiProvider.prototype.releaseLocations = function (route) {
        if (!route.stops) {
            return;
        }
        var locations = this.generateRouteLocationIDs(route.stops);
        for (var i = locations.length - 1; i >= 0; i--) {
            var location_1 = locations[i];
            this.japi.http.delete(this.japi.URL + "route_lock/" + location_1, this.japi.httpOptions)
                .subscribe(function (res) {
            });
        }
    };
    NavigationApiProvider.prototype.removeRoute = function (route) {
        // this.releaseLocations(route);
        var index = this.routeIndex(route);
        this.localIndex.splice(index, 1);
        this.storage.set("routes", this.localIndex);
    };
    NavigationApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_9__java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */]])
    ], NavigationApiProvider);
    return NavigationApiProvider;
}(__WEBPACK_IMPORTED_MODULE_2__mapping__["a" /* Loadable */]));

var LocationTool = /** @class */ (function () {
    function LocationTool(localNotifications) {
        this.localNotifications = localNotifications;
    }
    LocationTool.prototype.detectClosestStore = function (index, location) {
        //1.2
        var inRange = 0.5; // km
        var stopId = false;
        for (var i = index.length - 1; i >= 0; i--) {
            var stop_2 = index[i];
            var coords = stop_2.geometry.location;
            var distance = this.getDistanceFromLatLonInKm(coords.lat, coords.lng, location.latitude, location.longitude);
            if (distance <= inRange) {
                this.alert(stop_2);
                stopId = stop_2._id;
                break;
            }
        }
        return stopId;
    };
    LocationTool.prototype.stopsRemaining = function (stops) {
        var result = 0;
        if (stops)
            for (var i = stops.length - 1; i >= 0; i--) {
                if (stops[i].cleared)
                    result++;
            }
        return result;
    };
    LocationTool.prototype.clearStop = function (route, stop) {
        for (var i = route.stops.length - 1; i >= 0; i--) {
            var s = route.stops[i];
            if (s._id == stop) {
                route.stops[i].cleared = true;
                break;
            }
        }
        return route;
    };
    LocationTool.prototype.alert = function (stop) {
        if (this.localNotifications.isPresent(1)) {
            return;
        }
        this.localNotifications.schedule({
            id: 1,
            text: "Your are near " + stop.name + ", tap on this notification to open this customer's profile. ",
            sound: null,
            data: { customer: stop.customer, id: stop._id }
        });
    };
    LocationTool.prototype.alertComplete = function (route) {
        this.localNotifications.schedule({
            id: 1,
            text: "You completed your route " + route.name + ".",
            sound: null
        });
    };
    LocationTool.prototype.getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    };
    LocationTool.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    return LocationTool;
}());

//# sourceMappingURL=navigation-api.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutePickPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picker_choose_route_picker_choose_route__ = __webpack_require__(251);
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
 * Generated class for the RoutePickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RoutePickPage = /** @class */ (function () {
    function RoutePickPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.routes = [];
        this.routeLocks = [];
        this.truck = { name: "" };
        this.route = {};
    }
    RoutePickPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RoutePickPage');
    };
    RoutePickPage.prototype.openRoute = function (route) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__picker_choose_route_picker_choose_route__["a" /* PickerChooseRoutePage */], {
            route: route,
            truck: this.truck
        });
    };
    RoutePickPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter');
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "truck_information", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            if (!res.success) {
                return;
            }
            _this.truck = res.data;
            _this.routes = res.data.routes;
        });
    };
    RoutePickPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-route-pick',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-pick\route-pick.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Route Selection</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h1>SELECT A ROUTE</h1>\n\n</div>\n\n<ion-content style="margin-top: 40px;">\n\n  <ion-list>\n\n\n\n\n\n    <ion-item *ngFor="let route of routes" (click)="openRoute(route)">\n\n      <ion-label style="flex:5" item-start>\n\n        <ion-icon [color]="(route.done || route.picked) ? \'success\' : \'danger\'" name="checkmark-circle"></ion-icon>\n\n        {{ route.name }}\n\n      </ion-label>\n\n      <ion-label item-end style="text-align: right;position: relative;top: -6px;">\n\n        <ion-icon>\n\n          <p class="text-muted">\n\n            <ion-icon color="primary" name="arrow-forward"></ion-icon>\n\n          </p>\n\n        </ion-icon>\n\n      </ion-label>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\route-pick\route-pick.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], RoutePickPage);
    return RoutePickPage;
}());

//# sourceMappingURL=route-pick.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerChooseRoutePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stopsto_pick_stopsto_pick__ = __webpack_require__(130);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the PickerChooseRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PickerChooseRoutePage = /** @class */ (function (_super) {
    __extends(PickerChooseRoutePage, _super);
    function PickerChooseRoutePage(navCtrl, navParams, japi) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.japi = japi;
        _this.api = _this.japi;
        _this.routes = [];
        _this.routeLocks = [];
        _this.truck = { name: "" };
        _this.route = {};
        _this.routeArr = [];
        _this.route = navParams.get("route");
        _this.truck = navParams.get("truck");
        return _this;
    }
    PickerChooseRoutePage.prototype.getTruckStatus = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "routeLocks", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.routeLocks = res.data;
        });
    };
    PickerChooseRoutePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter PickerChooseRoutePage');
        this.getTruckStatus();
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "picker_routes", this.route, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            if (!res.success) {
                return;
            }
            _this.sortByRoute(res.data);
            _this.routeArr = res.data.route;
        });
    };
    PickerChooseRoutePage.prototype.isLocked = function (truck) {
        var result = false;
        for (var i = this.routeLocks.length - 1; i >= 0; i--) {
            if (this.routeLocks[i].locationId == truck) {
                result = true;
                break;
            }
        }
        return result;
    };
    PickerChooseRoutePage.prototype.openRoute = function (route) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__stopsto_pick_stopsto_pick__["a" /* StopstoPickPage */], {
            id: route._id,
            truck: this.truck,
            route: this.routeArr,
            routeName: this.route.name
        });
    };
    PickerChooseRoutePage.prototype.sortByRoute = function (picker_route) {
        this.routes = [];
        if (picker_route.route)
            for (var i = picker_route.route.length - 1; i >= 0; i--) {
                var r = picker_route.route[i];
                var l = this.getLocationById(picker_route.orders, r);
                if (l) {
                    this.routes.push(l);
                }
            }
    };
    PickerChooseRoutePage.prototype.getLocationById = function (locations, id) {
        var result = false;
        for (var i = 0; i < locations.length; i++) {
            var l = locations[i];
            if (id == l.location) {
                result = l;
                break;
            }
        }
        return result;
    };
    PickerChooseRoutePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-picker-choose-route',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\picker-choose-route\picker-choose-route.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Invoice Selection</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h1>SELECT AN INVOICE</h1>\n\n</div>\n\n<ion-content style="margin-top: 40px;">\n\n  <div style="text-align: center;padding: 10px;">\n\n    <ion-chip *ngIf="truck.name" style="width: 80%; text-align: center;margin: 0 auto;">\n\n      <ion-icon name="car" color="primary"></ion-icon>\n\n      <ion-label>LOADING TO {{ truck.name }}</ion-label>\n\n    </ion-chip>\n\n  </div>\n\n  <ion-list>\n\n\n\n\n\n    <ion-item *ngFor="let route of routes" (click)="openRoute(route)">\n\n      <ion-label style="flex:5" item-start>\n\n        <ion-icon [color]="route.done ? \'success\' : \'danger\'" name="checkmark-circle"></ion-icon>\n\n        {{ route.id }} | {{ route.customer }}\n\n      </ion-label>\n\n      <ion-label item-end style="text-align: right;position: relative;top: -6px;">\n\n        <ion-icon>\n\n          <p class="text-muted">\n\n            <ion-icon color="primary" name="arrow-forward"></ion-icon>\n\n          </p>\n\n        </ion-icon>\n\n      </ion-label>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\picker-choose-route\picker-choose-route.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], PickerChooseRoutePage);
    return PickerChooseRoutePage;
}(__WEBPACK_IMPORTED_MODULE_3__net_controller__["a" /* NetController */]));

//# sourceMappingURL=picker-choose-route.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckinVendorProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_new_product_add_new_product__ = __webpack_require__(253);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the CheckinVendorProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CheckinVendorProductPage = /** @class */ (function (_super) {
    __extends(CheckinVendorProductPage, _super);
    function CheckinVendorProductPage(navCtrl, navParams, japi, alertCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.japi = japi;
        _this.alertCtrl = alertCtrl;
        _this.willAssign = false;
        _this.barcode = navParams.get("barcode");
        _this.editMode = navParams.get("editMode");
        return _this;
    }
    CheckinVendorProductPage.prototype.itemAction = function (item, barcode) {
        var _this = this;
        var buttons = [
            'Cancel',
            {
                text: 'Assign barcode',
                handler: function () {
                    _this.assignBarcode(item, barcode);
                }
            },
            {
                text: 'Update item',
                handler: function () {
                    _this.editProduct(item);
                }
            }
        ];
        if (this.editMode) {
            buttons.splice(1, 1);
        }
        var alert = this.alertCtrl.create({
            title: 'Pick an action.',
            message: 'Pick an action to perform on item.',
            buttons: buttons
        });
        alert.present();
    };
    CheckinVendorProductPage.prototype.assignBarcode = function (item, barcode) {
        var _this = this;
        if (!item.barcode)
            item.barcode = [barcode];
        if (item.barcode)
            item.barcode.push(barcode);
        this.japi.presentLoading();
        this.japi.http.put(this.japi.URL + "items/" + item._id, item, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            if (!res.success) {
                __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show('Barcode was not saved, please try again', '5000', 'top');
                return;
            }
            __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show('Barcode saved, please scan again.', '5000', 'top');
            _this.navCtrl.pop();
        });
    };
    CheckinVendorProductPage.prototype.addProduct = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__add_new_product_add_new_product__["a" /* AddNewProductPage */], { items: this.items });
    };
    CheckinVendorProductPage.prototype.editProduct = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__add_new_product_add_new_product__["a" /* AddNewProductPage */], { items: this.items, item: item });
    };
    CheckinVendorProductPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.get(this.japi.URL + "items", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.items = res.data;
        });
    };
    CheckinVendorProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CheckinVendorProductPage');
    };
    CheckinVendorProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-checkin-vendor-product',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\checkin-vendor-product\checkin-vendor-product.html"*/'<!--\n\n  Generated template for the PickProductPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Checker Product Selection</ion-title>\n\n \n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h1>SELECT PRODUCT</h1>\n\n</div>\n\n<ion-content style="margin-top: 40px;">\n\n  <div style="padding:5px;" *ngIf="!willAssign">\n\n    <button ion-button (click)="willAssign = true" style="height: 130px;margin-bottom:10px;" color="primary">Assign to a Product</button>\n\n    <button ion-button (click)="addProduct()" style="height: 130px;margin-bottom:10px;" color="primary">Add New Product</button>\n\n\n\n  </div>\n\n  <ion-list *ngIf="willAssign">\n\n    <ion-item color="light">\n\n      <ion-label color="primary" floating>\n\n        <ion-icon name="search"></ion-icon> Search by name</ion-label>\n\n      <ion-input [(ngModel)]="filterString" value="" type="text"></ion-input>\n\n    </ion-item>\n\n    <ion-item *ngFor="let item of items" [hidden]="!inFilter(item.itemName)" (click)="itemAction(item, barcode)">\n\n      <ion-label text-wrap style="flex:6" item-start>\n\n        {{ item.itemName }} <br/> Warehouse : {{ item.warehouse }}\n\n      </ion-label>\n\n\n\n      <ion-label item-end style="text-align: right;position: relative;top: -6px;">\n\n        <ion-icon>\n\n          <p class="text-muted">\n\n            <ion-icon color="primary" name="barcode"></ion-icon>\n\n          </p>\n\n        </ion-icon>\n\n      </ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\checkin-vendor-product\checkin-vendor-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], CheckinVendorProductPage);
    return CheckinVendorProductPage;
}(__WEBPACK_IMPORTED_MODULE_3__net_controller__["a" /* NetController */]));

//# sourceMappingURL=checkin-vendor-product.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddNewProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the AddNewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddNewProductPage = /** @class */ (function (_super) {
    __extends(AddNewProductPage, _super);
    function AddNewProductPage(navCtrl, navParams, japi, alertCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.japi = japi;
        _this.alertCtrl = alertCtrl;
        _this.item = {};
        _this.categories = ["NOTAX"];
        _this.api = japi;
        japi.http.get(japi.URL + "locations", japi.httpOptions)
            .subscribe(function (res) {
            _this.locations = [];
            for (var i = res.data.length - 1; i >= 0; i--) {
                var location_1 = res.data[i];
                if (location_1.category == "WAREHOUSE") {
                    _this.locations.push(location_1.name);
                }
            }
        });
        _this.customersList = _this.fetchResourceList("customersList", "customers", "name", _this.generateResourceFilter("", ""));
        _this.vendors = _this.fetchResourceList("vendors", "vendors", "name", _this.generateResourceFilter("", ""));
        var items = navParams.get("items");
        var tempItem = navParams.get("item");
        if (tempItem) {
            _this.item = tempItem;
        }
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            _this.mergeCategories(item.category);
        }
        return _this;
    }
    AddNewProductPage.prototype.mergeCategories = function (category) {
        if (!category)
            return;
        for (var i = category.length - 1; i >= 0; i--) {
            var cat = category[i];
            if (this.categories.indexOf(cat) === -1) {
                this.categories.push(cat);
            }
        }
    };
    AddNewProductPage.prototype.newCat = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Add new category',
            inputs: [
                {
                    name: 'category',
                    placeholder: 'Category name'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Add',
                    handler: function (data) {
                        if (!data.category)
                            return;
                        _this.categories.push(data.category);
                    }
                },
                {
                    text: 'Set for item',
                    handler: function (data) {
                        if (!data.category)
                            return;
                        _this.categories.push(data.category);
                        if (!_this.item.category)
                            _this.item.category = [];
                        _this.item.category.push(data.category);
                    }
                }
            ]
        });
        alert.present();
    };
    AddNewProductPage.prototype.updateProduct = function (item) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.put(this.japi.URL + "items/" + item._id, item, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.closeView(res);
        });
    };
    AddNewProductPage.prototype.saveProduct = function (item) {
        var _this = this;
        //convert to array.
        item.barcode = [item.barcode];
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "items", item, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.closeView(res);
        });
    };
    AddNewProductPage.prototype.closeView = function (res) {
        this.japi.hideLoading();
        __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show(res.message, '', '');
        if (res.success) {
            this.navCtrl.pop();
        }
    };
    AddNewProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddNewProductPage');
    };
    AddNewProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-new-product',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\add-new-product\add-new-product.html"*/'<!--\n\n  Generated template for the AddNewProductPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title *ngIf="!item._id">New item</ion-title>\n\n    <ion-title *ngIf="item._id">Edit item</ion-title>\n\n    <ion-buttons end>\n\n      <button *ngIf="!item._id" (click)="saveProduct(item)" ion-button icon-only>\n\n        Save (done)\n\n      </button>\n\n      <button *ngIf="item._id" (click)="updateProduct(item)" ion-button icon-only>\n\n        Update\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content  >\n\n  <ion-list>\n\n   <ion-item-divider color="dark">\n\n       Product information\n\n    </ion-item-divider>\n\n    <ion-item>\n\n      <ion-label>Vendor</ion-label>\n\n      <ion-select [(ngModel)]="item.vendor">\n\n        <ion-option *ngFor="let vendor of vendors" [value]="vendor">{{ vendor }}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n     <ion-item>\n\n      <ion-label>Warehouse</ion-label>\n\n      <ion-select [(ngModel)]="item.warehouse">\n\n        <ion-option *ngFor="let warehouse of locations" [value]="warehouse">{{ warehouse }}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Name</ion-label>\n\n      <ion-input [(ngModel)]="item.itemName"></ion-input>\n\n    </ion-item>\n\n    <ion-item *ngIf="!item._id">\n\n      <ion-label color="primary" floating>Barcode</ion-label>\n\n      <ion-input [(ngModel)]="item.barcode"></ion-input>\n\n    </ion-item>\n\n    \n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n            <ion-item>\n\n              <ion-label color="primary" floating>Units (Quantity)</ion-label>\n\n              <ion-input [(ngModel)]="item.unit" type="number"></ion-input>\n\n            </ion-item>\n\n        </ion-col>\n\n        <ion-col>\n\n             <ion-item>\n\n              <ion-label color="primary" floating>Unit cost</ion-label>\n\n              <ion-input [(ngModel)]="item.unitCost" type="number"></ion-input>\n\n            </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n   \n\n    <ion-item>\n\n      <ion-label color="primary" floating>Unit price</ion-label>\n\n      <ion-input [(ngModel)]="item.unitPrice" type="number"></ion-input>\n\n    </ion-item>\n\n     <ion-item>\n\n      <ion-label color="primary" floating>SKU</ion-label>\n\n      <ion-input [(ngModel)]="item.sku" type="text"></ion-input>\n\n    </ion-item>\n\n     <ion-item>\n\n      <ion-label color="primary" floating>Alert below</ion-label>\n\n      <ion-input [(ngModel)]="item.alertBelow" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Category</ion-label>\n\n      <ion-select multiple="true" [(ngModel)]="item.category">\n\n        <ion-option *ngFor="let category of categories" [value]="category">{{ category }}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n     \n\n    <button (click)="newCat()" ion-button  icon-start color="primary"><ion-icon name="add-circle"></ion-icon> Add category.</button>\n\n\n\n    <ion-item-divider color="dark">\n\n       Warehouse information\n\n    </ion-item-divider>\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Aisle #</ion-label>\n\n      <ion-input [(ngModel)]="item.aisle" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Bin #</ion-label>\n\n      <ion-input [(ngModel)]="item.bin" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Bay #</ion-label>\n\n      <ion-input [(ngModel)]="item.bay" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item-divider color="dark">\n\n       Item Dimensions\n\n    </ion-item-divider>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Weight</ion-label>\n\n      <ion-input [(ngModel)]="item.weight" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Length</ion-label>\n\n      <ion-input [(ngModel)]="item.length" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Height</ion-label>\n\n      <ion-input [(ngModel)]="item.height" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary" floating>Width</ion-label>\n\n      <ion-input [(ngModel)]="item.width" type="number"></ion-input>\n\n    </ion-item>\n\n\n\n    <div *ngIf="item._id">\n\n      <ion-item-divider  color="dark">\n\n        Barcodes\n\n      </ion-item-divider>\n\n\n\n      <ion-item *ngFor="let bar of item.barcode">\n\n        <ion-label>\n\n          <p>{{ bar }}</p>\n\n        </ion-label>\n\n        <button ion-button fill="outline" (click)="item.barcode.splice(item.barcode.indexOf(bar), 1)" slot="end">Delete</button>\n\n      </ion-item>\n\n       <button ion-button style="height: 130px;margin-bottom:10px;" color="primary">Add barcode</button>\n\n    </div>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\add-new-product\add-new-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AddNewProductPage);
    return AddNewProductPage;
}(__WEBPACK_IMPORTED_MODULE_3__net_controller__["a" /* NetController */]));

//# sourceMappingURL=add-new-product.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_product_edit_product__ = __webpack_require__(255);
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
 * Generated class for the PickProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductSelectionPage = /** @class */ (function () {
    function ProductSelectionPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
    }
    ProductSelectionPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    ProductSelectionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    ProductSelectionPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    ProductSelectionPage.prototype.editProduct = function () {
        console.log("clicked");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edit_product_edit_product__["a" /* EditProductPage */]);
    };
    ProductSelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-product-selection',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\product-selection\product-selection.html"*/'<!--\n\n  Generated template for the PickProductPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">PRODUCT SELECTION</div>\n\n      <ion-icon name="add"></ion-icon>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="d-flex-middle d-flex-between px-20px">\n\n    <div class="d-flex-middle search-pan">\n\n      <ion-icon name="search"></ion-icon>\n\n      <ion-input placeholder="Search Product or Barcode"></ion-input>\n\n    </div>\n\n    <ion-icon name="camera" class="scanner-camera"></ion-icon>\n\n  </div>\n\n  \n\n  <div class="prod-item d-flex-middle border-bottom-0">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content">\n\n      <ion-row class="prod-controls">\n\n        <ion-col col-8>\n\n          <div class="prod-btn">\n\n            New Transfer Request\n\n          </div>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <div class="prod-btn">\n\n            New PO\n\n          </div>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="editProduct()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name">Super Candy</span>\n\n        <div class="item-unit">\n\n          <span>120 Units</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>Aisle 1</span> |\n\n        <span>Shelf 3</span> |\n\n        <span>Bin 6</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\product-selection\product-selection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], ProductSelectionPage);
    return ProductSelectionPage;
}());

//# sourceMappingURL=product-selection.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
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
 * Generated class for the PickProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditProductPage = /** @class */ (function () {
    function EditProductPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
    }
    EditProductPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    EditProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    EditProductPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    EditProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-product',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\edit-product\edit-product.html"*/'<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">Edit Product</div>\n\n      <span>SAVE</span>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="sub-header">\n\n    Product Information: Super Candy\n\n  </div>  \n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <div class="more-detail">\n\n    MORE DETAILS\n\n  </div>\n\n</ion-footer>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\edit-product\edit-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], EditProductPage);
    return EditProductPage;
}());

//# sourceMappingURL=edit-product.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PodSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_pod_edit_pod__ = __webpack_require__(257);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PodSelectionPage = /** @class */ (function () {
    function PodSelectionPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
    }
    PodSelectionPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    PodSelectionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    PodSelectionPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    PodSelectionPage.prototype.editPOD = function () {
        // console.log("clicked");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edit_pod_edit_pod__["a" /* EditPodPage */]);
    };
    PodSelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pod-selection',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\pod-selection\pod-selection.html"*/'<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">POD SELECTION</div>\n\n      <ion-icon name="add"></ion-icon>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="d-flex-middle d-flex-between px-20px">\n\n    <div class="d-flex-middle search-pan">\n\n      <ion-icon name="search"></ion-icon>\n\n      <ion-input placeholder="Search Pod or Barcode"></ion-input>\n\n    </div>\n\n    <ion-icon name="camera" class="scanner-camera"></ion-icon>\n\n  </div>\n\n  \n\n  <div class="prod-item d-flex-middle border-bottom-0">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content">\n\n      <ion-row class="prod-controls">\n\n        <ion-col col-6>\n\n          <div class="prod-btn">\n\n            Delete Pods\n\n          </div>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="editPOD()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name">Super Candy</span>\n\n        <div class="item-unit">\n\n          <span>120 Filled</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>Aisle 1</span> |\n\n        <span>Shelf 3</span> |\n\n        <span>Bin 6</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\pod-selection\pod-selection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], PodSelectionPage);
    return PodSelectionPage;
}());

//# sourceMappingURL=pod-selection.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPodPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditPodPage = /** @class */ (function () {
    function EditPodPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
    }
    EditPodPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    EditPodPage.prototype.ionViewDidLoad = function () {
    };
    EditPodPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    EditPodPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-pod',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\edit-pod\edit-pod.html"*/'\n\n<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">Edit POD</div>\n\n      <span>SAVE</span>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="sub-header">\n\n    Product Information: Super Candy\n\n  </div>  \n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <div class="more-detail">\n\n    MORE DETAILS\n\n  </div>\n\n</ion-footer>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\edit-pod\edit-pod.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], EditPodPage);
    return EditPodPage;
}());

//# sourceMappingURL=edit-pod.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnkownBarcodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UnkownBarcodePage = /** @class */ (function () {
    function UnkownBarcodePage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
    }
    UnkownBarcodePage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    UnkownBarcodePage.prototype.ionViewDidLoad = function () {
    };
    UnkownBarcodePage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    UnkownBarcodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-unkown-barcode',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\unkown-barcode\unkown-barcode.html"*/'\n\n\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">Edit POD</div>\n\n      <span>SAVE</span>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="sub-header">\n\n    Product Information: Super Candy\n\n  </div>  \n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\unkown-barcode\unkown-barcode.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], UnkownBarcodePage);
    return UnkownBarcodePage;
}());

//# sourceMappingURL=unkown-barcode.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderChannelsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picker_checker_dash_picker_checker_dash__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_routes_tab_order_routes_tab__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stops_selection_stops_selection__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrderChannelsPage = /** @class */ (function () {
    function OrderChannelsPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__order_routes_tab_order_routes_tab__["a" /* OrderRoutesTabPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_4__order_routes_tab_order_routes_tab__["a" /* OrderRoutesTabPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__order_routes_tab_order_routes_tab__["a" /* OrderRoutesTabPage */];
    }
    OrderChannelsPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    OrderChannelsPage.prototype.ionViewDidLoad = function () {
    };
    OrderChannelsPage.prototype.gotoPrevPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__picker_checker_dash_picker_checker_dash__["a" /* PickerCheckerDashPage */]);
    };
    OrderChannelsPage.prototype.gotoStopsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__stops_selection_stops_selection__["a" /* StopsSelectionPage */]);
    };
    OrderChannelsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-channels',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\order-channels\order-channels.html"*/'\n\n<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="order-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">ORDER CHANNELS</div>\n\n      <ion-icon name="md-sync" (click)="gotoPrevPage()"></ion-icon>\n\n    </ion-col>\n\n  </ion-row>\n\n  <!-- <super-tabs>\n\n    <super-tab [root]="tab1Root" title="ROUTES"></super-tab>\n\n    <super-tab [root]="tab2Root" title="SHOPIFY"></super-tab>\n\n    <super-tab [root]="tab3Root" title="MAGENTO"></super-tab>\n\n  </super-tabs> -->\n\n  <super-tabs>\n\n    <super-tab [root]="tab1Root" title="ROUTES"></super-tab>\n\n    <super-tab [root]="tab2Root" title="SHOPIFY"></super-tab>\n\n    <super-tab [root]="tab3Root" title="MAGENTO"></super-tab>\n\n  </super-tabs>\n\n  <div class="routes-progress-outer">\n\n    <div class="routes-progress-inner" style="width: 33.33%">\n\n    </div>\n\n    <div class="routes-pro"><span class="routes-done">1</span>/3 Routes</div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle green-color">\n\n    <ion-icon name="md-checkmark-circle"></ion-icon>\n\n    <div class="prod-content" (click)="gotoStopsPage()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name">Southern Route</span>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>34 Stops</span> |\n\n        <span>20 Products</span>\n\n      </div>\n\n    </div>\n\n    <ion-icon name="ios-arrow-forward"></ion-icon>\n\n  </div>\n\n  <div class="prod-item d-flex-middle orange-color">\n\n    <ion-icon name="md-checkmark-circle" class="prod-checkbox"></ion-icon>\n\n    <div class="prod-content" (click)="gotoStopsPage()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name">Burlington Route</span>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>15/<span class="all-routes">20</span> Stops</span> |\n\n        <span>20 Products</span>\n\n      </div>\n\n    </div>\n\n    <ion-icon name="ios-arrow-forward"></ion-icon>\n\n  </div>\n\n  <div class="prod-item d-flex-middle red-color">\n\n    <ion-icon name="md-checkmark-circle" class="prod-checkbox"></ion-icon>\n\n    <div class="prod-content" (click)="gotoStopsPage()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name">Essex Route</span>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>15/<span class="all-routes">20</span> Stops</span> |\n\n        <span>12/<span class="all-routes">20</span> Products</span>\n\n      </div>\n\n    </div>\n\n    <ion-icon name="ios-arrow-forward"></ion-icon>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\order-channels\order-channels.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], OrderChannelsPage);
    return OrderChannelsPage;
}());

//# sourceMappingURL=order-channels.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderRoutesTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stops_selection_stops_selection__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrderRoutesTabPage = /** @class */ (function () {
    function OrderRoutesTabPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
    }
    OrderRoutesTabPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    OrderRoutesTabPage.prototype.ionViewDidLoad = function () {
    };
    OrderRoutesTabPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    OrderRoutesTabPage.prototype.gotoStopsPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__stops_selection_stops_selection__["a" /* StopsSelectionPage */]);
    };
    OrderRoutesTabPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-routes-tab',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\order-routes-tab\order-routes-tab.html"*/'<div class="routes-progress-outer">\n\n  <div class="routes-progress-inner" style="width: 33.33%">\n\n    \n\n  </div>\n\n  <div class="routes-pro"><span class="routes-done">1</span>/3 Routes</div>\n\n</div>\n\n<div class="prod-item d-flex-middle green-color">\n\n  <ion-icon name="md-checkmark-circle"></ion-icon>\n\n  <div class="prod-content" (click)="gotoStopsPage()">\n\n    <div class="prod-item-header">\n\n      <span class="item-name">Southern Route</span>\n\n    </div>\n\n    <div class="prod-item-summary">\n\n      <span>34 Stops</span> |\n\n      <span>20 Products</span>\n\n    </div>\n\n  </div>\n\n  <ion-icon name="ios-arrow-forward"></ion-icon>\n\n</div>\n\n<div class="prod-item d-flex-middle orange-color">\n\n  <ion-icon name="md-checkmark-circle" class="prod-checkbox"></ion-icon>\n\n  <div class="prod-content" (click)="gotoStopsPage()">\n\n    <div class="prod-item-header">\n\n      <span class="item-name">Burlington Route</span>\n\n    </div>\n\n    <div class="prod-item-summary">\n\n      <span>15/<span class="all-routes">20</span> Stops</span> |\n\n      <span>20 Products</span>\n\n    </div>\n\n  </div>\n\n  <ion-icon name="ios-arrow-forward"></ion-icon>\n\n</div>\n\n<div class="prod-item d-flex-middle red-color">\n\n  <ion-icon name="md-checkmark-circle" class="prod-checkbox"></ion-icon>\n\n  <div class="prod-content" (click)="gotoStopsPage()">\n\n    <div class="prod-item-header">\n\n      <span class="item-name">Essex Route</span>\n\n    </div>\n\n    <div class="prod-item-summary">\n\n      <span>15/<span class="all-routes">20</span> Stops</span> |\n\n      <span>12/<span class="all-routes">20</span> Products</span>\n\n    </div>\n\n  </div>\n\n  <ion-icon name="ios-arrow-forward"></ion-icon>\n\n</div>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\order-routes-tab\order-routes-tab.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], OrderRoutesTabPage);
    return OrderRoutesTabPage;
}());

//# sourceMappingURL=order-routes-tab.js.map

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickingOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scanning_scanning__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PickingOrderPage = /** @class */ (function () {
    function PickingOrderPage(navCtrl, navParams, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.print_type = "invoice";
    }
    PickingOrderPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    PickingOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    PickingOrderPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    PickingOrderPage.prototype.editPOD = function () {
        // console.log("clicked");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__scanning_scanning__["a" /* ScanningPage */]);
    };
    PickingOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-picking-order',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\picking-order\picking-order.html"*/'<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">PICKING</div>\n\n      <ion-icon name="md-sync"></ion-icon>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="sub-title">\n\n    <div class="d-flex-between align-item-center">\n\n      <span class="sub-title-circle"></span>\n\n      <span>YOUR STORE</span>\n\n      <span class="btn-detail">View</span>\n\n    </div>\n\n  </div>\n\n  <div class="routes-progress-outer">\n\n    <div class="routes-progress-inner" style="width: 33.33%">\n\n    </div>\n\n    <div class="routes-pro"><span class="routes-done">1</span>/3 <span class="routes-done">Items</span></div>\n\n  </div> \n\n  <div class="prod-item d-flex-middle border-bottom-0">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="print-types">\n\n      <ion-select [(ngModel)]="print_type" >\n\n        <ion-option value="invoice">Print Invoice</ion-option>\n\n        <ion-option value="Tickets">Print Picking Tickets</ion-option>\n\n        <ion-option value="Labels">Print Shipping Labels</ion-option>\n\n      </ion-select>\n\n      <div class="prod-btn">Print</div>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="editPOD()" [style.background-color]="\'$green-color\'">\n\n      <div class="prod-item-header">\n\n        <span class="item-name green-color">Super Candy</span>\n\n        <div class="item-unit">\n\n          <div class="progress">Picked</div>\n\n          <span class="progress-status">10/10</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n          <span>Aisle 6 | Shelf 3 | Bin 6</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="editPOD()" [style.background-color]="\'$orange-color\'">\n\n      <div class="prod-item-header">\n\n        <span class="item-name orange-color">Awesome Product</span>\n\n        <div class="item-unit">\n\n          <div class="progress orange-bg-color">In Process</div>\n\n          <span class="progress-status">7/40</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n          <span>Aisle 3 | Shelf 6 | Bin 5</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="prod-item d-flex-middle">\n\n    <ion-checkbox class="prod-checkbox"></ion-checkbox>\n\n    <div class="prod-content" (click)="editPOD()">\n\n      <div class="prod-item-header">\n\n        <span class="item-name red-color">Good Stuff</span>\n\n        <div class="item-unit">\n\n          <div class="progress red-bg-color">Incomplete</div>\n\n          <span class="progress-status">0/8</span>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <div class="prod-item-summary">\n\n        <span>Aisle 6 | Shelf 2 | Bin 3</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\picking-order\picking-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], PickingOrderPage);
    return PickingOrderPage;
}());

//# sourceMappingURL=picking-order.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_iot_api_iot_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScanningPage = /** @class */ (function () {
    function ScanningPage(navCtrl, navParams, japi, iapi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.iapi = iapi;
        this.print_type = "invoice";
    }
    ScanningPage.prototype.ionViewDidEnter = function () {
        this.japi.storage.get("name")
            .then(function (data) {
            // this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    ScanningPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    ScanningPage.prototype.gotoPrevPage = function () {
        this.navCtrl.pop();
    };
    ScanningPage.prototype.editPOD = function () {
        // console.log("clicked");
        // this.navCtrl.push(EditPodPage);
    };
    ScanningPage.prototype.startScanning = function () {
        this.iapi.scanBarcode()
            .then(function (code) {
            console.log(code);
        })
            .catch(function (err) {
            __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show("Error, barcode was not scanned!", "", "");
        });
    };
    ScanningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-scanning',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\scanning\scanning.html"*/'<core-toolbar></core-toolbar>\n\n\n\n<ion-content>\n\n  <ion-row>\n\n    <ion-col class="product-header px-20px">\n\n      <ion-icon name="ios-arrow-back" (click)="gotoPrevPage()"></ion-icon>\n\n      <div class="title">SCANNING</div>\n\n      <ion-icon name="md-sync"></ion-icon>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="sub-title">\n\n    <div class="d-flex-between align-item-center">\n\n      <span class="sub-title-circle"></span>\n\n      <span>AWESOME PRODUCT</span>\n\n      <span ></span>\n\n    </div>\n\n  </div>\n\n  <div>\n\n    <ion-input placeholder="Enter Barcode Manually"></ion-input>\n\n  </div>\n\n  <div class="barcord-scanning" (click)="startScanning()">\n\n    select \n\n  </div>\n\n</ion-content>\n\n<ion-footer>\n\n  <div>Quantity 8/8</div>\n\n  <div class="btn-next">\n\n    NEXT: SUPER CANDY\n\n  </div>\n\n</ion-footer>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\scanning\scanning.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_iot_api_iot_api__["a" /* IotApiProvider */]])
    ], ScanningPage);
    return ScanningPage;
}());

//# sourceMappingURL=scanning.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordLossPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToastReplacement__ = __webpack_require__(15);
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
 * Generated class for the RecordLossPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RecordLossPage = /** @class */ (function () {
    function RecordLossPage(navCtrl, navParams, japi, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.japi = japi;
        this.alertCtrl = alertCtrl;
        this.items = [];
        this.customers = [];
        this.filterVal = "";
        japi.presentLoading();
        japi.http.get(this.japi.URL + "items", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.items = res.data;
        });
        this.getCustomers();
    }
    RecordLossPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecordLossPage');
    };
    RecordLossPage.prototype.itemAction = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Enter amount of " + item.itemName + " to add.",
            inputs: [
                {
                    name: 'amt',
                    placeholder: 'Amount',
                    type: 'number'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Add loss',
                    handler: function (data) {
                        var loss = {
                            itemPrice: item.unitCost,
                            itemName: item.itemName,
                            vendor: item.vendor,
                            amount: parseInt(data.amt),
                            customer: _this.customer,
                            reason: _this.reason
                        };
                        _this.save(loss);
                    }
                }
            ]
        });
        alert.present();
    };
    RecordLossPage.prototype.save = function (loss) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "losss", loss, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            if (res.success) {
                __WEBPACK_IMPORTED_MODULE_3__ToastReplacement__["a" /* Toast */].show('Loss recorded, you may add another one.', '', '');
                _this.customer = false;
                return;
            }
            __WEBPACK_IMPORTED_MODULE_3__ToastReplacement__["a" /* Toast */].show('Error recording loss, please try again', '', '');
        });
    };
    RecordLossPage.prototype.getCustomers = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "customers", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.customers = res.data;
        });
    };
    RecordLossPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-record-loss',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\record-loss\record-loss.html"*/'<!--\n\n  Generated template for the CustomerProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Record loss</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h4>Select items lost</h4>\n\n  <hr color="light" />\n\n</div>\n\n<ion-content style="margin-top: 180px;height:calc(100% - 180px)">\n\n\n\n  <ion-item>\n\n    <ion-label>Reason for loss</ion-label>\n\n    <ion-select [(ngModel)]="reason">\n\n      <ion-option value="spoiled">Spoiled</ion-option>\n\n      <ion-option value="free">Promotional</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item *ngIf="reason == \'free\'">\n\n    <ion-label>Customer</ion-label>\n\n    <ion-select [(ngModel)]="customer">\n\n      <ion-option *ngFor="let customer of customers;" [value]="customer.name">{{ customer.name }}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-searchbar [(ngModel)]="filterVal"></ion-searchbar>\n\n  <ion-list>\n\n    <ion-item *ngFor="let item of items"\n\n      [hidden]="filterVal.length != 0 && !( item.itemName.toLowerCase().includes(filterVal.toLowerCase()) || item.vendor.toLowerCase().includes(filterVal.toLowerCase()) )"\n\n      (click)="itemAction(item)">\n\n      <ion-label item-start># {{ item.itemName }} | {{ item.vendor }}</ion-label>\n\n      <ion-label item-content style="flex:4">| {{ item.unitPrice.toFixed(2) }} USD</ion-label>\n\n\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\record-loss\record-loss.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RecordLossPage);
    return RecordLossPage;
}());

//# sourceMappingURL=record-loss.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_mapping__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__ = __webpack_require__(15);
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
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UpdatePasswordPage = /** @class */ (function () {
    function UpdatePasswordPage(navCtrl, navParams, view, japi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.japi = japi;
        this.data = {};
    }
    UpdatePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UpdatePasswordPage');
    };
    UpdatePasswordPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    UpdatePasswordPage.prototype.update = function (data) {
        var _this = this;
        this.japi.http.post(__WEBPACK_IMPORTED_MODULE_3__providers_mapping__["b" /* Mapping */].baseURL + "/auth/update_password", data, this.japi.httpOptions)
            .subscribe(function (res) {
            __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show(res.message, "", "");
            if (res.success) {
                _this.view.dismiss();
            }
        });
    };
    UpdatePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-update-password',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\update-password\update-password.html"*/'<!--\n\n  Generated template for the UpdatePasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Update password</ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="dismiss()" ion-button icon-only>\n\n        Cancel\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label floating>\n\n        <ion-icon name="lock"></ion-icon> Current Password</ion-label>\n\n      <ion-input type="password" [(ngModel)]="data.current"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating>\n\n        <ion-icon name="lock"></ion-icon> New Password</ion-label>\n\n      <ion-input [(ngModel)]="data.new" type="password"></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n  <button ion-button color="danger" (click)="update(data)">UPDATE PASSWORD</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\update-password\update-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_java_api_java_api__["a" /* JavaApiProvider */]])
    ], UpdatePasswordPage);
    return UpdatePasswordPage;
}());

//# sourceMappingURL=update-password.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetController; });
var NetController = /** @class */ (function () {
    function NetController() {
    }
    NetController.prototype.inFilter = function (str) {
        return !this.filterString || str.toLowerCase().includes(this.filterString.toLowerCase());
    };
    NetController.prototype.inDateRange = function (item, range) {
        if (range == "All") {
            return true;
        }
        var now = (new Date()).getTime();
        var least = now - this.getLeastTimeAllowed(range);
        var itemDate = (new Date(item.createdAt)).getTime();
        return itemDate > least;
    };
    NetController.prototype.getLeastTimeAllowed = function (opt) {
        var time = 0;
        switch (opt) {
            case "24":
                // code...
                time = 84600 * 1000;
                break;
            case "1":
                time = this.getLeastTimeAllowed("24") * 7;
                break;
            default:
                // code...
                time = this.getLeastTimeAllowed("1") * 4;
                break;
        }
        return time;
    };
    NetController.prototype.generateResourceFilter = function (k, m) {
        return function (obj) {
            if (obj[k] == m || k == "") {
                return true;
            }
            return false;
        };
    };
    NetController.prototype.fetchResourceList = function (varName, resource, key, filter) {
        var _this = this;
        this.api.http.get("" + this.api.URL + resource, this.api.httpOptions)
            .subscribe(function (res) {
            var list = [];
            for (var i = res.data.length - 1; i >= 0; i--) {
                var item = res.data[i];
                var displayedVal = item[key];
                if (filter(item) && displayedVal && displayedVal != "") {
                    list.push(displayedVal);
                }
            }
            _this[varName] = list;
        });
        return [];
    };
    return NetController;
}());

//# sourceMappingURL=net_controller.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(415);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IotApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wrapper__ = __webpack_require__(483);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the IotApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var IotApiProvider = /** @class */ (function () {
    function IotApiProvider(http, japi) {
        this.http = http;
        this.japi = japi;
    }
    IotApiProvider.prototype.readyLinea = function () {
        if (!this.linea) {
            this.linea = new __WEBPACK_IMPORTED_MODULE_4__wrapper__["a" /* Linea */]();
            this.linea.checkIfSet();
        }
    };
    IotApiProvider.prototype.scanBarcode = function () {
        return new Promise(function (resolve, reject) {
            window["cordova"].plugins.barcodeScanner.scan(function (result) {
                resolve(result.text);
            }, function (error) {
                reject(error);
            });
        });
    };
    IotApiProvider.prototype.printSticker = function (text) {
        if (!window["cordova"] || !window["cordova"].plugins || !window["cordova"].plugins.printer) {
            return;
        }
        window["cordova"].plugins.printer.print(text.split("\n").join("<br>"), { duplex: 'long', border: false }, function (res) {
            __WEBPACK_IMPORTED_MODULE_3__pages_ToastReplacement__["a" /* Toast */].show(res ? 'Text printed' : 'Error printing text, please try again.', '', '');
        });
    };
    IotApiProvider.prototype.print = function (invoice) {
        var _this = this;
        this.japi.presentLoading();
        this.japi.http.post(this.japi.URL + "print_invoice_text", invoice, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.getLocation(invoice)
                .then(function (location) {
                _this.japi.hideLoading();
                var fileContent = res.data.replace("|DATE|", "Date : " + (new Date()).toLocaleString().split(",")[0]).replace("\n", "<br/>");
                if (location && location.pickup) {
                    fileContent = fileContent.replace("|LOCATION|", "PICKUP");
                }
                if (location && location.name) {
                    fileContent = fileContent.replace("|LOCATION|", location.name + "<br>" + location.address);
                }
                window["cordova"].plugins.printer.print("<p style=\"font-size:25px;\">" + fileContent + "</p>", { duplex: 'long', border: false }, function (res) {
                    __WEBPACK_IMPORTED_MODULE_3__pages_ToastReplacement__["a" /* Toast */].show(res ? 'Invoice printed' : 'Error printing invoice, please try again.', '', '');
                });
            });
        });
    };
    IotApiProvider.prototype.getLocation = function (invoice) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!invoice.location) {
                resolve({ pickup: true });
                return;
            }
            _this.japi.http.get(_this.japi.URL + "/locations/" + invoice.location, _this.japi.httpOptions)
                .subscribe(function (res) {
                if (!res.data) {
                    _this.japi.http.get(_this.japi.URL + "/customers/" + invoice.location, _this.japi.httpOptions)
                        .subscribe(function (res) {
                        resolve(res.data);
                    });
                }
                if (res.data) {
                    resolve(res.data);
                }
            });
        });
    };
    IotApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__java_api_java_api__["a" /* JavaApiProvider */]])
    ], IotApiProvider);
    return IotApiProvider;
}());

//# sourceMappingURL=iot-api.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_salesman_dashboard_salesman_dashboard__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_customer_profile_customer_profile__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_new_order_search_new_order_search__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_salesman_choose_route_salesman_choose_route__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_route_home_route_home__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_route_add_stop_route_add_stop__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_route_list_route_list__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_salesman_stopon_route_salesman_stopon_route__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_salesman_customer_order_summary_salesman_customer_order_summary__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_picker_checker_dash_picker_checker_dash__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_picker_choose_route_picker_choose_route__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_route_pick_route_pick__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_stopsto_pick_stopsto_pick__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_pick_product_pick_product__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_signature_pad_signature_pad__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_update_password_update_password__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_salesman_customer_order_summary_filterPipe__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_add_new_product_add_new_product__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_record_loss_record_loss__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_checkin_vendor_product_checkin_vendor_product__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_assignvendor_product_details_assignvendor_product_details__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_invoice_invoice__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_driver_nav_driver_nav__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_devices_devices__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_device__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_enter_cc_enter_cc__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_payment_flow_payment_flow__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_splash_screen__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_components_module__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_angular2_chartjs__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_angular2_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_angular2_chartjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_iot_api_iot_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_common_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_storage__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_background_geolocation__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_background_fetch__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_geolocation__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_local_notifications__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_action_sheet__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_stripe__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_angular2_signaturepad__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_angular2_signaturepad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_48_angular2_signaturepad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_angular_progress_bar__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_call_number__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_social_sharing__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_secure_storage__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_product_selection_product_selection__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_edit_product_edit_product__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_pod_selection_pod_selection__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_edit_pod_edit_pod__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_unkown_barcode_unkown_barcode__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_order_channels_order_channels__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_order_routes_tab_order_routes_tab__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_stops_selection_stops_selection__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_picking_order_picking_order__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_scanning_scanning__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















































//import { Toast } from '@ionic-native/toast';
















var components = [
    __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
    __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_6__pages_salesman_dashboard_salesman_dashboard__["a" /* SalesmanDashboardPage */],
    __WEBPACK_IMPORTED_MODULE_7__pages_customer_profile_customer_profile__["a" /* CustomerProfilePage */],
    __WEBPACK_IMPORTED_MODULE_8__pages_new_order_search_new_order_search__["a" /* NewOrderSearchPage */],
    __WEBPACK_IMPORTED_MODULE_9__pages_salesman_choose_route_salesman_choose_route__["a" /* SalesmanChooseRoutePage */],
    __WEBPACK_IMPORTED_MODULE_10__pages_route_home_route_home__["a" /* RouteHomePage */],
    __WEBPACK_IMPORTED_MODULE_11__pages_route_add_stop_route_add_stop__["a" /* RouteAddStopPage */],
    __WEBPACK_IMPORTED_MODULE_12__pages_route_list_route_list__["a" /* RouteListPage */],
    __WEBPACK_IMPORTED_MODULE_13__pages_salesman_stopon_route_salesman_stopon_route__["a" /* SalesmanStoponRoutePage */],
    __WEBPACK_IMPORTED_MODULE_14__pages_salesman_customer_order_summary_salesman_customer_order_summary__["a" /* SalesmanCustomerOrderSummaryPage */],
    __WEBPACK_IMPORTED_MODULE_32__pages_payment_flow_payment_flow__["a" /* PaymentFlowPage */],
    __WEBPACK_IMPORTED_MODULE_15__pages_picker_checker_dash_picker_checker_dash__["a" /* PickerCheckerDashPage */],
    __WEBPACK_IMPORTED_MODULE_16__pages_picker_choose_route_picker_choose_route__["a" /* PickerChooseRoutePage */],
    __WEBPACK_IMPORTED_MODULE_53__pages_product_selection_product_selection__["a" /* ProductSelectionPage */],
    __WEBPACK_IMPORTED_MODULE_55__pages_pod_selection_pod_selection__["a" /* PodSelectionPage */],
    __WEBPACK_IMPORTED_MODULE_54__pages_edit_product_edit_product__["a" /* EditProductPage */],
    __WEBPACK_IMPORTED_MODULE_56__pages_edit_pod_edit_pod__["a" /* EditPodPage */],
    __WEBPACK_IMPORTED_MODULE_57__pages_unkown_barcode_unkown_barcode__["a" /* UnkownBarcodePage */],
    __WEBPACK_IMPORTED_MODULE_58__pages_order_channels_order_channels__["a" /* OrderChannelsPage */],
    __WEBPACK_IMPORTED_MODULE_59__pages_order_routes_tab_order_routes_tab__["a" /* OrderRoutesTabPage */],
    __WEBPACK_IMPORTED_MODULE_60__pages_stops_selection_stops_selection__["a" /* StopsSelectionPage */],
    __WEBPACK_IMPORTED_MODULE_61__pages_picking_order_picking_order__["a" /* PickingOrderPage */],
    __WEBPACK_IMPORTED_MODULE_62__pages_scanning_scanning__["a" /* ScanningPage */],
    __WEBPACK_IMPORTED_MODULE_18__pages_stopsto_pick_stopsto_pick__["a" /* StopstoPickPage */],
    __WEBPACK_IMPORTED_MODULE_19__pages_pick_product_pick_product__["a" /* PickProductPage */],
    __WEBPACK_IMPORTED_MODULE_25__pages_checkin_vendor_product_checkin_vendor_product__["a" /* CheckinVendorProductPage */],
    __WEBPACK_IMPORTED_MODULE_26__pages_assignvendor_product_details_assignvendor_product_details__["a" /* AssignvendorProductDetailsPage */],
    __WEBPACK_IMPORTED_MODULE_27__pages_invoice_invoice__["a" /* InvoicePage */],
    __WEBPACK_IMPORTED_MODULE_31__pages_enter_cc_enter_cc__["a" /* EnterCcPage */],
    __WEBPACK_IMPORTED_MODULE_29__pages_devices_devices__["a" /* DevicesPage */],
    __WEBPACK_IMPORTED_MODULE_28__pages_driver_nav_driver_nav__["a" /* DriverNavPage */],
    __WEBPACK_IMPORTED_MODULE_20__pages_signature_pad_signature_pad__["a" /* SignaturePadPage */],
    __WEBPACK_IMPORTED_MODULE_23__pages_add_new_product_add_new_product__["a" /* AddNewProductPage */],
    __WEBPACK_IMPORTED_MODULE_24__pages_record_loss_record_loss__["a" /* RecordLossPage */],
    __WEBPACK_IMPORTED_MODULE_21__pages_update_password_update_password__["a" /* UpdatePasswordPage */],
    __WEBPACK_IMPORTED_MODULE_17__pages_route_pick_route_pick__["a" /* RoutePickPage */]
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_salesman_dashboard_salesman_dashboard__["a" /* SalesmanDashboardPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_customer_profile_customer_profile__["a" /* CustomerProfilePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_new_order_search_new_order_search__["a" /* NewOrderSearchPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_salesman_choose_route_salesman_choose_route__["a" /* SalesmanChooseRoutePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_route_home_route_home__["a" /* RouteHomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_route_add_stop_route_add_stop__["a" /* RouteAddStopPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_route_list_route_list__["a" /* RouteListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_salesman_stopon_route_salesman_stopon_route__["a" /* SalesmanStoponRoutePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_salesman_customer_order_summary_salesman_customer_order_summary__["a" /* SalesmanCustomerOrderSummaryPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_payment_flow_payment_flow__["a" /* PaymentFlowPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_picker_checker_dash_picker_checker_dash__["a" /* PickerCheckerDashPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_picker_choose_route_picker_choose_route__["a" /* PickerChooseRoutePage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_product_selection_product_selection__["a" /* ProductSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_pod_selection_pod_selection__["a" /* PodSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_edit_product_edit_product__["a" /* EditProductPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_edit_pod_edit_pod__["a" /* EditPodPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_unkown_barcode_unkown_barcode__["a" /* UnkownBarcodePage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_order_channels_order_channels__["a" /* OrderChannelsPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_order_routes_tab_order_routes_tab__["a" /* OrderRoutesTabPage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_stops_selection_stops_selection__["a" /* StopsSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_picking_order_picking_order__["a" /* PickingOrderPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_scanning_scanning__["a" /* ScanningPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_stopsto_pick_stopsto_pick__["a" /* StopstoPickPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pick_product_pick_product__["a" /* PickProductPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_checkin_vendor_product_checkin_vendor_product__["a" /* CheckinVendorProductPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_assignvendor_product_details_assignvendor_product_details__["a" /* AssignvendorProductDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_invoice_invoice__["a" /* InvoicePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_enter_cc_enter_cc__["a" /* EnterCcPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_devices_devices__["a" /* DevicesPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_driver_nav_driver_nav__["a" /* DriverNavPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_signature_pad_signature_pad__["a" /* SignaturePadPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_add_new_product_add_new_product__["a" /* AddNewProductPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_record_loss_record_loss__["a" /* RecordLossPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_update_password_update_password__["a" /* UpdatePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_route_pick_route_pick__["a" /* RoutePickPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_salesman_customer_order_summary_filterPipe__["a" /* ItemFilter */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_35__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_36_angular2_chartjs__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/checkin-product-new/checkin-product-new.module#CheckinProductNewPageModule', name: 'CheckinProductNewPage', segment: 'checkin-product-new', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_40__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_48_angular2_signaturepad__["SignaturePadModule"],
                __WEBPACK_IMPORTED_MODULE_49_angular_progress_bar__["a" /* ProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_35__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_36_angular2_chartjs__["ChartModule"],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicApp */]],
            entryComponents: components,
            providers: [
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_37__providers_java_api_java_api__["a" /* JavaApiProvider */],
                __WEBPACK_IMPORTED_MODULE_38__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
                __WEBPACK_IMPORTED_MODULE_39__providers_iot_api_iot_api__["a" /* IotApiProvider */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_stripe__["a" /* Stripe */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_action_sheet__["a" /* ActionSheet */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_background_fetch__["a" /* BackgroundFetch */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_50__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_52__ionic_native_secure_storage__["a" /* SecureStorage */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_salesman_dashboard_salesman_dashboard__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_picker_checker_dash_picker_checker_dash__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_new_order_search_new_order_search__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_customer_profile_customer_profile__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_driver_nav_driver_nav__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_iot_api_iot_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_record_loss_record_loss__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_update_password_update_password__ = __webpack_require__(264);
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
    function MyApp(platform, statusBar, splashScreen, japi, napi, alt, iapi, modalCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.japi = japi;
        this.napi = napi;
        this.alt = alt;
        this.iapi = iapi;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.currentPageName = "";
        this.initializeApp();
        __WEBPACK_IMPORTED_MODULE_13__pages_ToastReplacement__["a" /* Toast */].alt = alt;
        try {
            napi.getLocationInBackground();
        }
        catch (e) {
            console.log(e);
        }
        this.pages = [
            { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_5__pages_salesman_dashboard_salesman_dashboard__["a" /* SalesmanDashboardPage */], show: 'sale' },
            { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_6__pages_picker_checker_dash_picker_checker_dash__["a" /* PickerCheckerDashPage */], show: 'picker' },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_9__pages_driver_nav_driver_nav__["a" /* DriverNavPage */], show: 'driver' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.japi.isLoggedIn()
                .then(function (token) {
                // if(token)
                _this.japi.setToken(token);
                _this.japi.loadType();
                _this.japi.getType()
                    .then(function (type) {
                    _this.openInterface(type);
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyApp.prototype.recordLoss = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_14__pages_record_loss_record_loss__["a" /* RecordLossPage */], {});
    };
    MyApp.prototype.testPrinter = function () {
        this.iapi.printSticker("Hello World'");
    };
    MyApp.prototype.openInterface = function (type) {
        switch (type) {
            case "sale":
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_salesman_dashboard_salesman_dashboard__["a" /* SalesmanDashboardPage */]);
                break;
            case "driver":
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_driver_nav_driver_nav__["a" /* DriverNavPage */]);
                break;
            default:
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_picker_checker_dash_picker_checker_dash__["a" /* PickerCheckerDashPage */]);
                break;
        }
    };
    MyApp.prototype.ionViewDidEnter = function () {
        this.fetchCustomers();
    };
    MyApp.prototype.updatePassword = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_15__pages_update_password_update_password__["a" /* UpdatePasswordPage */], {});
        profileModal.present();
    };
    MyApp.prototype.checkNotifications = function () {
        var _this = this;
        this.napi.getCustomerID()
            .then(function (res) {
            var customer = _this.getCustomer(res.customer);
            if (!customer)
                return;
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_customer_profile_customer_profile__["a" /* CustomerProfilePage */], {
                customer: customer
            });
        });
    };
    MyApp.prototype.fetchCustomers = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "customers", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.customers = res.data;
            _this.checkNotifications();
        });
    };
    MyApp.prototype.logout = function () {
        this.japi.logout();
        this.napi.localIndex = [];
        this.napi.saveRoutes();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.getCustomer = function (name) {
        var result = false;
        for (var i = this.customers.length - 1; i >= 0; i--) {
            if (this.customers[i].name == name) {
                result = this.customers[i];
                break;
            }
        }
        return result;
    };
    MyApp.prototype.newOrder = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_new_order_search_new_order_search__["a" /* NewOrderSearchPage */], { action: 0 });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.currentPageName = page.title;
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\app\app.html"*/'<ion-menu side="right" type="overlay" [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>MENU</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content class="side-menu">\n\n    <ion-list>\n\n      <div *ngFor="let p of pages">\n\n        <ion-item menuClose *ngIf="p.show == japi.accountType" (click)="openPage(p)">\n\n          {{p.title}}\n\n        </ion-item>\n\n      </div>\n\n      <ion-item menuClose *ngIf="japi.accountType ==\'sale\' || japi.accountType ==\'driver\'" (click)="newOrder()">\n\n        New Order\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="japi.accountType != \'\' ">\n\n        Customers\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="japi.accountType != \'\' ">\n\n       Routes\n\n      </ion-item>\n\n\n\n\n\n      <ion-item *ngIf="japi.accountType != \'\' " (click)="updatePassword()">\n\n        Update password\n\n      </ion-item>\n\n\n\n      <ion-item menuClose *ngIf="japi.accountType != \'\' " (click)="recordLoss()">\n\n        Record loss\n\n      </ion-item>\n\n      <ion-item menuClose *ngIf="japi.accountType != \'\' " (click)="logout()">\n\n        Logout\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_12__providers_iot_api_iot_api__["a" /* IotApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Linea; });
var Linea = /** @class */ (function () {
    function Linea() {
        //this.initialize();
    }
    Linea.prototype.checkIfSet = function () {
    };
    Linea.prototype.scan = function () {
        var _this = this;
        this.checkIfSet();
        return new Promise(function (resolve, reject) {
            _this.lineaPlugin.scan(resolve, reject);
        });
    };
    Linea.prototype.printSticker = function (text) {
        return new Promise(function (resolve, reject) {
            window["cordova"].exec(function (succ) {
                resolve(succ);
            }, function (err) {
                reject(err);
            }, 'lineaPlugin', 'printSticker', [text]);
        });
    };
    Linea.prototype.connectDevice = function (pin, id) {
        var _this = this;
        this.checkIfSet();
        return new Promise(function (resolve, reject) {
            _this.lineaPlugin.connectDevice(pin, id, resolve, reject);
        });
    };
    Linea.prototype.listDevices = function () {
        var _this = this;
        this.checkIfSet();
        return new Promise(function (resolve, reject) {
            _this.lineaPlugin.listDevices(resolve, reject);
        });
    };
    Linea.prototype.initialize = function () {
        return new Promise(function (resolve, reject) {
            window["cordova"].exec(function (succ) {
                resolve(succ);
            }, function (err) {
                reject(err);
            }, 'lineaPlugin', 'initialize', []);
        });
    };
    Linea.prototype.disconnectDevice = function () {
        var _this = this;
        this.checkIfSet();
        return new Promise(function (resolve, reject) {
            _this.lineaPlugin.disconnectDevice(resolve, reject);
        });
    };
    Linea.prototype.lastScanned = function () {
        var _this = this;
        this.checkIfSet();
        return new Promise(function (resolve, reject) {
            _this.lineaPlugin.lastScanned(resolve, reject);
        });
    };
    return Linea;
}());

//# sourceMappingURL=wrapper.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesmanStoponRoutePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__salesman_customer_order_summary_salesman_customer_order_summary__ = __webpack_require__(53);
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
 * Generated class for the SalesmanStoponRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SalesmanStoponRoutePage = /** @class */ (function () {
    function SalesmanStoponRoutePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SalesmanStoponRoutePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalesmanStoponRoutePage');
    };
    SalesmanStoponRoutePage.prototype.viewSummary = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__salesman_customer_order_summary_salesman_customer_order_summary__["a" /* SalesmanCustomerOrderSummaryPage */], {});
    };
    SalesmanStoponRoutePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-salesman-stopon-route',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-stopon-route\salesman-stopon-route.html"*/'<!--\n\n  Generated template for the CustomerProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Stop 1</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only>\n\n        done\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n</div>\n\n<ion-content style="margin-top: 270px;">\n\n  <h3 style="text-align: center;">RECENT ORDERS</h3>\n\n  <ion-segment color="dark" [(ngModel)]="pet" style="margin:10px auto;width: 90%;">\n\n    <ion-segment-button value="kittens">\n\n      Kittens\n\n    </ion-segment-button>\n\n    <ion-segment-button value="puppies">\n\n      Puppies\n\n    </ion-segment-button>\n\n    <ion-segment-button value="puppie">\n\n      Puppies\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n  <ion-list>\n\n    <ion-item >\n\n      	<ion-label item-start>#ID | Vendor name  </ion-label>\n\n      	<ion-label item-content>| Price</ion-label>\n\n      	<ion-label item-end style="text-align: right;">\n\n      		<p class="text-muted">\n\n      			# X\n\n      		</p>\n\n      	</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <button ion-button color="danger" full round>Round Button</button>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <button ion-button full color="info" (click)="viewSummary()" round>Round Button</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-stopon-route\salesman-stopon-route.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], SalesmanStoponRoutePage);
    return SalesmanStoponRoutePage;
}());

//# sourceMappingURL=salesman-stopon-route.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickProductPage; });
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
 * Generated class for the PickProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PickProductPage = /** @class */ (function () {
    function PickProductPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PickProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickProductPage');
    };
    PickProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pick-product',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\pick-product\pick-product.html"*/'<!--\n\n  Generated template for the PickProductPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Current stop to pick</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h1>PICKING : ROUTE NAME</h1>\n\n</div>\n\n<ion-content padding>\n\n	<div style="text-align: center;">\n\n		<h3 >10 PRODUCTS LEFT</h3>\n\n		<img src="https://placehold.it/300x300" style="max-width: 240px;" >\n\n		<p>SCANNING: SKU | Name | Price USD</p>\n\n	</div>\n\n</ion-content>\n\n\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <button ion-button full color="info" round>SCAN (X) MORE</button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\pick-product\pick-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], PickProductPage);
    return PickProductPage;
}());

//# sourceMappingURL=pick-product.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemFilter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ItemFilter = /** @class */ (function () {
    function ItemFilter() {
    }
    ItemFilter.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return item.itemName.toLowerCase().indexOf(filter.toLowerCase()) !== -1; });
    };
    ItemFilter = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'itemfilter',
            pure: false
        })
    ], ItemFilter);
    return ItemFilter;
}());

//# sourceMappingURL=filterPipe.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignvendorProductDetailsPage; });
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
 * Generated class for the AssignvendorProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AssignvendorProductDetailsPage = /** @class */ (function () {
    function AssignvendorProductDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AssignvendorProductDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AssignvendorProductDetailsPage');
    };
    AssignvendorProductDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-assignvendor-product-details',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\assignvendor-product-details\assignvendor-product-details.html"*/'<!--\n\n  Generated template for the SalesmanChooseRoutePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Find item</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h1>SELECT ITEM</h1>\n\n</div>\n\n<ion-content style="margin-top: 40px;">\n\n  <ion-list>\n\n    <ion-item color="light">\n\n      <ion-label color="light" floating>\n\n        <ion-icon name="search"></ion-icon> Search for customer</ion-label>\n\n      <ion-input type="text"></ion-input>\n\n    </ion-item>\n\n    <ion-item (click)="assignTo()">\n\n      <ion-label item-start>\n\n        NAME\n\n      </ion-label>\n\n      <ion-label item-end style="text-align: right;position: relative;top: -6px;">\n\n        <ion-icon>\n\n          <p class="text-muted">SKU\n\n            <ion-icon color="primary" name="arrow-forward"></ion-icon>\n\n          </p>\n\n        </ion-icon>\n\n      </ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\assignvendor-product-details\assignvendor-product-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */]])
    ], AssignvendorProductDetailsPage);
    return AssignvendorProductDetailsPage;
}());

//# sourceMappingURL=assignvendor-product-details.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_iot_api_iot_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__ = __webpack_require__(15);
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
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DevicesPage = /** @class */ (function () {
    function DevicesPage(navCtrl, navParams, iapi, japi, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iapi = iapi;
        this.japi = japi;
        this.alertCtrl = alertCtrl;
        this.devices = [];
    }
    DevicesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.refreshId = setInterval(function () {
            _this.iapi.linea.listDevices()
                .then(function (devices) {
                _this.devices = devices;
            });
        }, 1500);
    };
    DevicesPage.prototype.ionViewDidLeave = function () {
        clearInterval(this.refreshId);
    };
    DevicesPage.prototype.connectTo = function (device) {
        var _this = this;
        var deviceInformation = { name: device };
        var index = this.devices.indexOf(deviceInformation.name);
        //this.iapi.linea.connectDevice()
        var prompt = this.alertCtrl.create({
            title: "Connect to " + deviceInformation.name + " ",
            message: "Enter the pin code of the device you wish to connect to.",
            inputs: [
                {
                    name: 'pin',
                    placeholder: 'PIN'
                },
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Connect',
                    handler: function (data) {
                        if (!data.pin)
                            return;
                        deviceInformation.pin = data.pin;
                        _this.iapi.linea.connectDevice(data.pin, index + '')
                            .then(function (res) {
                            _this.japi.storage.set("deviceInformation", JSON.stringify(deviceInformation))
                                .then(function () {
                                console.log("device information saved.");
                            });
                            _this.connectDevice = device;
                            __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show('Device connected', '5000', 'top');
                        }, function (err) {
                            console.log(err);
                            __WEBPACK_IMPORTED_MODULE_4__ToastReplacement__["a" /* Toast */].show('Error connecting to device, please try again.', '5000', 'top');
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    DevicesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DevicesPage');
    };
    DevicesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-devices',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\devices\devices.html"*/'<!--\n\n  Generated template for the DevicesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Devices</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<ion-content padding>\n\n  <ion-list>\n\n  		<ion-item *ngFor="let device of devices" (click)="connectTo(device)">\n\n  			 {{ device  }} <span *ngIf="device == connectDevice">[SELECTED]</span>\n\n  		</ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\devices\devices.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_iot_api_iot_api__["a" /* IotApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DevicesPage);
    return DevicesPage;
}());

//# sourceMappingURL=devices.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_toolbar_core_toolbar__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__core_toolbar_core_toolbar__["a" /* CoreToolbarComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__core_toolbar_core_toolbar__["a" /* CoreToolbarComponent */]],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
 * Generated class for the CoreToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CoreToolbarComponent = /** @class */ (function () {
    function CoreToolbarComponent() {
    }
    CoreToolbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'core-toolbar',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\components\core-toolbar\core-toolbar.html"*/'<ion-header>\n\n  <ion-navbar class="c-header">\n\n  	<h1>dHub</h1>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n \n\n\n\n</ion-header>\n\n\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\components\core-toolbar\core-toolbar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], CoreToolbarComponent);
    return CoreToolbarComponent;
}());

//# sourceMappingURL=core-toolbar.js.map

/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 272,
	"./af.js": 272,
	"./ar": 273,
	"./ar-dz": 274,
	"./ar-dz.js": 274,
	"./ar-kw": 275,
	"./ar-kw.js": 275,
	"./ar-ly": 276,
	"./ar-ly.js": 276,
	"./ar-ma": 277,
	"./ar-ma.js": 277,
	"./ar-sa": 278,
	"./ar-sa.js": 278,
	"./ar-tn": 279,
	"./ar-tn.js": 279,
	"./ar.js": 273,
	"./az": 280,
	"./az.js": 280,
	"./be": 281,
	"./be.js": 281,
	"./bg": 282,
	"./bg.js": 282,
	"./bm": 283,
	"./bm.js": 283,
	"./bn": 284,
	"./bn.js": 284,
	"./bo": 285,
	"./bo.js": 285,
	"./br": 286,
	"./br.js": 286,
	"./bs": 287,
	"./bs.js": 287,
	"./ca": 288,
	"./ca.js": 288,
	"./cs": 289,
	"./cs.js": 289,
	"./cv": 290,
	"./cv.js": 290,
	"./cy": 291,
	"./cy.js": 291,
	"./da": 292,
	"./da.js": 292,
	"./de": 293,
	"./de-at": 294,
	"./de-at.js": 294,
	"./de-ch": 295,
	"./de-ch.js": 295,
	"./de.js": 293,
	"./dv": 296,
	"./dv.js": 296,
	"./el": 297,
	"./el.js": 297,
	"./en-au": 298,
	"./en-au.js": 298,
	"./en-ca": 299,
	"./en-ca.js": 299,
	"./en-gb": 300,
	"./en-gb.js": 300,
	"./en-ie": 301,
	"./en-ie.js": 301,
	"./en-il": 302,
	"./en-il.js": 302,
	"./en-nz": 303,
	"./en-nz.js": 303,
	"./eo": 304,
	"./eo.js": 304,
	"./es": 305,
	"./es-do": 306,
	"./es-do.js": 306,
	"./es-us": 307,
	"./es-us.js": 307,
	"./es.js": 305,
	"./et": 308,
	"./et.js": 308,
	"./eu": 309,
	"./eu.js": 309,
	"./fa": 310,
	"./fa.js": 310,
	"./fi": 311,
	"./fi.js": 311,
	"./fo": 312,
	"./fo.js": 312,
	"./fr": 313,
	"./fr-ca": 314,
	"./fr-ca.js": 314,
	"./fr-ch": 315,
	"./fr-ch.js": 315,
	"./fr.js": 313,
	"./fy": 316,
	"./fy.js": 316,
	"./gd": 317,
	"./gd.js": 317,
	"./gl": 318,
	"./gl.js": 318,
	"./gom-latn": 319,
	"./gom-latn.js": 319,
	"./gu": 320,
	"./gu.js": 320,
	"./he": 321,
	"./he.js": 321,
	"./hi": 322,
	"./hi.js": 322,
	"./hr": 323,
	"./hr.js": 323,
	"./hu": 324,
	"./hu.js": 324,
	"./hy-am": 325,
	"./hy-am.js": 325,
	"./id": 326,
	"./id.js": 326,
	"./is": 327,
	"./is.js": 327,
	"./it": 328,
	"./it.js": 328,
	"./ja": 329,
	"./ja.js": 329,
	"./jv": 330,
	"./jv.js": 330,
	"./ka": 331,
	"./ka.js": 331,
	"./kk": 332,
	"./kk.js": 332,
	"./km": 333,
	"./km.js": 333,
	"./kn": 334,
	"./kn.js": 334,
	"./ko": 335,
	"./ko.js": 335,
	"./ky": 336,
	"./ky.js": 336,
	"./lb": 337,
	"./lb.js": 337,
	"./lo": 338,
	"./lo.js": 338,
	"./lt": 339,
	"./lt.js": 339,
	"./lv": 340,
	"./lv.js": 340,
	"./me": 341,
	"./me.js": 341,
	"./mi": 342,
	"./mi.js": 342,
	"./mk": 343,
	"./mk.js": 343,
	"./ml": 344,
	"./ml.js": 344,
	"./mn": 345,
	"./mn.js": 345,
	"./mr": 346,
	"./mr.js": 346,
	"./ms": 347,
	"./ms-my": 348,
	"./ms-my.js": 348,
	"./ms.js": 347,
	"./mt": 349,
	"./mt.js": 349,
	"./my": 350,
	"./my.js": 350,
	"./nb": 351,
	"./nb.js": 351,
	"./ne": 352,
	"./ne.js": 352,
	"./nl": 353,
	"./nl-be": 354,
	"./nl-be.js": 354,
	"./nl.js": 353,
	"./nn": 355,
	"./nn.js": 355,
	"./pa-in": 356,
	"./pa-in.js": 356,
	"./pl": 357,
	"./pl.js": 357,
	"./pt": 358,
	"./pt-br": 359,
	"./pt-br.js": 359,
	"./pt.js": 358,
	"./ro": 360,
	"./ro.js": 360,
	"./ru": 361,
	"./ru.js": 361,
	"./sd": 362,
	"./sd.js": 362,
	"./se": 363,
	"./se.js": 363,
	"./si": 364,
	"./si.js": 364,
	"./sk": 365,
	"./sk.js": 365,
	"./sl": 366,
	"./sl.js": 366,
	"./sq": 367,
	"./sq.js": 367,
	"./sr": 368,
	"./sr-cyrl": 369,
	"./sr-cyrl.js": 369,
	"./sr.js": 368,
	"./ss": 370,
	"./ss.js": 370,
	"./sv": 371,
	"./sv.js": 371,
	"./sw": 372,
	"./sw.js": 372,
	"./ta": 373,
	"./ta.js": 373,
	"./te": 374,
	"./te.js": 374,
	"./tet": 375,
	"./tet.js": 375,
	"./tg": 376,
	"./tg.js": 376,
	"./th": 377,
	"./th.js": 377,
	"./tl-ph": 378,
	"./tl-ph.js": 378,
	"./tlh": 379,
	"./tlh.js": 379,
	"./tr": 380,
	"./tr.js": 380,
	"./tzl": 381,
	"./tzl.js": 381,
	"./tzm": 382,
	"./tzm-latn": 383,
	"./tzm-latn.js": 383,
	"./tzm.js": 382,
	"./ug-cn": 384,
	"./ug-cn.js": 384,
	"./uk": 385,
	"./uk.js": 385,
	"./ur": 386,
	"./ur.js": 386,
	"./uz": 387,
	"./uz-latn": 388,
	"./uz-latn.js": 388,
	"./uz.js": 387,
	"./vi": 389,
	"./vi.js": 389,
	"./x-pseudo": 390,
	"./x-pseudo.js": 390,
	"./yo": 391,
	"./yo.js": 391,
	"./zh-cn": 392,
	"./zh-cn.js": 392,
	"./zh-hk": 393,
	"./zh-hk.js": 393,
	"./zh-tw": 394,
	"./zh-tw.js": 394
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 521;

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesmanCustomerOrderSummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_navigation_api_navigation_api__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the SalesmanCustomerOrderSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SalesmanCustomerOrderSummaryPage = /** @class */ (function (_super) {
    __extends(SalesmanCustomerOrderSummaryPage, _super);
    function SalesmanCustomerOrderSummaryPage(navCtrl, navParams, japi, alertCtrl, napi) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.japi = japi;
        _this.alertCtrl = alertCtrl;
        _this.napi = napi;
        _this.invoice = { list: [], total: 0 };
        _this.items = [];
        _this.showSearch = false;
        _this.showStandard = false;
        _this.standardItems = [];
        _this.priceMap = {};
        _this.itemCache = [];
        _this.locations = [];
        _this.rateIndex = [];
        _this.taxrates = [];
        _this.filterVal = "";
        _this.customer = navParams.get("customer");
        var stop = navParams.get("stop");
        _this.invoice.customer = _this.customer.name;
        var location_id = navParams.get("location_id");
        if (location_id) {
            _this.location_id = location_id;
        }
        japi.http.get(_this.japi.URL + "taxrates", _this.japi.httpOptions)
            .subscribe(function (res) {
            _this.taxrates = res.data;
            if (_this.customer.taxrate && !_this.customer.extra_taxrate) {
                _this.invoice.taxPredefined = true;
                _this.invoice.taxRate = _this.customer.taxrate;
            }
            if (_this.customer.extra_taxrate) {
                _this.rateIndex = _this.customer.taxrates;
                _this.invoice.extra_taxrate = true;
                _this.invoice.taxPredefined = true;
            }
        });
        japi.presentLoading();
        japi.http.get(_this.japi.URL + "items", _this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.items = res.data;
            for (var i = _this.items.length - 1; i >= 0; i--) {
                var item = _this.items[i];
                if (item.amt) {
                    delete item.amt;
                }
            }
        });
        _this.api = japi;
        japi.http.get(_this.japi.URL + "locations", _this.japi.httpOptions)
            .subscribe(function (res) {
            _this.locations = [];
            for (var i = res.data.length - 1; i >= 0; i--) {
                var location_1 = res.data[i];
                if (location_1.customer == _this.customer.name) {
                    _this.locations.push(location_1);
                    if (_this.location_id) {
                        if (_this.location_id == location_1._id) {
                            _this.invoice.location = location_1;
                        }
                    }
                }
            }
            //if length zero use customer
            if (_this.locations.length == 0) {
                var customer = Object.assign({}, _this.customer);
                customer.customer = customer.name;
                customer.category = "STORE";
                _this.locations.push(customer);
                _this.invoice.location = customer;
                _this.getLocationItems(customer._id);
            }
            if (stop) {
                for (var i = _this.locations.length - 1; i >= 0; i--) {
                    if (_this.locations[i]._id == stop) {
                        _this.invoice.location = _this.locations[i];
                    }
                }
            }
        });
        return _this;
    }
    SalesmanCustomerOrderSummaryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalesmanCustomerOrderSummaryPage');
    };
    SalesmanCustomerOrderSummaryPage.prototype.setLocationTaxRate = function () {
        if (this.invoice.location.extra_taxrate) {
            this.rateIndex = this.invoice.location.taxrates;
            this.invoice.extra_taxrate = true;
            this.invoice.taxPredefined = true;
        }
        if (this.invoice.location.taxrate && !this.invoice.location.extra_taxrate) {
            this.invoice.taxPredefined = true;
            this.invoice.taxRate = this.invoice.location.taxrate;
        }
        this.getLocationItems(this.invoice.location._id);
        this.getTotal();
    };
    SalesmanCustomerOrderSummaryPage.prototype.saveBackups = function () {
        this.japi.http.put(this.japi.URL + "backups/" + this.backupID, { backup: { items: this.standardItems, prices: this.priceMap } }, this.japi.httpOptions)
            .subscribe(function (res) {
            console.log("Backup saved");
        });
    };
    SalesmanCustomerOrderSummaryPage.prototype.setStandardItems = function () {
        for (var i = this.items.length - 1; i >= 0; i--) {
            var item = this.items[i];
            this.items[i].std = this.isStandard(item);
        }
    };
    SalesmanCustomerOrderSummaryPage.prototype.setPrices = function (priceMap) {
        if (!priceMap)
            return;
        for (var i = this.items.length - 1; i >= 0; i--) {
            var item = this.items[i];
            var locationPrice = priceMap[item._id];
            if (locationPrice)
                this.items[i].unitPrice = locationPrice;
        }
        this.priceMap = priceMap;
    };
    SalesmanCustomerOrderSummaryPage.prototype.getLocationItems = function (location) {
        var _this = this;
        this.japi.http.get(this.japi.URL + "backups/query?link=" + location + "-items", this.japi.httpOptions)
            .subscribe(function (res) {
            if (res.data) {
                _this.backupID = res.data._id;
                if (res.data.backup) {
                    _this.standardItems = res.data.backup.items;
                    _this.setStandardItems();
                    _this.setPrices(res.data.backup.prices);
                }
                return;
            }
            console.log("No backup found, creating a new one.");
            _this.japi.http
                .post(_this.japi.URL + "backups", { link: location + "-items" }, _this.japi.httpOptions)
                .subscribe(function (res) {
                console.log(res);
                _this.backupID = res.data._id;
            });
        });
    };
    SalesmanCustomerOrderSummaryPage.prototype.hasLocation = function (customer) {
        var result = false;
        for (var i = this.locations.length - 1; i >= 0; i--) {
            if (this.locations[i].customer == customer.name) {
                result = true;
                break;
            }
        }
        return result;
    };
    SalesmanCustomerOrderSummaryPage.prototype.fetchLocations = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "locations", this.japi.httpOptions)
            .subscribe(function (res) {
            _this.japi.hideLoading();
            _this.items = res.data;
        });
    };
    SalesmanCustomerOrderSummaryPage.prototype.itemAction = function (item) {
        var _this = this;
        var standardAction = {
            text: this.isStandard(item) ? 'Unmark' : 'Mark',
            handler: function (data) {
                if (_this.isStandard(item)) {
                    _this.unmarkAsStandard(item);
                    _this.saveBackups();
                    return;
                }
                if (data.price && data.price !== "") {
                    item.touched = true;
                    item.unitPrice = parseFloat(data.price);
                    _this.priceMap[item._id] = item.unitPrice;
                }
                _this.markAsStandard(item);
                _this.saveBackups();
            }
        };
        var alert = this.alertCtrl.create({
            title: "Enter amount of " + item.itemName + " to add (" + item.unit + " left).",
            inputs: [
                {
                    name: 'amt',
                    placeholder: 'Amount',
                    type: 'number'
                },
                {
                    name: 'price',
                    placeholder: 'Override price',
                    type: 'number'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Sell',
                    handler: function (data) {
                        item.amt = parseInt(data.amt);
                        if (item.amt > item.unit) {
                            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("Error, you can only sell " + item.unit + " unit" + (item.unit == 1 ? "" : "s") + " of this item.", "", "");
                            delete item.amt;
                            return;
                        }
                        if (data.price && data.price !== "") {
                            item.touched = true;
                            item.unitPrice = parseFloat(data.price);
                            _this.priceMap[item._id] = item.unitPrice;
                            _this.saveBackups();
                        }
                        _this.getTotal();
                    }
                },
                standardAction
            ]
        });
        alert.present();
    };
    SalesmanCustomerOrderSummaryPage.prototype.markAsStandard = function (item) {
        if (this.standardItems.indexOf(item._id) != -1) {
            __WEBPACK_IMPORTED_MODULE_5__ToastReplacement__["a" /* Toast */].show("This item is already marked", '', '');
            return;
        }
        item.std = true;
        this.standardItems.push(item._id);
    };
    SalesmanCustomerOrderSummaryPage.prototype.isStandard = function (item) {
        return this.standardItems.indexOf(item._id) !== -1;
    };
    SalesmanCustomerOrderSummaryPage.prototype.unmarkAsStandard = function (item) {
        var index = this.standardItems.indexOf(item._id);
        if (index !== -1) {
            this.standardItems.splice(index, 1);
        }
        item.std = false;
    };
    SalesmanCustomerOrderSummaryPage.prototype.generateItemList = function () {
        var list = [];
        for (var i = this.items.length - 1; i >= 0; i--) {
            var item = this.items[i];
            if (item.amt && item.amt != 0) {
                list.push(item);
            }
        }
        return list;
    };
    SalesmanCustomerOrderSummaryPage.prototype.isTypeCoffee = function (item) {
        var catString = item.category.join(",").toLowerCase();
        return catString.includes("coffee") || catString.includes("notax");
    };
    SalesmanCustomerOrderSummaryPage.prototype.getTotal = function () {
        this.invoice.total = 0;
        this.invoice.taxValue = 0;
        var list = this.generateItemList();
        for (var i = list.length - 1; i >= 0; i--) {
            var item = list[i];
            if (item.amt) {
                this.invoice.total += item.unitPrice * item.amt;
                if (this.invoice.taxRate) {
                    if (!item.category || !this.isTypeCoffee(item)) {
                        var itemTax = (item.unitPrice * item.amt) * (this.invoice.taxRate / 100);
                        this.invoice.taxValue += itemTax;
                    }
                }
            }
        }
        console.log(this.invoice.taxRate);
    };
    SalesmanCustomerOrderSummaryPage.prototype.makeId = function () {
        return Math.random().toString(36).substr(2, 7).toUpperCase();
    };
    SalesmanCustomerOrderSummaryPage.prototype.save = function (invoice) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Confirm sale to " + invoice.customer + " for " + invoice.total.toFixed(2) + " USD (w/o taxes)",
            buttons: [
                'Cancel',
                {
                    text: 'Sell',
                    handler: function () {
                        _this.sell(invoice);
                    }
                },
            ]
        });
        alert.present();
    };
    SalesmanCustomerOrderSummaryPage.prototype.sell = function (invoice) {
        var _this = this;
        invoice.list = this.generateItemList();
        if (!invoice.id)
            invoice.id = this.makeId();
        invoice.route = this.napi.activeRoute ?
            this.napi.generateRouteLocationIDs(this.napi.activeRoute.stops)
            : false;
        this.japi.http.post(this.japi.URL + "invoices", invoice, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.successMessage();
            _this.clearStop();
            _this.saveBackups();
            _this.navCtrl.pop();
        });
    };
    SalesmanCustomerOrderSummaryPage.prototype.clearStop = function () {
        var _this = this;
        if (this.napi.activeRoute) {
            this.napi.getRouteById(this.napi.activeRoute.id)
                .then(function (route) {
                if (!route.stops)
                    route.stops = [];
                var stopID, index;
                for (var i = 0; i < route.stops.length; i++) {
                    if (!route.stops[i].cleared) {
                        stopID = route.stops[i]._id;
                        index = i;
                        break;
                    }
                }
                route = _this.napi.locationTool.clearStop(route, stopID);
                route.stops[index].soldTo = true;
                _this.napi.updateRoute(route);
            });
        }
    };
    SalesmanCustomerOrderSummaryPage.prototype.successMessage = function () {
        var alert = this.alertCtrl.create({
            title: 'Invoice saved!',
            subTitle: 'You can view the invoice in past orders, under the specified customer',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SalesmanCustomerOrderSummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-salesman-customer-order-summary',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-customer-order-summary\salesman-customer-order-summary.html"*/'<!--\n\n  Generated template for the CustomerProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>New invoice</ion-title>\n\n    <ion-buttons end>\n\n      <button (click)="addNote(invoice)" ion-button icon-only>\n\n        Add note\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box">\n\n  <h4>Billing : {{ invoice.customer }}</h4>\n\n  <hr color="light" />\n\n</div>\n\n<ion-content style="margin-top: 180px;height:calc(100% - 180px)">\n\n  <ion-item>\n\n    <ion-label color="primary">Invoice ID</ion-label>\n\n    <ion-input placeholder="VBJRROR" [(ngModel)]="invoice.id"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-item>\n\n      <ion-label color="primary">PO #</ion-label>\n\n      <ion-input placeholder="343434" [(ngModel)]="invoice.po"></ion-input>\n\n    </ion-item>\n\n     <p style="margin: 10px 15px;" *ngIf="invoice.note">Note : {{ invoice.note }}</p>\n\n    <ion-label>Shipping to</ion-label>\n\n    <ion-select (ionChange)="setLocationTaxRate()" [(ngModel)]="invoice.location">\n\n      <ion-option *ngFor="let location of locations" [value]="location">{{ location.name }}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-item *ngIf="invoice.extra_taxrate">\n\n    <ion-label>Select tax rate</ion-label>\n\n    <ion-select [(ngModel)]="invoice.taxRate">\n\n      <div *ngFor="let rate of taxrates">\n\n        <ion-option *ngIf="rateIndex.indexOf(rate._id) !== -1" [value]="rate.percentage">{{ rate.name }}</ion-option>\n\n      </div>\n\n    </ion-select>\n\n  </ion-item>\n\n  <ion-searchbar [(ngModel)]="filterVal"></ion-searchbar>\n\n  <button ion-button color="primary">Go!</button>\n\n  <div *ngIf="!showSearch && !showStandard">\n\n    <ion-item-divider>\n\n      Selected Items\n\n    </ion-item-divider>\n\n    <ion-list>\n\n      <div *ngFor="let item of items | itemfilter:filterVal">\n\n        <ion-item *ngIf="item.amt" (click)="itemAction(item)">\n\n          <ion-label item-start>\n\n            <ion-icon name="star" *ngIf="isStandard(item)"></ion-icon> {{ item.itemName }} | {{ item.vendor }}\n\n          </ion-label>\n\n          <ion-label item-content>| {{ item.unitPrice ? item.unitPrice.toFixed(2) : "0.00" }} USD</ion-label>\n\n          <ion-label item-end style="text-align: right;">\n\n            <p class="text-muted" *ngIf="item.amt">\n\n              Qx {{ item.amt }}\n\n              <ion-icon name="create"></ion-icon>\n\n            </p>\n\n          </ion-label>\n\n        </ion-item>\n\n      </div>\n\n    </ion-list>\n\n  </div>\n\n  <p style="text-align: center" *ngIf="!invoice.location">Please select a location to display items.</p>\n\n  <ion-item *ngIf="!showStandard && !showSearch && invoice.location" (click)="showStandard  = true;">\n\n    <ion-icon name="star"></ion-icon> Standard items\n\n  </ion-item>\n\n  <div *ngIf="showStandard">\n\n    <p style="text-align: center;" *ngIf="standardItems.length == 0">No items found.</p>\n\n    <ion-list>\n\n      <div *ngFor="let item of items | itemfilter:filterVal">\n\n        <ion-item *ngIf="item.std" (click)="itemAction(item)">\n\n          <ion-label item-start>{{ item.itemName }} | {{ item.vendor }}</ion-label>\n\n          <ion-label item-content>| {{ item.unitPrice ? item.unitPrice.toFixed(2) : "0.00" }} USD</ion-label>\n\n          <ion-label item-end style="text-align: right;">\n\n            <p class="text-muted" *ngIf="item.amt">\n\n              Qx {{ item.amt }}\n\n              <ion-icon name="create"></ion-icon>\n\n            </p>\n\n          </ion-label>\n\n        </ion-item>\n\n      </div>\n\n    </ion-list>\n\n  </div>\n\n  <ion-item *ngIf="!showSearch && !showStandard && invoice.location" (click)="showSearch  = true;">\n\n    Search items\n\n  </ion-item>\n\n  <div *ngIf="showSearch">\n\n    <ion-list>\n\n      <ion-item *ngFor="let item of items | itemfilter:filterVal" (click)="itemAction(item)">\n\n        <ion-label item-start>\n\n          <ion-icon name="star" *ngIf="isStandard(item)"></ion-icon> {{ item.itemName }} | {{ item.vendor }}\n\n        </ion-label>\n\n        <ion-label item-content>| {{ item.unitPrice ? item.unitPrice.toFixed(2) : "0.00" }} USD</ion-label>\n\n        <ion-label item-end style="text-align: right;">\n\n          <p class="text-muted" *ngIf="item.amt">\n\n            Qx {{ item.amt }}\n\n            <ion-icon name="create"></ion-icon>\n\n          </p>\n\n        </ion-label>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n  <div style="text-align: center;">\n\n    <h3><span style="width:70px;">Subtotal : </span> {{ invoice.total.toFixed(2) }} USD</h3>\n\n    <div *ngIf="invoice.taxValue">\n\n      <h3><span style="width:70px;">Tax value : </span> {{ invoice.taxValue.toFixed(2) }} USD ({{ invoice.taxRate }} %)</h3>\n\n    </div>\n\n    <h3><span style="width:70px;">Total : </span> {{ ( invoice.total + ( invoice.taxValue ? invoice.taxValue : 0 ) ).toFixed(2) }} USD</h3>\n\n  </div>\n\n</ion-content>\n\n<ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <button ion-button *ngIf="!showSearch && !showStandard" color="danger" (click)="save(invoice)" full round>Sell </button>\n\n          <button ion-button *ngIf="showSearch" color="primary" (click)="showSearch = false;" full round>Done </button>\n\n          <button ion-button *ngIf="showStandard" color="primary" (click)="showStandard = false;" full round>Done </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\salesman-customer-order-summary\salesman-customer-order-summary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_navigation_api_navigation_api__["a" /* NavigationApiProvider */]])
    ], SalesmanCustomerOrderSummaryPage);
    return SalesmanCustomerOrderSummaryPage;
}(__WEBPACK_IMPORTED_MODULE_2__net_controller__["a" /* NetController */]));

//# sourceMappingURL=salesman-customer-order-summary.js.map

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JavaApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapping__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_secure_storage__ = __webpack_require__(239);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the JavaApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var JavaApiProvider = /** @class */ (function (_super) {
    __extends(JavaApiProvider, _super);
    function JavaApiProvider(loadingCtrl, http, secureStorage) {
        var _this = _super.call(this, loadingCtrl) || this;
        _this.loadingCtrl = loadingCtrl;
        _this.http = http;
        _this.secureStorage = secureStorage;
        _this.URL = __WEBPACK_IMPORTED_MODULE_2__mapping__["b" /* Mapping */].URL;
        _this.authURL = __WEBPACK_IMPORTED_MODULE_2__mapping__["b" /* Mapping */].baseURL + "/auth/";
        _this.accountType = "";
        _this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
            })
        };
        return _this;
    }
    // class config 
    JavaApiProvider.prototype.setResource = function (resource) {
        this.resource = resource;
    };
    // authentication
    JavaApiProvider.prototype.ensureTokenValidity = function (err) {
        console.log(err);
    };
    JavaApiProvider.prototype.login = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.presentLoading();
            _this.http.post(_this.authURL + "login", user, _this.httpOptions)
                .subscribe(function (res) {
                _this.hideLoading();
                if (!res.success || !res.data.token) {
                    reject(res);
                    return;
                }
                _this.storeToken(res.data.token);
                _this.storeName(res.data.name);
                _this.storeEmail(res.data.email);
                _this.storeType(user.type);
                _this.loadType();
                _this.setToken(res.data.token);
                resolve(true);
            }, function (err) {
                _this.hideLoading();
                reject(err);
            });
        });
    };
    JavaApiProvider.prototype.reset = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.presentLoading();
            _this.http.post(_this.authURL + "reset", user, _this.httpOptions)
                .subscribe(function (res) {
                _this.hideLoading();
                if (!res.success) {
                    reject(res);
                    return;
                }
                resolve(true);
            }, function (err) {
                _this.hideLoading();
                reject(err);
            });
        });
    };
    JavaApiProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.remove("token")
                .then(function () {
                resolve(true);
            }, function (error) {
                reject(false);
            });
            _this.storage.remove("type");
            _this.storage.remove("name");
        });
    };
    JavaApiProvider.prototype.storeToken = function (token) {
        this.storage.set("token", token);
    };
    JavaApiProvider.prototype.storeName = function (name) {
        this.storage.set("name", name);
    };
    JavaApiProvider.prototype.storeEmail = function (email) {
        this.storage.set("email", email);
    };
    JavaApiProvider.prototype.storeType = function (type) {
        this.accountType = type;
        this.storage.set("type", type);
    };
    JavaApiProvider.prototype.getType = function () {
        return this.storage.get("type");
    };
    JavaApiProvider.prototype.loadType = function () {
        var _this = this;
        this.getType()
            .then(function (data) {
            _this.accountType = data;
        }, function (error) {
            console.log(error);
        });
    };
    JavaApiProvider.prototype.setToken = function (token) {
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'token': token
            })
        };
    };
    JavaApiProvider.prototype.isLoggedIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.secureStorage.create("jtvt")
                .then(function (storage) {
                _this.storage = storage;
                storage.get("token")
                    .then(function (data) {
                    if (data) {
                        _this.setToken(data);
                        _this.http.get(_this.URL + "employees", _this.httpOptions)
                            .subscribe(function () {
                            _this.loadType();
                            resolve(data);
                        }, function (err) {
                            console.log(err);
                            reject(err);
                        });
                    }
                    if (!data)
                        reject(false);
                }, function (err) {
                    reject(err);
                    console.log(err);
                });
            }, function (error) {
                reject(error);
                console.log("setting up local storage");
                _this.storage = {
                    get: function (key) {
                        console.log("Test fetching " + key);
                        return new Promise(function (resolve, reject) {
                            resolve(window.localStorage[key]);
                        });
                    },
                    set: function (key, value) {
                        return new Promise(function (resolve, reject) {
                            window.localStorage[key] = value;
                            resolve(true);
                        });
                    }
                };
                console.log(error);
            });
        });
    };
    //crud
    JavaApiProvider.prototype.create = function (data) {
        return this.toPromise(this.http.post(this.URL + this.resource, data, this.httpOptions));
    };
    JavaApiProvider.prototype.delete = function (id) {
        return this.toPromise(this.http.delete(this.URL + this.resource + "/" + id, this.httpOptions));
    };
    JavaApiProvider.prototype.edit = function (id, data) {
        return this.toPromise(this.http.put(this.URL + this.resource + "/" + id, data, this.httpOptions));
    };
    JavaApiProvider.prototype.pull = function (path) {
        return this.toPromise(this.http.get(this.URL + path, this.httpOptions));
    };
    JavaApiProvider.prototype.getAll = function () {
        return this.toPromise(this.http.get(this.URL + this.resource, this.httpOptions));
    };
    JavaApiProvider.prototype.toPromise = function (fn) {
        var _this = this;
        this.presentLoading();
        return new Promise(function (resolve, reject) {
            fn.subscribe(function (res) {
                _this.hideLoading();
                resolve(res);
            }, function (err) {
                reject(err);
                _this.hideLoading();
            });
        });
    };
    JavaApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_secure_storage__["a" /* SecureStorage */]])
    ], JavaApiProvider);
    return JavaApiProvider;
}(__WEBPACK_IMPORTED_MODULE_2__mapping__["a" /* Loadable */]));

//# sourceMappingURL=java-api.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__invoice_invoice__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__net_controller__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__salesman_customer_order_summary_salesman_customer_order_summary__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__ = __webpack_require__(249);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the CustomerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerProfilePage = /** @class */ (function (_super) {
    __extends(CustomerProfilePage, _super);
    function CustomerProfilePage(japi, navCtrl, navParams, toast, callNumber) {
        var _this = _super.call(this) || this;
        _this.japi = japi;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.toast = toast;
        _this.callNumber = callNumber;
        _this.total = 0;
        _this.customer = _this.navParams.get("customer");
        _this.dateRange = "24";
        japi.setResource("invoices");
        return _this;
    }
    CustomerProfilePage.prototype.updateValDisp = function () {
        var _this = this;
        this.japi.presentLoading();
        setTimeout(function () {
            _this.japi.hideLoading();
            _this.dateRange = _this.dateRange;
        }, 1200);
    };
    ;
    CustomerProfilePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.japi.getAll().then(function (res) {
            _this.data = res.data.reverse();
            _this.data.sort(function (a, b) {
                if (!a.updatedAt || !b.updatedAt)
                    return -1;
                return b.updatedAt - a.updatedAt;
            });
            _this.fetchAccounts();
        });
    };
    CustomerProfilePage.prototype.calcTotal = function () {
        this.total = 0;
        for (var i = this.data.length - 1; i >= 0; i--) {
            var invoice = this.data[i];
            if (this.customer.name == invoice.customer) {
                if (!invoice.value)
                    invoice.value = 0;
                if (!invoice.taxVal)
                    invoice.taxVal = 0;
                this.total += invoice.value - (invoice.total + invoice.taxVal);
            }
        }
        if (this.account.value)
            this.total += this.account.value;
    };
    CustomerProfilePage.prototype.getItemTotal = function (list) {
        var total = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].amt)
                total += list[i].amt;
        }
        return total;
    };
    CustomerProfilePage.prototype.newInvoice = function (customer) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__salesman_customer_order_summary_salesman_customer_order_summary__["a" /* SalesmanCustomerOrderSummaryPage */], {
            customer: customer
        });
    };
    CustomerProfilePage.prototype.getStatus = function (invoice) {
        var status = "";
        if (!invoice.taxValue)
            invoice.taxValue = 0;
        if (invoice.value >= (invoice.total + invoice.taxValue))
            return "COMPLETE";
        if (invoice.value)
            switch (invoice.value) {
                case 0:
                    status = "PENDING";
                    break;
                default:
                    status = "PAID";
                    break;
            }
        if (!invoice.value) {
            status = "NEW";
        }
        return status;
    };
    CustomerProfilePage.prototype.openInvoice = function (invoice) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__invoice_invoice__["a" /* InvoicePage */], {
            invoice: invoice,
            customer: this.customer
        });
    };
    CustomerProfilePage.prototype.call = function (customer) {
        var _this = this;
        this.callNumber.callNumber(customer.contactNo, true)
            .then(function (res) { return _this.toast.create({ message: 'Customer successfully dialed..', duration: 5000, position: 'top' }); })
            .catch(function (err) { return _this.toast.create({ message: 'Failed to dial customer.', duration: 5000, position: 'top' }); });
    };
    CustomerProfilePage.prototype.createAccount = function (account) {
        var _this = this;
        this.japi.http.post(this.japi.URL + "accounts", account, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.toast.create({ message: "Customer account created", duration: 5000, position: 'top' });
        });
    };
    CustomerProfilePage.prototype.fetchAccounts = function () {
        var _this = this;
        this.japi.http.get(this.japi.URL + "accounts", this.japi.httpOptions)
            .subscribe(function (res) {
            var accounts = res.data;
            for (var i = accounts.length - 1; i >= 0; i--) {
                var account = accounts[i];
                if (account.owner == _this.customer._id) {
                    _this.account = account;
                    _this.calcTotal();
                    break;
                }
            }
            if (!_this.account) {
                _this.account = { owner: _this.customer._id, value: 0 };
                _this.createAccount(_this.account);
                _this.calcTotal();
            }
        });
    };
    CustomerProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-customer-profile',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\customer-profile\customer-profile.html"*/'<!--\n\n  Generated template for the CustomerProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header color="light" class="sec-header">\n\n  <ion-navbar color="light">\n\n    <ion-title>Customer Profile</ion-title>\n\n     <ion-buttons end>\n\n      <button (click)="newInvoice(customer)" ion-button icon-only>\n\n        New Invoice\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<core-toolbar></core-toolbar>\n\n<div class="green-box" style="text-align: left;">\n\n  <h3>{{ customer.name }}</h3>\n\n  <H5>Account balance : {{  total.toLocaleString() }} USD</H5>\n\n  <div *ngIf="customer.locations">\n\n    <h5 *ngIf="customer.locations.length != 0"> {{ customer.locations.length }} location{{ customer.locations.length == 1 ? "" : "s" }}</h5>\n\n  </div>\n\n  <button full round color="danger" *ngIf="customer.contactNo" (click)="call(customer)" ion-button>CALL</button>\n\n</div>\n\n<ion-content style="margin-top: 270px;height:calc(100% - 270px);">\n\n  <h3 style="text-align: center;">RECENT ORDERS</h3>\n\n  <ion-segment color="dark" (ionChange)="updateValDisp()" [(ngModel)]="dateRange">\n\n    <ion-segment-button value="24">\n\n      24 Hours\n\n    </ion-segment-button>\n\n    <ion-segment-button value="1">\n\n      1 Week\n\n    </ion-segment-button>\n\n    <ion-segment-button value="30">\n\n      1 Month\n\n    </ion-segment-button>\n\n    <ion-segment-button value="All">\n\n      All\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n  <ion-list>\n\n    <div *ngFor="let invoice of data" >\n\n      <ion-item  \n\n      (click)="openInvoice(invoice)"\n\n       *ngIf="customer.name == invoice.customer && inDateRange(invoice, dateRange)">\n\n        <ion-label style="flex: 3;" item-start># {{ invoice.id }} [{{ getStatus(invoice) }}] </ion-label>\n\n        <ion-label item-end style="text-align: right;">\n\n          <p class="text-muted">\n\n            # {{ getItemTotal(invoice.list) }} items\n\n          </p>\n\n        </ion-label>\n\n      </ion-item>\n\n    </div>\n\n  </ion-list>\n\n</ion-content>\n\n<!-- <ion-footer color="dark">\n\n  <ion-toolbar color="dark">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <button ion-button color="danger" full round>Round Button</button>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <button ion-button full color="info" round>Round Button</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-toolbar>\n\n</ion-footer> -->\n\n'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\customer-profile\customer-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__["a" /* CallNumber */]])
    ], CustomerProfilePage);
    return CustomerProfilePage;
}(__WEBPACK_IMPORTED_MODULE_4__net_controller__["a" /* NetController */]));

//# sourceMappingURL=customer-profile.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerCheckerDashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route_pick_route_pick__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkin_vendor_product_checkin_vendor_product__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_iot_api_iot_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__product_selection_product_selection__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pod_selection_pod_selection__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__unkown_barcode_unkown_barcode__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__order_channels_order_channels__ = __webpack_require__(259);
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
 * Generated class for the PickerCheckerDashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PickerCheckerDashPage = /** @class */ (function () {
    function PickerCheckerDashPage(navCtrl, navParams, loadingCtrl, iapi, japi, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.iapi = iapi;
        this.japi = japi;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.opt = "picker";
        this.name = "";
        this.iapi.readyLinea();
    }
    PickerCheckerDashPage.prototype.gotoUpdateInventory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__product_selection_product_selection__["a" /* ProductSelectionPage */]);
    };
    PickerCheckerDashPage.prototype.gotoUpdatePOD = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pod_selection_pod_selection__["a" /* PodSelectionPage */]);
    };
    PickerCheckerDashPage.prototype.gotoOrders = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__order_channels_order_channels__["a" /* OrderChannelsPage */]);
    };
    PickerCheckerDashPage.prototype.gotoReceiving = function () {
    };
    PickerCheckerDashPage.prototype.gotoTransfer = function () {
    };
    PickerCheckerDashPage.prototype.scanAynBarcode = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__unkown_barcode_unkown_barcode__["a" /* UnkownBarcodePage */], {});
        return modal.present();
    };
    PickerCheckerDashPage.prototype.startScan = function (opt) {
        switch (opt) {
            case "picker":
                // code...
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__route_pick_route_pick__["a" /* RoutePickPage */], {});
                break;
            default:
                // code...
                break;
        }
    };
    PickerCheckerDashPage.prototype.tryScan = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Enter barcode',
            inputs: [
                {
                    name: 'bar',
                    placeholder: 'PRODUCT BARCODE'
                }
            ],
            buttons: [
                {
                    text: 'Use camera',
                    handler: function (data) {
                        var amount;
                        _this.iapi.scanBarcode()
                            .then(function (code) {
                            if (!code || code == "") {
                                __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show("Error, no items scanned.", "", "");
                                return;
                            }
                            _this.checkinItem(code);
                        })
                            .catch(function (err) {
                            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show("Error, barcode was not scanned!", "", "");
                        });
                    }
                },
                'Cancel',
                {
                    text: 'Confirm',
                    handler: function (data) {
                        if (!data.bar)
                            return;
                        _this.checkinItem(data.bar);
                    }
                }
            ]
        });
        alert.present();
    };
    PickerCheckerDashPage.prototype.updateItems = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkin_vendor_product_checkin_vendor_product__["a" /* CheckinVendorProductPage */], { editMode: true });
    };
    PickerCheckerDashPage.prototype.checkinItem = function (barcode) {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Saving"
        });
        this.loader.present();
        this.japi.http.post(this.japi.URL + "checkin_item", { barcode: barcode, amount: 0 }, this.japi.httpOptions)
            .subscribe(function (res) {
            _this.loader.dismiss();
            if (!res.success) {
                __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show("This barcode is not known, please set which item it is.", '4000', 'top');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkin_vendor_product_checkin_vendor_product__["a" /* CheckinVendorProductPage */], { barcode: barcode });
                return;
            }
            __WEBPACK_IMPORTED_MODULE_6__ToastReplacement__["a" /* Toast */].show('Item checked in', '4000', 'top');
        });
    };
    PickerCheckerDashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var d = new Date();
        this.currentDate = d.toLocaleString();
        this.japi.storage.get("name")
            .then(function (data) {
            _this.name = data ? data : "NONAME";
        })
            .catch(function (err) { return console.log(err); });
    };
    PickerCheckerDashPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PickerCheckerDashPage');
    };
    PickerCheckerDashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-picker-checker-dash',template:/*ion-inline-start:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\picker-checker-dash\picker-checker-dash.html"*/'<!--\n\n  Generated template for the SalesmanDashboardPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<core-toolbar></core-toolbar>\n\n\n\n<ion-content >\n\n  <div class="header-box">\n\n    <div class="title">Mark Cross | Primary Warehouse</div>\n\n    <div class="time">{{ currentDate }}</div>\n\n  </div>\n\n  <div class="picking-progress">\n\n    Picking Progress: <span class="done">30</span><span class="all">/100</span> Items\n\n  </div>\n\n  <progress-bar [progress]="30" [color]="\'#488aff\'"></progress-bar>\n\n  \n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col>\n\n        <div class="summary-wgt item-border" (click)="gotoOrders()">\n\n          <div><span class="done">12</span>/22</div>\n\n          <div>ORDERS</div>\n\n        </div>\n\n      </ion-col>\n\n      <ion-col>\n\n        <div class="summary-wgt item-border" (click)="gotoReceiving()">\n\n          <div><span class="done">8</span>/50</div>\n\n          <div>RECEIVING</div>\n\n        </div>\n\n      </ion-col>\n\n      <ion-col>\n\n        <div class="summary-wgt item-border" (click)="gotoTransfer()">\n\n          <div><span class="done">18</span>/28</div>\n\n          <div>TRANSFER</div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row class="item-border scanner-box" (click)="scanAynBarcode()">\n\n      <ion-col col-9 >\n\n        <div class="scanner-type">\n\n          SCAN ANY BARCODE\n\n        </div>\n\n      </ion-col>\n\n      <ion-col col-3 class="scanner-camera">\n\n        <ion-icon name="camera"></ion-icon>\n\n      </ion-col>\n\n    </ion-row>\n\n    \n\n    <ion-row class="item-border">\n\n      <ion-col (click)="gotoUpdateInventory()">\n\n        VIEW & UPDATE INVENTORY\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row class="item-border">\n\n      <ion-col (click)="gotoUpdatePOD()">\n\n        UPDATE POD LOCATIONS\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"E:\0_upwork_task\42_Angular_dHub\works\dhub-mobile\src\pages\picker-checker-dash\picker-checker-dash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_iot_api_iot_api__["a" /* IotApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_java_api_java_api__["a" /* JavaApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */]])
    ], PickerCheckerDashPage);
    return PickerCheckerDashPage;
}());

//# sourceMappingURL=picker-checker-dash.js.map

/***/ })

},[395]);
//# sourceMappingURL=main.js.map