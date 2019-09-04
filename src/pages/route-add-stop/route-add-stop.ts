import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
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

import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

import { Toast } from '../ToastReplacement';

import { NetController } from '../net_controller';
/**
 * Generated class for the RouteAddStopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-route-add-stop',
  templateUrl: 'route-add-stop.html',
})
export class RouteAddStopPage extends NetController {
  map : GoogleMap;
  locations : any;
  route : any;
  customers : any;
  employees : any;
  locks : any;
  assignedCustomers : any = [];

  selectedMarker : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public  japi : JavaApiProvider,
    public napi : NavigationApiProvider,
    public actionSheet : ActionSheet) {
    super();
    this.route = navParams.get("route");
    this.customers = navParams.get("customers");
    
    this.japi.http.get(`${this.japi.URL}truck_information`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
        if(res.data.stops)
          this.assignedCustomers = res.data.stops;

          this.fetchLocks();
      }
    )
   
  }



  fetchLocks(){
    this.japi.presentLoading();
    this.japi.http.get(`${this.japi.URL}routeLocks`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
          this.japi.hideLoading();
          this.locks = res.data;
          this.fetchEmployees();
      }
    )
  }

  fetchEmployees(){
    this.japi.presentLoading();
    this.japi.http.get(`${this.japi.URL}employees`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
        this.japi.hideLoading();
          this.employees = res.data;
          this.fetchLocations();
      }
    )
  }


  getEmployeeName(email){
    let result = "";

    for (var i = this.employees.length - 1; i >= 0; i--) {
      if(this.employees[i].email == email){
          result = this.employees[i].name;
          break;
      }
    }
    return result;
  }

  lockedBy(location){
    let result;

    for (var i = this.locks.length - 1; i >= 0; i--) {
      if(this.locks[i].locationId == location._id){
        let owner = this.locks[i].owner;
        if(owner && owner.includes("@") && owner.length != 0){
          result = this.getEmployeeName(owner);
        } else {
          result = "Unknown";
        }
        break;
      }
    }

    return result;
  }

  fetchLocations(){
  	this.japi.presentLoading();
  	this.japi.http.get(`${this.japi.URL}locations`, this.japi.httpOptions)
  	.subscribe(
  		(res : any) => {
  			this.japi.hideLoading();
  			this.locations = res.data;

        for (var i = this.customers.length - 1; i >= 0; i--) {
          var customer = this.customers[i];
          let hasLocation = this.hasLocation(res.data, customer);
          if(!hasLocation){
            customer.customer = customer.name;
            this.locations.push(customer);
          }
        }

        this.filterAssignedLocations();
        this.filterReservedLocations();
       

  			this.loadMap();
        
  		}
  	)
  }

  filterReservedLocations(){
    for (var i = this.locations.length - 1; i >= 0; i--) {
      let location = this.locations[i];

      let reservedBy = this.lockedBy(location);

      if(reservedBy){
        this.locations[i].name = `${location.name} — Reserved by ${reservedBy}`;
      } 
    }
  }

  filterAssignedLocations(){
      var newLocations = [];

      for (var i = this.locations.length - 1; i >= 0; i--) {
        if(this.assignedCustomers.indexOf( this.locations[i]._id ) !== -1){
            newLocations.push(this.locations[i]);
        }
      }

      if(newLocations.length == 0){
        Toast.show('Error, this employee has not been assigned any routes...','','');
      }

      this.locations = newLocations;
  }

  hasLocation(locations, customer){
      var result = false;
      for (var i = locations.length - 1; i >= 0; i--) {
        if(locations[i].customer == customer.name){
          result = true;
          break;
        }
      }

      return result;
  }



  focusTo(location){
  	this.filterString = "";
    this.map.animateCamera({
      target: {lat: location.geometry.location.lat, lng: location.geometry.location.lng },
      zoom: 18,
      tilt: 30,
      duration: 5000
    })
  }

  loadMap() {

    let centerAt = this.locations.length > 0 ? this.locations[0].geometry.location  :
    { lat : 44.477500, lng : -73.174870 } ;
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: centerAt.lat,
           lng: centerAt.lng
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_add', mapOptions);
    this.napi.addLocations(this.map,this.locations, 'red', this.generateActionHandler(this) );

  }

  addStop(stop , marker : Marker){
     this.japi.presentLoading();
     this.japi.http.post(`${this.japi.URL}route_lock`, stop, this.japi.httpOptions)
     .subscribe(
         (res : any) => {
             this.japi.hideLoading();
              Toast.show(res.message, '5000',  'top');
             if(res.success){
                this.route.stops.push(stop);
                this.napi.updateRoute(this.route);
                marker.remove();
             }
         }
       );    
  }


  generateActionHandler(contrl : RouteAddStopPage )  {

  return function(stop, marker : Marker){


      let buttonLabels = ['Take stop'];

      const options: ActionSheetOptions = {
        title: 'Add stop',
        subtitle: 'Choose an action',
        buttonLabels: buttonLabels,
        addDestructiveButtonWithLabel: 'Cancel',
        destructiveButtonLast: true
      };

      contrl.actionSheet.show(options).then((buttonIndex: number) => {
          switch (buttonIndex) {
            case 1:
              // code...
              contrl.addStop(stop, marker);
              break;
            
            default:
              break;
          }
      });

    }
  }

}
