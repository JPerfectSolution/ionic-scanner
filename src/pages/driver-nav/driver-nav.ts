import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

import {
	RouteListPage
} from '../route-list/route-list';

import {
	JavaApiProvider
} from '../../providers/java-api/java-api';

import {
	NavigationApiProvider
} from '../../providers/navigation-api/navigation-api';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker
} from '@ionic-native/google-maps';

import {
	Toast
} from '../ToastReplacement';

import { Geolocation } from '@ionic-native/geolocation';

import { StopstoPickPage } from '../stopsto-pick/stopsto-pick';

/**
 * Generated class for the DriverNavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-driver-nav',
  templateUrl: 'driver-nav.html',
})
export class DriverNavPage {

  route : any = { stops : [] };
  routes : any = [];
  map : GoogleMap;
  truck : any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public japi : JavaApiProvider,
  	public actionSheet : ActionSheet,
  	public napi : NavigationApiProvider,
  	public modalCtrl : ModalController,
    private geolocation: Geolocation,
    public alertCtrl : AlertController ) {

    this.loadMap();
   
   
  }

  ionViewDidEnter(){
  	this.japi.presentLoading();
    this.napi.storage.keys()
    .then(keys => {

    
      if(keys.indexOf("shouldClear") !== -1){
          this.clearStop();
       
          Toast.show("Stop cleared","","");

          this.napi.storage.remove("shouldClear")
          .then(() => console.log("Hook removed!"));
      }

    });
  	setTimeout(() => {
      this.getTruckInformation();
  		this.napi.storage.get("route")
  		.then(
  			route => {
  				this.japi.hideLoading();

  				if(route){
  					this.route = route;
            this.loadMap();
  				}
  			}
  		).catch(
  			err => {
          console.log(err);
  				this.japi.hideLoading();
  			}
  		)

    
  	}, 1300);

    // detect any stores

  }

  clearRoute(){
      let alert = this.alertCtrl.create({
        title: 'Reset route.',
        message: 'Do you want to clear route settings?',
        buttons: [
          'Cancel',
          {
            text: 'Select',
            handler: () => {
               this.napi.storage.remove("route")
                .then(() => {
                    this.route = { stops : [] };
                    this.ionViewDidEnter();
                })

            }
          }
        ]
      });
      alert.present();
  }

  getTruckInformation(){


    this.japi.http.get(`${this.japi.URL}truck_information`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
        this.truck = res.data;
        this.routes = this.truck.routes;
      }
    )
  }

  getInvoice(locationId){
      var result;

      for (var i = this.route.invoices.length - 1; i >= 0; i--) {
        let inv = this.route.invoices[i];

        if(inv.location == locationId){
            result = inv;
            break;
        }
      }

      return result;
  }

  getLocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
         let stopClose = this.napi.locationTool
         .detectClosestStore(this.route.list, resp.coords);



         if (stopClose){
            this.route = this.napi.locationTool
            .clearStop(this.route, stopClose);

            this.napi.storage
            .set("route", this.route)
            .then(
              () => {
                console.log("Route information saved.");
              }
             )
         }

    }).catch((error) => {
       console.log('Error getting location', JSON.stringify(error));
       Toast.show("Error, could not get location", '3000',  'top');
    });

  }


  getRoute(req){

        let alert = this.alertCtrl.create({
        title: 'Select route.',
        message: 'Do you want to select this route?',
        buttons: [
          'Cancel',
          {
            text: 'Select',
            handler: () => {
               this.saveRoute(req);
            }
          }
        ]
      });
      alert.present();

  }



  saveRoute(req){
    this.japi.presentLoading();
    this.japi.http.post(`${this.japi.URL}truck_route`, req, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
        this.japi.hideLoading();
        Toast.show(res.message, '5000',  'top');

        if(res.data){
          this.route = Object.assign({}, res.data);
          
          
          for (var i = this.route.stops.length - 1; i >= 0; i--) {
            let stop = this.route.stops[i];
            if(this.route.route.indexOf(stop._id) == -1){
              this.route.route.push(stop._id);
            }
          }

          this.napi.storage.set("route", this.route)
          .then(
            () => this.loadMap()
          )
        }

      }
    )
  }

  alertRouteStart(){
      this.japi.http.get(
        `${this.japi.URL}start_truck_route/${this.truck.name}`,
         this.japi.httpOptions
       )
      .subscribe(
          (res : any) => {

          }
       )
  }

 alertRouteEnd(){
      this.japi.http.get(
        `${this.japi.URL}end_truck_route/${this.truck.name}`,
         this.japi.httpOptions
       )
      .subscribe(
          (res : any) => {

          }
       )
  }

  routeAction(route){
  	// move too, toast 
  	// and open in maps after a bit
    let nextStop = this.nextStop(route);


    if(route.status == 'pending'){
      this.alertRouteStart();
      route.status = 'active';
    }

    if(!nextStop){
      this.alertRouteEnd();
      this.completeRoute(route);
      return;
    }

      this.focusTo(nextStop);
      this.updateRoute();

  }

  getIds(route){
    let ids = [];

    for (var i = route.invoices.length - 1; i >= 0; i--) {
      ids.push(route.invoices[i]._id);
    }

    return ids.join(",");
  }

  completeRoute(route){
    this.japi.presentLoading();
    this.japi.http.get(`${this.japi.URL}truck_complete/${this.getIds(route)}`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
        this.japi.hideLoading();

         Toast.show(res.message, '5000',  'top');

        if(res.success){
          this.route = {stops : [] };
          this.map.clear();
           this.napi.storage.remove("route")
           .then(
             () => {
                 console.log("route removed.")
             }
            )
        }

      }
    )
  }

  nextStop(route){
    let result = false;

    for (var i = route.stops.length - 1; i >= 0; i--) {
       if(!route.stops[i].cleared){
         result = route.stops[i];
         break;
       }
    }

    return result;
  }

  getRouteFrom(stops){
    let result = [];

    for (var i = stops.length - 1; i >= 0; i--) {
       result.push(stops[i]._id);
    }

    return result;
  }

  openInvoice(stop){
      let invoice : any = this.getInvoice(stop._id);
      let stops = this.getRouteFrom(this.route.stops);

      this.navCtrl.push(StopstoPickPage,
         {
           fc : true,
           route : stops,
           id : invoice._id
      })
  }


  generateActionHandler(contrl : DriverNavPage )  {
        return function(stop, marker : Marker){


          let buttonLabels = ['Open in GPS','Scan invoice items', 'Move to next stop', 'Not available'];

          const options: ActionSheetOptions = {
            title: 'Manage stop',
            subtitle: 'Choose an action',
            buttonLabels: buttonLabels,
            addDestructiveButtonWithLabel: 'Cancel',
            destructiveButtonLast: true
          };

          var alert;

          contrl.actionSheet.show(options).then((buttonIndex: number) => {
            console.log(buttonIndex);
              switch (buttonIndex) {
                case 0:

                break;
                case 1:
                  contrl.napi.openInMaps(stop);
                break;
                case 2:
                  // code...
                      let invoice : any = contrl.getInvoice(stop._id);
                      contrl.navCtrl.push(StopstoPickPage,
                    {
                      fc : true,
                      id : invoice._id
                    })
                   
                 break;
                 case 3:
                    alert = contrl.alertCtrl.create({
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
                case 4:
                     alert = contrl.alertCtrl.create({
                        title: 'Confirm Unavailability',
                        message: 'This stop will be disabled for 12 hours?',
                        buttons: [
                           'Cancel',
                          {
                            text: 'Next',
                            handler: () => { 
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
        }
  }

  disableStop(res, id){
    this.japi.http.put(`${this.japi.URL}${res}/${id}`, { disabled : (new Date()).getTime() } ,this.japi.httpOptions)
    .subscribe(
      (res : any) => {
         
      },
      (err : any) => {
        console.log(err.error);
        console.log(err.name);
      }
    )
  }


  clearStop(){
    let stopClose : any = this.nextStop(this.route);

      this.route = this.napi.locationTool
              .clearStop(this.route, stopClose._id);
      this.napi.updateRoute(this.route);

     this.routeAction(this.route);
  }

  focusTo(location){
    this.map.animateCamera({
      target: {lat: location.geometry.location.lat, lng: location.geometry.location.lng },
      zoom: 18,
      tilt: 30,
      duration: 5000
    })
  }

  listView(route){
  	let modal = this.modalCtrl.create(RouteListPage, { route : this.route });
     modal.onDidDismiss(data => {
        this.route = data;
        this.updateRoute();
     });
     modal.present();
  }

  updateRoute(){
    this.napi.storage
            .set("route", this.route)
            .then(
              () => {
                console.log("Route information saved.");
              }
      )
  }

  sortByRoute(){
    let newStops = [];

    for (var i = this.route.route.length - 1; i >= 0; i--) {
      let r = this.route.route[i];
      let l = this.getLocationById(this.route.stops, r);
      if(l){
        newStops.push(l);

      }
    }

    this.route.stops = newStops;

  }

  getLocationById(locations, id){
    var result = false;

    for (var i = locations.length - 1; i >= 0; i--) {
      let l = locations[i];
      if(id == l._id){
        result = l;
        break;
      }
    }

    return result;
  }

  loadMap() {

	    if(this.map){
	      this.map.clear();
	    }

      if(!this.route.status){
        this.route.status = "pending";
      }

      if(this.route.stops.length > 0){
        let stop = this.route.stops[0];
        this.focusTo(stop);
        this.sortByRoute();
      }

      var current =  (new Date()).getTime() - (42300 * 1000);
      for (var i = this.route.stops.length - 1; i >= 0; i--) {
             var stop = this.route.stops[i];
             if(stop.disabled){
               if(stop.disabled > current ){
                   this.route.stops.splice(i, 1);
               }
             }
       }



	    if(!this.map){

  	    let centerAt = this.route.stops.length != 0 ? this.route.stops[0] : {
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


	    this.napi.addLocations(this.map,this.route.stops, 'orange', this.generateActionHandler(this) );

	  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverNavPage');
  }

}
