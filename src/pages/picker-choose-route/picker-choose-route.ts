import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
	JavaApiProvider
} from '../../providers/java-api/java-api';

import {
	NetController
} from '../net_controller';

import {
	StopstoPickPage
} from '../stopsto-pick/stopsto-pick';
/**
 * Generated class for the PickerChooseRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-picker-choose-route',
  templateUrl: 'picker-choose-route.html',
})
export class PickerChooseRoutePage extends NetController {
  
  api = this.japi;

 
  routes : any = [];
  routeLocks : any = [];
  truck : any = { name : ""};
  route : any = {};
  routeArr : any = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public japi : JavaApiProvider) {
  	super();
    this.route = navParams.get("route");
    this.truck = navParams.get("truck");


    
  }

  getTruckStatus(){
    this.japi.http.get(`${this.japi.URL}routeLocks`, this.japi.httpOptions)
    .subscribe(
        (res : any) => {

          this.routeLocks = res.data;
      }
     )
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter PickerChooseRoutePage');

    this.getTruckStatus();
    this.japi.presentLoading();
    this.japi.http.post(`${this.japi.URL}picker_routes`, this.route ,this.japi.httpOptions)
    .subscribe(
    	(res : any) => {

    		this.japi.hideLoading();

    		if(!res.success){
    			return;
    		}
       
        
        this.sortByRoute(res.data);
        this.routeArr = res.data.route;
    	}
    )

  
  }

  isLocked(truck){
    let result = false;

    for (var i = this.routeLocks.length - 1; i >= 0; i--) {
      if( this.routeLocks[i].locationId == truck){
        result = true;
        break;
      }
    }


    return result;
  }

  openRoute(route){
  	this.navCtrl.push(StopstoPickPage, { 
      id : route._id,
      truck : this.truck,
      route : this.routeArr,
      routeName : this.route.name
    });
  }

  sortByRoute(picker_route){
    this.routes = [];

    if(picker_route.route)
      for (var i = picker_route.route.length - 1; i >= 0; i--) {
        let r = picker_route.route[i];
        let l : any = this.getLocationById(picker_route.orders, r);
        if(l){
            this.routes.push(l);
        }
      }

  }

  getLocationById(locations, id){
    var result = false;

    for (var i = 0; i < locations.length; i++) {
      let l = locations[i];
      if(id == l.location){
        result = l;
        break;
      }
    }

    return result;
  }


}
