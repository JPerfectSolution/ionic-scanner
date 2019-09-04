import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';


import {reorderArray} from 'ionic-angular';

import { NavigationApiProvider } from '../../providers/navigation-api/navigation-api';

/**
 * Generated class for the RouteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-route-list',
  templateUrl: 'route-list.html',
})
export class RouteListPage {

  shouldReorder : boolean = true;
  route : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public view : ViewController,public napi : NavigationApiProvider ) {
    
    this.route = navParams.get("route");

  }

  dismiss(route){
    this.napi.updateRoute(this.route);
    this.view.dismiss(route);
  }

  reorderItems(indexes) {
    this.route.stops = reorderArray(this.route.stops, indexes);
  }

}
