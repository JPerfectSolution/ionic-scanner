import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { InvoicePage } from '../invoice/invoice';
import { JavaApiProvider } from '../../providers/java-api/java-api';

import { NetController } from '../net_controller';

import { SalesmanCustomerOrderSummaryPage } from "../salesman-customer-order-summary/salesman-customer-order-summary";
import { ToastController } from 'ionic-angular';


import {
  CallNumber
} from '@ionic-native/call-number';
/**
 * Generated class for the CustomerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-profile',
  templateUrl: 'customer-profile.html',
})
export class CustomerProfilePage extends NetController {
  
  customer : any;
  total : number = 0;
  account : any;

  constructor(
  	public japi : JavaApiProvider,
  	public navCtrl: NavController,
  	public navParams: NavParams,
    private toast : ToastController,
    private callNumber: CallNumber ) {

  	super();
    this.customer = this.navParams.get("customer");
    this.dateRange = "24";
  	japi.setResource("invoices");
  }

  updateValDisp(){
     this.japi.presentLoading();
    setTimeout(() => {
      this.japi.hideLoading();
      this.dateRange = this.dateRange;
    }, 1200);
  };

  ionViewDidEnter(){
     this.japi.getAll().then((res : any) => {
     this.data = res.data.reverse();
          this.data.sort(function (a, b) {           
            if(!a.updatedAt || !b.updatedAt)
              return -1;
            return b.updatedAt - a.updatedAt;
          });
       this.fetchAccounts();
     });
  }

  calcTotal() {
     this.total = 0;
    for (var i = this.data.length - 1; i >= 0; i--) {
       let invoice = this.data[i];

       if(this.customer.name == invoice.customer){

           if(!invoice.value)
             invoice.value = 0;

           if(!invoice.taxVal)
             invoice.taxVal = 0;
           this.total +=  invoice.value - ( invoice.total + invoice.taxVal ) ;
       }

    }


    if(this.account.value)
      this.total += this.account.value;

  }

  getItemTotal(list : any){
    let total = 0;
    for (var i = list.length - 1; i >= 0; i--) {
      if(list[i].amt)
       total += list[i].amt;
    }
    return total;
  }

  newInvoice(customer){
     this.navCtrl.push(SalesmanCustomerOrderSummaryPage,
    {
      customer : customer
    })
  }

  getStatus(invoice){
    var status = "";

    if(!invoice.taxValue)
      invoice.taxValue = 0;

      if(invoice.value >= (invoice.total + invoice.taxValue) )
        return "COMPLETE";
    

    if(invoice.value)
    switch(invoice.value){
      case  0:
        status = "PENDING";
      break;
      default:
        status = "PAID";
      break;
    }

    if(!invoice.value){
      status = "NEW";
    }

    return status;
  }

  openInvoice(invoice){
    this.navCtrl.push(InvoicePage, {
      invoice : invoice,
      customer : this.customer
    })
  }

  call(customer){
    this.callNumber.callNumber(customer.contactNo, true)
    .then(res => this.toast.create({message:'Customer successfully dialed..', duration : 5000,  position: 'top'}) )
    .catch(err => this.toast.create({message : 'Failed to dial customer.', duration: 5000, position:'top' }) );
  }


  createAccount(account){

    this.japi.http.post(`${this.japi.URL}accounts`, account, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
           this.toast.create({message : "Customer account created", duration :5000, position:'top'})
        }
    )
  }


  fetchAccounts(){
     this.japi.http.get(`${this.japi.URL}accounts`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
            let accounts = res.data;

            for (var i = accounts.length - 1; i >= 0; i--) {
              let account = accounts[i];
              if(account.owner == this.customer._id){
                this.account = account;
                this.calcTotal();
   
                break;
              }
            }

            if(!this.account){
              this.account = {owner : this.customer._id, value : 0};
              this.createAccount(this.account);
              this.calcTotal();
            }
        }
     );
  }



}
