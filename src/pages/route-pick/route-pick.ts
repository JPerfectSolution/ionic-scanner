import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {
	JavaApiProvider
} from '../../providers/java-api/java-api';

import {
	PickerChooseRoutePage
} from '../picker-choose-route/picker-choose-route';

/**
 * Generated class for the RoutePickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-route-pick',
  templateUrl: 'route-pick.html',
})
export class RoutePickPage {
  
  routes : any = [];
  routeLocks : any = [];
  truck : any = { name : ""};
  route : any = {};

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public japi : JavaApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutePickPage');
  }

  openRoute(route){
  	this.navCtrl.push(PickerChooseRoutePage, {
  		route : route,
  		truck : this.truck
  	})
  }



   ionViewDidEnter() {
    console.log('ionViewDidEnter');


    this.japi.presentLoading();
    this.japi.http.get(`${this.japi.URL}truck_information`,this.japi.httpOptions)
    .subscribe(
    	(res : any) => {

    		this.japi.hideLoading();

    		if(!res.success){
    			return;
    		}
    		this.truck = res.data;
       
      	this.routes = res.data.routes;
    		
    	}
    )

  
  }

}
