import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import {
	JavaApiProvider
} from '../../providers/java-api/java-api';


import {
	NetController
} from '../net_controller';

import { Toast } from '../ToastReplacement';

import {
  AddNewProductPage
} from '../add-new-product/add-new-product';
/**
 * Generated class for the CheckinVendorProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-checkin-vendor-product',
  templateUrl: 'checkin-vendor-product.html',
})
export class CheckinVendorProductPage extends NetController {
 
  public barcode : string;
  items : any;
  editMode : any;
  willAssign : boolean = false;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public japi : JavaApiProvider,
    private alertCtrl: AlertController
  	 ) {
  	super();
    this.barcode = navParams.get("barcode");
    
    this.editMode = navParams.get("editMode");
  }


  itemAction(item, barcode){
     let buttons = [
        'Cancel',
        {
          text: 'Assign barcode',
          handler: () => {
             this.assignBarcode(item, barcode);
          }
        },
        {
          text: 'Update item',
          handler: () => {
            this.editProduct(item);
          }
        }
      ]

     if(this.editMode){
       buttons.splice(1,1);
     }
     
     let alert = this.alertCtrl.create({
      title: 'Pick an action.',
      message: 'Pick an action to perform on item.',
      buttons: buttons
    });
    alert.present();
  }

  assignBarcode(item ,barcode){

    if(!item.barcode)
  	  item.barcode = [barcode];
    
    if(item.barcode)
        item.barcode.push(barcode);

  	this.japi.presentLoading();
  	this.japi.http.put(`${this.japi.URL}items/${item._id}`, item, this.japi.httpOptions)
  	.subscribe(
  		(res : any) => {
  			this.japi.hideLoading();

  			if(!res.success){
  				Toast.show('Barcode was not saved, please try again', '5000',  'top');
  				return;
  			}

  			Toast.show('Barcode saved, please scan again.', '5000',  'top');
  			this.navCtrl.pop();

  		}
  	)
  }

  addProduct(){
    this.navCtrl.push(AddNewProductPage, { items : this.items });
  }

  editProduct(item){
    this.navCtrl.push(AddNewProductPage,
     { items : this.items, item : item });
  }

  ionViewDidEnter(){

    this.japi.presentLoading();
    this.japi.http.get(`${this.japi.URL}items`, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
        this.japi.hideLoading();
        this.items = res.data;
      }
    )
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinVendorProductPage');
  }

}
