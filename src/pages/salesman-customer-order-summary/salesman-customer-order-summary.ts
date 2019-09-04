import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import { NetController } from '../net_controller';
import { JavaApiProvider } from '../../providers/java-api/java-api';

import { NavigationApiProvider } from '../../providers/navigation-api/navigation-api';

import {
  Toast
} from '../ToastReplacement';
/**
 * Generated class for the SalesmanCustomerOrderSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salesman-customer-order-summary',
  templateUrl: 'salesman-customer-order-summary.html',
})
export class SalesmanCustomerOrderSummaryPage extends NetController {

  customer : any;
  invoice : any = { list : [] , total : 0 };
  items : any = [];
  showSearch : boolean = false;
  showStandard : boolean = false;
  standardItems : any = [];
  priceMap : any = {};

  backupID : any;
  itemCache : any = [];
  locations : any = [];
  rateIndex : any = [];
  taxrates : any = [];
  public filterVal : string = "";
  location_id : string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public japi : JavaApiProvider,
    public alertCtrl : AlertController,
    public napi : NavigationApiProvider ) {
      super();
      this.customer = navParams.get("customer");
      var stop = navParams.get("stop");
      this.invoice.customer = this.customer.name;

      var location_id = navParams.get("location_id");

      if(location_id){
        this.location_id = location_id;
      }

      japi.http.get(`${this.japi.URL}taxrates`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {

          this.taxrates = res.data;

          if(this.customer.taxrate && !this.customer.extra_taxrate){
            this.invoice.taxPredefined = true;
            this.invoice.taxRate = this.customer.taxrate;
          
          }

          if(this.customer.extra_taxrate){
              this.rateIndex = this.customer.taxrates;
              this.invoice.extra_taxrate = true;
              this.invoice.taxPredefined = true;
          }

      });

     

      japi.presentLoading();
      japi.http.get(`${this.japi.URL}items`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
          this.japi.hideLoading();
          this.items = res.data;

             for (var i = this.items.length - 1; i >= 0; i--) {
                let item = this.items[i];
                if(item.amt){
                   delete item.amt;
                }
             }

          
        }
      );



      this.api = japi;


      japi.http.get(`${this.japi.URL}locations`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
          this.locations = [];
          for (var i = res.data.length - 1; i >= 0; i--) {
            let location = res.data[i];
            if(location.customer == this.customer.name){
              this.locations.push(location);
              if(this.location_id){
                if(this.location_id == location._id){
                  this.invoice.location = location;
                }
              }
            }
          }
          //if length zero use customer
          if(this.locations.length == 0){
              let customer = Object.assign({} , this.customer);
               customer.customer = customer.name;
               customer.category = "STORE";
               this.locations.push(customer);
               this.invoice.location = customer;
               this.getLocationItems(customer._id);
          } 
         
          if(stop){
            for (var i = this.locations.length - 1; i >= 0; i--) {
               if(this.locations[i]._id == stop){
                 this.invoice.location = this.locations[i];
               }
            }
          }

          
        }
      );


    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesmanCustomerOrderSummaryPage');
  }

  setLocationTaxRate(){

    if(this.invoice.location.extra_taxrate){
        this.rateIndex = this.invoice.location.taxrates;
        this.invoice.extra_taxrate = true;
        this.invoice.taxPredefined = true;
    }

    if(this.invoice.location.taxrate && !this.invoice.location.extra_taxrate){
      this.invoice.taxPredefined = true;
      this.invoice.taxRate = this.invoice.location.taxrate;
    }
    
    this.getLocationItems(this.invoice.location._id);
    this.getTotal();
  }

  saveBackups(){

    this.japi.http.put(
        `${this.japi.URL}backups/${this.backupID}`,
        { backup : { items : this.standardItems, prices : this.priceMap } },
        this.japi.httpOptions)
      .subscribe(
          (res : any) => {
            console.log("Backup saved");
          }
    )

  }

  setStandardItems(){
    for (var i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            this.items[i].std = this.isStandard(item);
    }
  }

  setPrices(priceMap){
    if(!priceMap)
      return;

    for (var i = this.items.length - 1; i >= 0; i--) {
      let item = this.items[i];

      let locationPrice = priceMap[item._id];

      if(locationPrice)
        this.items[i].unitPrice = locationPrice;
      
    }

    this.priceMap = priceMap;

  }


  getLocationItems(location){
    this.japi.http.get(`${this.japi.URL}backups/query?link=${location}-items`, this.japi.httpOptions)
      .subscribe(
          (res : any) => {
              if(res.data){
                 
                 this.backupID = res.data._id;

                if(res.data.backup ){
                  this.standardItems = res.data.backup.items;
                  this.setStandardItems();
                  this.setPrices(res.data.backup.prices);     
                }
                
                return;
              }
              
              console.log("No backup found, creating a new one.");
              this.japi.http
              .post(`${this.japi.URL}backups`, { link : `${location}-items` }, this.japi.httpOptions )
              .subscribe(
                  (res : any) => {
                    console.log(res);
                    this.backupID = res.data._id;
                    
                  }
              );

          }
      )
  }


  hasLocation(customer){
     let result = false;

     for (var i = this.locations.length - 1; i >= 0; i--) {
       if(this.locations[i].customer == customer.name){
         result = true;
         break;
       }
     }

     return result;
  }


  fetchLocations(){
     this.japi.http.get(`${this.japi.URL}locations`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
          this.japi.hideLoading();
          this.items = res.data;
        }
      );
  }

  itemAction(item){

     let standardAction = {
        text: this.isStandard(item) ? 'Unmark' : 'Mark',
        handler: data => {
           if(this.isStandard(item)){
             this.unmarkAsStandard(item);
             this.saveBackups();
             return;
           }

            if(data.price && data.price !== ""){
               item.touched = true;
               item.unitPrice = parseFloat(data.price);
               this.priceMap[item._id] = item.unitPrice;
              
            }

           this.markAsStandard(item);
            this.saveBackups();

           
       }
     };

     let alert = this.alertCtrl.create({
      title: `Enter amount of ${item.itemName} to add (${item.unit} left).`,
      inputs: [
        {
          name: 'amt',
          placeholder: 'Amount',
          type: 'number'
        },
        {
          name: 'price',
          placeholder: 'Override price',
          type: 'number'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Sell',
          handler: data => {
             item.amt = parseInt(data.amt);

             if(item.amt > item.unit){
               Toast.show(`Error, you can only sell ${item.unit} unit${item.unit == 1 ? "" : "s"} of this item.`,"","");
               delete item.amt;
               return;
             }

             if(data.price && data.price !== ""){
               item.touched = true;
               item.unitPrice = parseFloat(data.price);

               this.priceMap[item._id] = item.unitPrice;
               this.saveBackups();
             }

             this.getTotal();
          }
        },
        standardAction
      ]
    });
    alert.present();
  }

  markAsStandard(item){
      if(this.standardItems.indexOf(item._id) != -1){
        Toast.show("This item is already marked",'','');
        return;
      }

      item.std = true;
      this.standardItems.push(item._id);
      

  }

  isStandard(item){
      return this.standardItems.indexOf(item._id) !== -1;
  }

  unmarkAsStandard(item){
      let index = this.standardItems.indexOf(item._id);

      if(index !== -1){
          this.standardItems.splice(index,1);
      }

      item.std = false;

  }

  generateItemList(){
     let list = [];

     for (var i = this.items.length - 1; i >= 0; i--) {
       let item = this.items[i];
       if(item.amt && item.amt != 0){
           list.push(item);
       }
     }

     return list;
  }

  isTypeCoffee(item){
    let catString = item.category.join(",").toLowerCase();
    return catString.includes("coffee") || catString.includes("notax");
  }

  getTotal(){
      this.invoice.total = 0;
      this.invoice.taxValue = 0;
      let list = this.generateItemList();
       for (var i = list.length - 1; i >= 0; i--) {
        let item = list[i];
        if(item.amt){
          this.invoice.total += item.unitPrice * item.amt;

          if(this.invoice.taxRate){
            if(!item.category || !this.isTypeCoffee(item)){
                let itemTax =  (item.unitPrice * item.amt)  * (this.invoice.taxRate/100) ;
                this.invoice.taxValue += itemTax;
            }
          }

        }
      }

      console.log(this.invoice.taxRate);
  }

  makeId(){
      return Math.random().toString(36).substr(2, 7).toUpperCase();
  }

  save(invoice){
       let alert = this.alertCtrl.create({
      title: `Confirm sale to ${invoice.customer} for ${invoice.total.toFixed(2)} USD (w/o taxes)`,
      buttons: [
        'Cancel',
        {
          text: 'Sell',
          handler: () => {
              this.sell(invoice);
          }
        },
     
      ]
    });
    alert.present();
  }

  sell(invoice){



    invoice.list = this.generateItemList();

    if(!invoice.id)
      invoice.id = this.makeId();

    invoice.route = this.napi.activeRoute ? 
    this.napi.generateRouteLocationIDs(this.napi.activeRoute.stops)
    : false;


    this.japi.http.post(`${this.japi.URL}invoices`, invoice ,this.japi.httpOptions)
    .subscribe(
      (res : any) => {
          this.successMessage();

          this.clearStop();
          this.saveBackups();

          this.navCtrl.pop();
      }
    );
  }

  clearStop(){
      if(this.napi.activeRoute){

            this.napi.getRouteById(this.napi.activeRoute.id)
            .then(
              (route : any) => {
                if(!route.stops)
                  route.stops = [];

                var stopID, index;

                for(var i = 0; i < route.stops.length;i++){
                  if(!route.stops[i].cleared){
                    stopID = route.stops[i]._id;
                    index = i;
                    break;
                  }
                }

                route = this.napi.locationTool.clearStop(route, stopID);

                route.stops[index].soldTo = true;

                this.napi.updateRoute(route);

              }
            )
     
     }
  }

  successMessage(){
      let alert = this.alertCtrl.create({
        title: 'Invoice saved!',
        subTitle: 'You can view the invoice in past orders, under the specified customer',
        buttons: ['Dismiss']
      });
     alert.present();
  }

 
}