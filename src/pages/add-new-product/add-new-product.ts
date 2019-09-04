import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import {
	JavaApiProvider
} from '../../providers/java-api/java-api';

import {
	NetController
} from '../net_controller';

import { Toast } from '../ToastReplacement';
/**
 * Generated class for the AddNewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-new-product',
  templateUrl: 'add-new-product.html',
})
export class AddNewProductPage extends NetController {
   

  item : any = {};
  categories : any = ["NOTAX"];
  locations : any;
  customersList : any;
  vendors : any;

    
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public japi : JavaApiProvider,
    public alertCtrl : AlertController ) {

  	super();
  	this.api = japi;

    
    japi.http.get(`${japi.URL}locations`, japi.httpOptions)
    .subscribe(
      (res : any ) => {
        this.locations = [];
         for (var i = res.data.length - 1; i >= 0; i--) {
           let location = res.data[i];
           if(location.category == "WAREHOUSE"){
             this.locations.push(location.name);
           }
         }
      }
     )

  	this.customersList = this.fetchResourceList("customersList", "customers", "name", this.generateResourceFilter("", ""));
  	this.vendors = this.fetchResourceList("vendors", "vendors", "name", this.generateResourceFilter("", ""));

  	let items = navParams.get("items");

    let tempItem = navParams.get("item");

    if(tempItem){
      this.item = tempItem;
     }

  	for (var i = items.length - 1; i >= 0; i--) {
  		let item = items[i];
  		this.mergeCategories(item.category);
  	}
  }

  mergeCategories(category){
  	if(!category)
  		return;
  	for (var i = category.length - 1; i >= 0; i--) {
  		let cat = category[i];
  		if(this.categories.indexOf(cat) === -1){
  			this.categories.push(cat);
  		}
  	}
  }

  newCat() {
    let alert = this.alertCtrl.create({
      title: 'Add new category',
      inputs: [
        {
          name: 'category',
          placeholder: 'Category name'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Add',
          handler: data => {
               if(!data.category)
                 return;

               this.categories.push(data.category);
          }
        },
        {
          text: 'Set for item',
          handler: data => {
               if(!data.category)
                 return;

               this.categories.push(data.category);
               if(!this.item.category)
                 this.item.category = [];
               
               this.item.category.push(data.category);
          }
        }
      ]
    });
    alert.present();
  }

  updateProduct(item){
    this.japi.presentLoading();
    this.japi.http.put(`${this.japi.URL}items/${item._id}`, item, this.japi.httpOptions)
    .subscribe(
      (res : any) => {
          this.closeView(res);
      }
    )
  }

  saveProduct(item){
     //convert to array.
    item.barcode = [item.barcode];
  	this.japi.presentLoading();
  	this.japi.http.post(`${this.japi.URL}items`, item, this.japi.httpOptions)
  	.subscribe(
  		(res : any) => {
          this.closeView(res);
  		}
  	)
  }

  closeView(res){
     this.japi.hideLoading();
        
        Toast.show(res.message, '','');

        if(res.success){
          this.navCtrl.pop();
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewProductPage');
  }

}
