import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {
	JavaApiProvider
} from '../../providers/java-api/java-api';

import {
	Toast
} from '../ToastReplacement';
/**
 * Generated class for the RecordLossPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-record-loss',
  templateUrl: 'record-loss.html',
})
export class RecordLossPage {

  items : any = [];
  customers : any = [];
  customer : any;
  reason : any;
  filterVal : string = "";

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public japi : JavaApiProvider,
  	public alertCtrl : AlertController) {

  	 japi.presentLoading();
      japi.http.get(`${this.japi.URL}items`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
          this.japi.hideLoading();
          this.items = res.data;
        }
      );
  	  this.getCustomers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordLossPage');
  }

  itemAction(item){
     let alert = this.alertCtrl.create({
      title: `Enter amount of ${item.itemName} to add.`,
      inputs: [
        {
          name: 'amt',
          placeholder: 'Amount',
          type: 'number'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Add loss',
          handler: data => {
             
             var loss = {
             	  itemPrice : item.unitCost,
			      itemName : item.itemName,
			      vendor :   item.vendor,
			      amount : parseInt(data.amt),
			      customer : this.customer,
			      reason : this.reason
             }

             this.save(loss);

          }
        }
      ]
    });
    alert.present();
  }

  save(loss){
  	this.japi.presentLoading();

  	 this.japi.http.post(`${this.japi.URL}losss`, loss , this.japi.httpOptions)
      .subscribe((res: any) => {
        
        this.japi.hideLoading();
         
        if (res.success) {
          Toast.show('Loss recorded, you may add another one.', '','');
          this.customer = false;
          return; 
        } 

        Toast.show('Error recording loss, please try again', '','');
      });
  }

  getCustomers(){
  	this.japi.http.get(`${this.japi.URL}customers`, this.japi.httpOptions)
  	.subscribe(
  		(res : any) => {

  			this.customers = res.data;
  		}
  	)
  }

}
