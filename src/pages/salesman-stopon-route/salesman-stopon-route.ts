import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SalesmanCustomerOrderSummaryPage} from '../salesman-customer-order-summary/salesman-customer-order-summary';
/**
 * Generated class for the SalesmanStoponRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salesman-stopon-route',
  templateUrl: 'salesman-stopon-route.html',
})
export class SalesmanStoponRoutePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesmanStoponRoutePage');
  }

  viewSummary(){
  	this.navCtrl.push(SalesmanCustomerOrderSummaryPage, {});
  }

}
