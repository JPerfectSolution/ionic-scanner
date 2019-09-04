import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

import { Stripe } from '@ionic-native/stripe';
import { Toast } from '../ToastReplacement';

import { JavaApiProvider } from '../../providers/java-api/java-api';
/**
 * Generated class for the EnterCcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-enter-cc',
  templateUrl: 'enter-cc.html',
})
export class EnterCcPage {

  card : any = {};
  invoice : any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private stripe: Stripe,
  	public view: ViewController,
  	public japi : JavaApiProvider,
  	 ) {

  	this.invoice = navParams.get("invoice");

  	stripe.setPublishableKey('my_publishable_key');

  }

  dismiss(){
  	this.view.dismiss();
  }

  save(cc,invoice){
  	let card = {
  	 number: cc.number,
  	 expMonth: cc.month,
  	 expYear: cc.year,
  	 cvc: cc.cvc
  	};

	this.stripe.createCardToken(card)
	   .then(token => this.storeToken(invoice, token)  )
	   .catch(error => this.somethingWentWrong() );
  }

  storeToken( invoice, token){
    this.japi.presentLoading();
    this.japi.http.post(`${this.japi.URL}customer_id`, { token : token.id, customer : invoice.customer }, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
      	this.japi.hideLoading();
        if(!res.sucess){
       	  
       	  this.somethingWentWrong();
          return;
        }

        if(!invoice.history)
          invoice.history = [];

          let timeID = (new Date()).getTime() + '';
          let card = {
            type : 'CARD',
            id : timeID,
            token : res.data
          };

          Toast.show('Card information saved.', '5000',  'top');

         
          invoice.history.push(card);
   
          invoice.method = timeID;

          this.view.dismiss(invoice);

      })
  }

  somethingWentWrong(){
  	   Toast.show('Something went wrong, please try again.','5000',  'top');
  }

 

}
