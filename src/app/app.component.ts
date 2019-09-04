import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { SalesmanDashboardPage } from '../pages/salesman-dashboard/salesman-dashboard';
import { PickerCheckerDashPage } from '../pages/picker-checker-dash/picker-checker-dash';


import { NewOrderSearchPage } from '../pages/new-order-search/new-order-search';
import {CustomerProfilePage} from '../pages/customer-profile/customer-profile';
import {DriverNavPage} from '../pages/driver-nav/driver-nav';
import {JavaApiProvider} from '../providers/java-api/java-api';
import {NavigationApiProvider} from '../providers/navigation-api/navigation-api';
import {IotApiProvider} from '../providers/iot-api/iot-api';
import {Toast} from '../pages/ToastReplacement';
import {RecordLossPage} from '../pages/record-loss/record-loss';
import {UpdatePasswordPage} from '../pages/update-password/update-password';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, show : string}>;
  currentPageName : string = "";
  customers : any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public japi : JavaApiProvider,
    private napi : NavigationApiProvider,
    public alt : AlertController,
    private iapi : IotApiProvider,
    public modalCtrl : ModalController) {
    
    this.initializeApp();

    Toast.alt = alt;

    try {
      napi.getLocationInBackground();
    } catch (e) {
      console.log(e);
    }
    this.pages = [
      { title : 'Dashboard', component : SalesmanDashboardPage, show : 'sale' },
      { title : 'Dashboard', component : PickerCheckerDashPage, show : 'picker' },
      { title : 'Home', component : DriverNavPage , show : 'driver'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


       this.japi.isLoggedIn()
        .then(
          (token : string) => {
           // if(token)
             this.japi.setToken(token);
             this.japi.loadType();
             this.japi.getType()
             .then(
               type => {
                 this.openInterface(type);
               },
               err => {
                 console.log(err);
               }
            )
          },
          err => {
            console.log(err);
          }
       )
    });
  }

  recordLoss(){
      this.nav.push(RecordLossPage, {});
  }

  testPrinter(){

    this.iapi.printSticker("Hello World'");
 
  }

  openInterface(type){
    switch (type) {
      case "sale":
              this.nav.setRoot(SalesmanDashboardPage);
        break;
      case "driver":
            this.nav.setRoot(DriverNavPage);
        break;
      default:
            this.nav.setRoot(PickerCheckerDashPage);
        break;
    }
  }

  ionViewDidEnter(){
    this.fetchCustomers();
  }

  updatePassword(){
    let profileModal = this.modalCtrl.create(UpdatePasswordPage, {  });
    profileModal.present();
  }

  checkNotifications(){
    this.napi.getCustomerID()
     .then(
       (res : any) => {
           let customer = this.getCustomer(res.customer);
           if(!customer)
             return;
           this.nav.push(CustomerProfilePage, {
             customer : customer
           })

       }
     )
  }

  fetchCustomers(){
      this.japi.http.get(`${ this.japi.URL }customers`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
          this.customers = res.data;
          this.checkNotifications();
        }
       )
  }

  logout(){
    this.japi.logout();
    this.napi.localIndex = [];
    this.napi.saveRoutes();
    this.nav.setRoot(LoginPage);
  }

  getCustomer(name){
    var result = false;

    for (var i = this.customers.length - 1; i >= 0; i--) {
      if(this.customers[i].name == name){
         result = this.customers[i];
         break;

      }
    }

    return result;
  }

  newOrder(){
    this.nav.push(NewOrderSearchPage, { action : 0 });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.currentPageName = page.title;
    this.nav.setRoot(page.component);
  }
}
