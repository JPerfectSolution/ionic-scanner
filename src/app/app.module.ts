import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SalesmanDashboardPage } from '../pages/salesman-dashboard/salesman-dashboard';
import { CustomerProfilePage } from '../pages/customer-profile/customer-profile';
import { NewOrderSearchPage } from '../pages/new-order-search/new-order-search';
import { SalesmanChooseRoutePage } from '../pages/salesman-choose-route/salesman-choose-route';
import { RouteHomePage } from '../pages/route-home/route-home';
import { RouteAddStopPage } from '../pages/route-add-stop/route-add-stop';
import { RouteListPage } from '../pages/route-list/route-list';
import { SalesmanStoponRoutePage } from '../pages/salesman-stopon-route/salesman-stopon-route';
import { SalesmanCustomerOrderSummaryPage} from '../pages/salesman-customer-order-summary/salesman-customer-order-summary';
import { PickerCheckerDashPage } from '../pages/picker-checker-dash/picker-checker-dash'
import { PickerChooseRoutePage } from '../pages/picker-choose-route/picker-choose-route';

import { RoutePickPage } from '../pages/route-pick/route-pick';

import { StopstoPickPage } from '../pages/stopsto-pick/stopsto-pick';
import { PickProductPage } from '../pages/pick-product/pick-product';
import { SignaturePadPage } from '../pages/signature-pad/signature-pad';

import { UpdatePasswordPage } from '../pages/update-password/update-password';
import { ItemFilter } from '../pages/salesman-customer-order-summary/filterPipe';

import {
    AddNewProductPage
} from '../pages/add-new-product/add-new-product';

import {
    RecordLossPage
} from '../pages/record-loss/record-loss';

import { CheckinVendorProductPage } from '../pages/checkin-vendor-product/checkin-vendor-product';
import { AssignvendorProductDetailsPage } from '../pages/assignvendor-product-details/assignvendor-product-details';
import { InvoicePage } from '../pages/invoice/invoice';
import {
    DriverNavPage
} from '../pages/driver-nav/driver-nav';

import {
    DevicesPage
} from '../pages/devices/devices';


import { Device } from '@ionic-native/device';

import { EnterCcPage } from '../pages/enter-cc/enter-cc';

import { PaymentFlowPage } from '../pages/payment-flow/payment-flow';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { ChartModule } from 'angular2-chartjs';
import { JavaApiProvider } from '../providers/java-api/java-api';
import { NavigationApiProvider } from '../providers/navigation-api/navigation-api';
import { IotApiProvider } from '../providers/iot-api/iot-api';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { BackgroundFetch } from '@ionic-native/background-fetch';
import { Geolocation } from '@ionic-native/geolocation';


import { LocalNotifications } from '@ionic-native/local-notifications';

import { ActionSheet } from '@ionic-native/action-sheet';
//import { Toast } from '@ionic-native/toast';
import { Stripe } from '@ionic-native/stripe';



import { SignaturePadModule } from 'angular2-signaturepad';
import { ProgressBarModule} from 'angular-progress-bar';


import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SecureStorage } from '@ionic-native/secure-storage';
import { ProductSelectionPage } from '../pages/product-selection/product-selection';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { PodSelectionPage } from '../pages/pod-selection/pod-selection';
import { EditPodPage } from '../pages/edit-pod/edit-pod';
import { UnkownBarcodePage } from '../pages/unkown-barcode/unkown-barcode';
import { OrderChannelsPage } from '../pages/order-channels/order-channels';
import { OrderRoutesTabPage } from '../pages/order-routes-tab/order-routes-tab';
import { StopsSelectionPage } from '../pages/stops-selection/stops-selection';
import { PickingOrderPage } from '../pages/picking-order/picking-order';
import { ScanningPage } from '../pages/scanning/scanning';

let components = [
    MyApp,
    LoginPage,
    SalesmanDashboardPage,
    CustomerProfilePage,
    NewOrderSearchPage,
    SalesmanChooseRoutePage,
    RouteHomePage,
    RouteAddStopPage,
    RouteListPage,
    SalesmanStoponRoutePage,
    SalesmanCustomerOrderSummaryPage,
    PaymentFlowPage,
    PickerCheckerDashPage,
    PickerChooseRoutePage,

    ProductSelectionPage,
    PodSelectionPage,
    EditProductPage,
    EditPodPage,
    UnkownBarcodePage,
    OrderChannelsPage,
    OrderRoutesTabPage,
    StopsSelectionPage,
    PickingOrderPage,
    ScanningPage,
    
    StopstoPickPage,
    PickProductPage,
    CheckinVendorProductPage,
    AssignvendorProductDetailsPage,
    InvoicePage,
    EnterCcPage,
    DevicesPage,
    DriverNavPage,
    SignaturePadPage,
    AddNewProductPage,
    RecordLossPage,
    UpdatePasswordPage,
    RoutePickPage
  ];

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SalesmanDashboardPage,
    CustomerProfilePage,
    NewOrderSearchPage,
    SalesmanChooseRoutePage,
    RouteHomePage,
    RouteAddStopPage,
    RouteListPage,
    SalesmanStoponRoutePage,
    SalesmanCustomerOrderSummaryPage,
    PaymentFlowPage,
    PickerCheckerDashPage,
    PickerChooseRoutePage,

    ProductSelectionPage,
    PodSelectionPage,
    EditProductPage,
    EditPodPage,
    UnkownBarcodePage,
    OrderChannelsPage,
    OrderRoutesTabPage,
    StopsSelectionPage,
    PickingOrderPage,
    ScanningPage,

    StopstoPickPage,
    PickProductPage,
    CheckinVendorProductPage,
    AssignvendorProductDetailsPage,
    InvoicePage,
    EnterCcPage,
    DevicesPage,
    DriverNavPage,
    SignaturePadPage,
    AddNewProductPage,
    RecordLossPage,
    UpdatePasswordPage,
    RoutePickPage,
    ItemFilter
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    ChartModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SignaturePadModule,
    ProgressBarModule,
    SuperTabsModule.forRoot(),
  ],
  exports : [
    ComponentsModule,
    ChartModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JavaApiProvider,
    NavigationApiProvider,
    IotApiProvider,
    Stripe,
    ActionSheet,
    BackgroundGeolocation,
    BackgroundFetch,
    LocalNotifications,
    CallNumber,
    SocialSharing,
    SecureStorage,
    Device,
    Geolocation
  ]
})
export class AppModule {}