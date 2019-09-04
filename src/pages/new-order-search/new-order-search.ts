import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { SalesmanChooseRoutePage } from '../salesman-choose-route/salesman-choose-route';
import { CustomerProfilePage } from '../customer-profile/customer-profile';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { NetController } from "../net_controller";

import { SalesmanCustomerOrderSummaryPage } from "../salesman-customer-order-summary/salesman-customer-order-summary";
/**
 * Generated class for the NewOrderSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-order-search',
  templateUrl: 'new-order-search.html',
})
export class NewOrderSearchPage extends NetController {

  action : number;

  constructor(
    public japi : JavaApiProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    super();
    this.action = this.navParams.get("action");
    this.japi.setResource("customers");
  }

  selectRow(customer){
    switch (this.action) {
      case 0:
        // code...
          this.newOrder(customer);
        break;
      
      default:
        // code...
          this.openHistory(customer);
        break;
    }
  }

  openHistory(customer){
    this.navCtrl.push(CustomerProfilePage, {
      customer : customer
    });
  }

  newOrder(customer){
    this.navCtrl.push(SalesmanCustomerOrderSummaryPage,
    {
      customer : customer
    })
  }

  ionViewDidLoad() {
     this.japi.getAll().then((res : any) => {
       this.data = res.data;
     });
  }

  viewRoute(){ 
  	  this.navCtrl.push(SalesmanChooseRoutePage, {});
  }

}
