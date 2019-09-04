import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, AlertController } from 'ionic-angular';

import { PaymentFlowPage } from '../payment-flow/payment-flow';

import { JavaApiProvider } from '../../providers/java-api/java-api';

import {
  IotApiProvider
} from '../../providers/iot-api/iot-api';

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  public invoice : any;
  public customer : any;
  location : any;
  taxRates : any;
  default : any = {
  	total : 0,
  	taxValue : 0
  }

  constructor(
  	private alertCtrl : AlertController,
  	public japi : JavaApiProvider,
  	public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
     
    private iotapi : IotApiProvider ) {

  	this.invoice = Object.assign(this.default, 
  		navParams.get("invoice") );


    this.customer = navParams.get("customer");
    this.invoice.comi = this.customer.comi;

    

  	this.taxRates = [];
  	this.getTotal();

    this.getLocation();

  	this.japi.http.get(`${this.japi.URL}taxrates`, this.japi.httpOptions)
  	.subscribe((res : any) => {
  		this.taxRates = res.data;
  	});
  }

  tryReturn(item){
    
  }

  getLocation(){


      if( this.invoice.location == this.customer._id ){
        this.location = this.customer;
        return;
      }

      this.japi.http.get(`${this.japi.URL}locations/query?_id=${this.invoice.location}`, this.japi.httpOptions)
      .subscribe(
          (res : any) => {
            if(res.data){
              this.location = res.data;
            }
          }
      )
  }

  addNote(invoice){
      let alert = this.alertCtrl.create({
      title: `Add a note to your invoice`,
      inputs: [
        {
          name: 'note',
          placeholder: 'Note',
          type: 'text'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Add note',
          handler: data => {
              invoice.note = data.note
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  isTypeCoffee(item){
    let catString = item.category.join(",").toLowerCase();
    return catString.includes("coffee") || catString.includes("notax");
  }

  makeId(){
      return Math.random().toString(36).substring(0,8);
  }

  shouldClone(invoice){
     let alert = this.alertCtrl.create({
      title: 'Confirm clone',
      message: 'Please enter the ID of this new invoice',
      inputs : [
         {
          name: 'id',
          placeholder: 'ID',
          type: 'text'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Clone',
          handler: data => {
             
             if(!data.id)
               data.id = this.makeId();

            invoice.id = data.id;
            this.clone(invoice); 

          }
        }
      ]
    });
    alert.present();
  }

  clone(invoice){

    let copy = Object.assign({}, invoice);
    delete copy._id;
    delete copy.value;

    this.japi.http.post(`${this.japi.URL}invoices`, copy, this.japi.httpOptions)
    .subscribe(
        (res : any) => {

           this.navCtrl.pop();
        } 
      )

  }


  getTotal(){
   	console.log("get total")
    this.invoice.total = 0;
    this.invoice.taxValue = 0;

    for (var i = this.invoice.list.length - 1; i >= 0; i--) {
      let item = this.invoice.list[i];
      if(item.amt){
        this.invoice.total += item.unitPrice * item.amt ;
      }

      if(this.invoice.taxRate){
        if(!item.category || !this.isTypeCoffee(item)){
            let itemTax =  (item.unitPrice * item.amt)  * (this.invoice.taxRate/100) ;
            this.invoice.taxValue += itemTax;
        }
      }

    }
    return this.invoice.total;
  }

  email(invoice){
    invoice.customerEmail = this.customer.email;
    invoice.customerAddress = this.customer.address;
    invoice.customerPhone = this.customer.contactNo;

    this.japi.http.post(`${this.japi.URL}email_invoice`, invoice, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
           let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Invocie emailed...',
            buttons: ['Dismiss']
          });
          alert.present();
        }
    )
  }

  print(invoice){
      invoice.customerEmail = this.customer.email;
      console.log(this.location);
      invoice.customerAddress = this.location.address;
      invoice.customerPhone = this.customer.contactNo;
      this.iotapi.print(invoice);
  }

  charge(invoice){
    
    let profileModal = this.modalCtrl.create(PaymentFlowPage, { invoice : invoice });
    
    profileModal.onDidDismiss(data => {
     if(data){
       if(!data) return;
       this.invoice = data;
       this.update(this.invoice);
     }
    });

    profileModal.present();

  }

  update(invoice){
    invoice.value = parseFloat(invoice.value);
  	this.japi.edit(invoice._id, invoice)
  	.then(
  		(res : any) => {
  			  let alert = this.alertCtrl.create({
			    title: 'Success',
			    subTitle: 'Resource updated',
			    buttons: ['Dismiss']
			  });
			  alert.present();
		}
  	);
  }

}
