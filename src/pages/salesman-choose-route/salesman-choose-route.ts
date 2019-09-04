import { Component } from '@angular/core';
import { 
  NavController,
  NavParams, 
  LoadingController,
  AlertController
 } from 'ionic-angular';
import {RouteHomePage} from '../route-home/route-home';
import { NetController } from '../net_controller';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { NavigationApiProvider } from '../../providers/navigation-api/navigation-api';


import { Toast } from '../ToastReplacement';
/**
 * Generated class for the SalesmanChooseRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salesman-choose-route',
  templateUrl: 'salesman-choose-route.html',
})
export class SalesmanChooseRoutePage extends NetController {

  api = this.japi;
  customers =  this.fetchResourceList( "customers", "customers", "name", this.generateResourceFilter("", "") );
  products = this.fetchResourceList( "products", "items", "itemName", this.generateResourceFilter("", "") );
  routes : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public  lctrl : LoadingController,
    public japi : JavaApiProvider,
    public napi : NavigationApiProvider,
    public alertCtrl : AlertController ) {

    super();
    this.napi.getRoutes();
    

  }


  ionViewDidEnter(){
    this.napi.getRoutes();
     this.japi.http.get(`${this.japi.URL}truck_information`, this.japi.httpOptions)
    .subscribe(
        (res : any) => {
          if(!res.data || !res.data.routes){
            Toast.show("Error, failed to get employee routes, is this employee assigned?","","");
            return;
          }
          
          this.routes = res.data.routes;
          for (var i = this.routes.length - 1; i >= 0; i--) {

            let route = this.routes[i];
            let routeLocal = this.napi.getRouteByIdSync(route._id);
            this.routes[i] = Object.assign(this.routes[i], routeLocal);

          }
        }
    ) 
  }

  ionViewDidLoad() {
   
   
  }

  openRoute(route){

  	this.navCtrl.push(RouteHomePage, {
      route : route
    });
  }

}
