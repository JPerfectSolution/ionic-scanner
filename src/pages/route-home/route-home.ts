import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { RouteAddStopPage } from '../route-add-stop/route-add-stop';
import { RouteListPage } from '../route-list/route-list';
import { CustomerProfilePage } from '../customer-profile/customer-profile';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

import { Toast } from '../ToastReplacement';
import { HttpErrorResponse } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker
} from '@ionic-native/google-maps';

import { 
  NavigationApiProvider
} from '../../providers/navigation-api/navigation-api';

import { 
  JavaApiProvider
} from '../../providers/java-api/java-api';


import {
  SalesmanCustomerOrderSummaryPage
} from '../salesman-customer-order-summary/salesman-customer-order-summary';
/**
 * Generated class for the RouteHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-route-home',
  templateUrl: 'route-home.html',
})
export class RouteHomePage {

  map : GoogleMap;
  public route : any = false;
  customers : any;
  cacheCount : number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public napi : NavigationApiProvider,
    public alertCtrl : AlertController,
    private actionSheet : ActionSheet,
    public japi : JavaApiProvider,
    public modalCtrl: ModalController,
    private geolocation : Geolocation  ) {
      

  }

  ionViewDidEnter(){
    let route = this.navParams.get("route");
    let routeId = route._id;

    this.getCustomers();

    this.napi.getRouteById(routeId)
      .then(
        (res : any) => {
            

            if(!res){
              this.napi.addRoute(route.name, route.stops,route._id);
              this.japi.loading = this.japi.loadingCtrl.create({
              content: 'Downloading location data',
              spinner : 'dots'
              });
              this.japi.loading.present();

              if(!route.stops)
                route.stops = [];

             

               this.napi.storage.get(`route_order_${route._id}`).then((val) => {
                 console.log("Getting cache");

                 if(val){

                     var pastStops = JSON.parse(val);
                     var newStopArray = [];

                     for (var i = pastStops.length - 1; i >= 0; i--) {
                       newStopArray.push(pastStops[i]._id);
                     }

                     for (var j = route.stops.length - 1; j >= 0; j--) {
                       var stop = route.stops[j];
                       if(newStopArray.indexOf(stop) === -1){
                         newStopArray.push(stop);
                       }
                     }

                     route.stops = newStopArray;
                 }

               
                   route.stops = route.stops.filter(stop => stop != null);

                  this.cacheCount = route.stops.length;
                  route.id = route._id;
                  route.status = "pending";
                  this.route = route;
                  for (var k = route.stops.length - 1; k >= 0; k--) {
                    let stopId = route.stops[k];
                    if(stopId)
                      this.getLocationData(stopId);
                  }

              }, error => console.log(error));

            } else {
                delete route.stops;
                delete route.id;

                this.route = Object.assign(res,route);
                this.loadMap();  
            }

              
        }
      )


  }

  getLocationData(location){
    if(!location){
      this.updateCache();
      return;
    }

    this.japi.http.get(`${this.japi.URL}locations/${location}`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
         if(!res.data){

           this.getCustomerData(location);
           return;
         }


         let index = this.route.stops.indexOf(location);



         this.route.stops[index] = res.data;
         this.napi.updateRoute(this.route);
         this.updateCache();

      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        this.getLocationData(location);
      }
    )

  }

  updateCache(){

     

     this.cacheCount--;
       if(this.cacheCount <= 0){

         var current =  (new Date()).getTime() - (42300 * 1000);
         for (var i = this.route.stops.length - 1; i >= 0; i--) {
             var stop = this.route.stops[i];
             if(stop.disabled){
               if(stop.disabled > current ){
                   var indx = this.findStopIndex(stop._id, this.route.stops);
                   this.route.stops.splice(indx, 1);
               }
             }
         }

           if(this.japi.loading)
             this.japi.hideLoading();
          this.loadMap();
          console.log("finished", this.route);
      }
  }

  getCustomerData(customer){
     this.japi.http.get(`${this.japi.URL}customers/${customer}`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
         
         if(res.data){
           let index = this.route.stops.indexOf(customer);
           this.route.stops[index] = res.data;
           this.route.stops[index].customer = res.data.name;
           this.route.stops[index].isCustomer = true;
           this.napi.updateRoute(this.route);
         }

         this.updateCache();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        this.getCustomerData(customer);
      }
    )
  }

  getLocation(){


    this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
        
        this.napi.checkOnActiveRoute(resp.coords);

    }).catch((error) => {
       console.log('Error getting location', JSON.stringify(error));
       Toast.show("Error, could not get location", '3000',  'top');
    });

  }

  getCustomers(){
    this.japi.http.get(`${this.japi.URL}customers`, this.japi.httpOptions)
    .subscribe(
        (res : any) => {  
             this.customers = res.data;
        }
      );
  }



  routeAction(route){

    switch(route.status){
       case "pending":
         this.shouldStart(route);
       break;
       case "complete":
         this.checkStopsUnsoldFor(this.route);
         this.route = this.defaultRoute(this.route);
         Toast.show('Route complete','','');
         this.route.status = "pending";
       break;
       default:
         this.nextStop(route);
       break;
    }
  }

  checkStopsUnsoldFor(route){
      for (var i = route.stops.length - 1; i >= 0; i--) {
        if(!route.stops[i].soldTo){
            this.sendAlert(route.stops[i]);
        }
      }
  }

  sendAlert(stop){

    this.japi.http.post(`${this.japi.URL}alerts`, {
      title : `No orders were placed on stop ${stop.name}`,
      description : "No orders were placed while salesman was here."
    }, this.japi.httpOptions)
    .subscribe(
        (res : any) => {

        }
    )
  }

  defaultRoute(route){

    for (var i = route.stops.length - 1; i >= 0; i--) {
      route.stops[i].cleared = false;
    }

    return route;
  }

  nextStop(route){
    let result = false;
    for (var i = 0; i < route.stops.length; i++) {
      // code...
      let stop = route.stops[i];
      if(!stop.cleared){
        this.focusTo(stop);
        result = stop;
        break;
      }
    }

    if(!result){
        
       
        this.napi.activeRoute = false;
        this.route.status = "complete";
        this.route.active = false;
        Toast.show('Route complete!', '','');
        this.napi.updateRoute(this.route);

    }

    return result;
  }

  focusTo(location){
    this.map.animateCamera({
      target: {lat: location.geometry.location.lat, lng: location.geometry.location.lng },
      zoom: 18,
      tilt: 30,
      duration: 5000
    })
  }

  clearStop(){
    let stopClose : any = this.nextStop(this.route);

     this.route = this.napi.locationTool
              .clearStop(this.route, stopClose._id);

     this.napi.activeRoute = this.route;
     this.napi.updateRoute(this.route);

     this.routeAction(this.route);
  }

  shouldStart(route){
      let alert = this.alertCtrl.create({
      title: 'Confirm route',
      message: 'Do you want to start this route, once started you will not be able to update your stops?',
      buttons: [
        'Cancel',
        {
          text: 'Start',
          handler: () => {
              this.nextStop(route);
              route.status = "active";
              route.active = true;
              this.napi.updateRoute(route);
              
          }
        }
      ]
    });
    alert.present();
  }

  shouldDelete(route){
     let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to remove this route?',
      buttons: [
        'Cancel',
        {
          text: 'Remove',
          handler: () => {
             this.napi.removeRoute(route);
             this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


  addStop() {
  	this.navCtrl.push(RouteAddStopPage, {
      route : this.route,
      customers : this.customers
    });
  }

  listView() {
  	let modal = this.modalCtrl.create(RouteListPage, { route : this.route });
     modal.onDidDismiss(data => {
         this.route = data;
         this.napi.updateRoute(this.route);
     });
     modal.present();
  }

  firstStopWithGeometry(stops)  :any{
    var result = false;

    for (var i = stops.length - 1; i >= 0; i--) {
      if(stops[i].geometry){
        result = stops[i];
        break;
      }
    }

    return result;
  }

  loadMap() {

    if(this.map){
      this.map.clear();
    }

    if(!this.map){

       let centerAt = this.route.stops.length != 0 && this.route.stops[0].geometry.location ? this.route.stops[0] : {
        geometry : {
            location : { lat : 44.477500, lng : -73.174870 }
        }
      };

      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: centerAt.geometry.location.lat,
             lng: centerAt.geometry.location.lng
           },
           zoom: 18,
           tilt: 30
         }
      };
      this.map = GoogleMaps.create('map_canvas', mapOptions);
    }


    this.napi.addLocations(this.map,this.route.stops, 'blue', this.generateActionHandler(this));

  }

  openProfile(customer){

    this.navCtrl.push(CustomerProfilePage, {
      customer : customer
    });
  }

  findCustomer(name){
    var result = false;

    for (var i = this.customers.length - 1; i >= 0; i--) {
       if( this.customers[i].name == name ){
           result = this.customers[i];
           break;
       }
    }

    return result;
  }

  findStopIndex(id, stops){
    var result = -1;
    for (var i = stops.length - 1; i >= 0; i--) {
      if(stops[i]._id == id){
          result = i;
          break;
      }
    }

    return result;
  }


  removeStop(stop){
    
    let stops = this.route.stops;
    let index = this.findStopIndex(stop._id, stops);

    this.removeStopLock(stop);

    this.route.stops.splice(index, 1);
    this.napi.updateRoute(this.route);


     Toast.show('Stop removed', '3000',  'top');
  }

  removeStopLock(stop){
    this.japi.http.delete(`${this.japi.URL}route_lock/${stop._id}`, this.japi.httpOptions)
    .subscribe(
        (res : any) => {
           Toast.show( res.success ? 'Stop removed...' : 'Stop could not be removed, please try again...', '5000' ,  'top');
          if(res.success){
            this.removeStop(stop);
          }
        }
     )
  }

  newInvoice(customer, stop){
    this.navCtrl.push(SalesmanCustomerOrderSummaryPage, {
      customer : customer,
      stop : stop
    })
  }

  disableStop(res, id){
    this.japi.http.put(`${this.japi.URL}${res}/${id}`, { disabled : (new Date()).getTime() } ,this.japi.httpOptions)
    .subscribe(
      (res : any) => {
         
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
      }
    )
  }


  generateActionHandler(contrl : RouteHomePage )  {
        return function(stop, marker : Marker){

          if(!contrl.customers){
             Toast.show('One moment... (loading customers)', '5000' ,  'top');
            return;
          }

          let buttonLabels = ['Open in GPS', 'New invoice','Open customer profile','Move to next stop', 'Not available'];

          const options: ActionSheetOptions = {
            title: 'Manage stop',
            subtitle: 'Choose an action',
            buttonLabels: buttonLabels,
            addDestructiveButtonWithLabel: 'Cancel',
            destructiveButtonLast: true
          };


          contrl.actionSheet.show(options).then((buttonIndex: number) => {
              switch (buttonIndex) {
                case 0:

                break;
                case 1:
                  contrl.napi.openInMaps(stop);
                break;
                case 2:

                  let c = contrl.findCustomer(stop.customer);
                  contrl.newInvoice(c , stop._id);

                break;
                case 3:
                  // code...
                  let customer = contrl.findCustomer(stop.customer);
                  contrl.openProfile(customer);
                  break;
                case 4:
                    let alert = contrl.alertCtrl.create({
                        title: 'Confirm completion',
                        message: 'Have you finished selling to this this location?',
                        buttons: [
                           'Cancel',
                          {
                            text: 'Next',
                            handler: () => { 
                                contrl.clearStop();
                                marker.remove();

                              

                            }
                          }
                        ]
                      });
                      alert.present();
                break;
                case 5:
                    let alert1 = contrl.alertCtrl.create({
                        title: 'Confirm Unavailability',
                        message: 'This stop will be disabled for 12 hours?',
                        buttons: [
                           'Cancel',
                          {
                            text: 'Next',
                            handler: () => { 
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
        }
  }


}
