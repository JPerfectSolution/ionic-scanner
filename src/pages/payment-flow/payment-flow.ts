import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController,ModalController } from 'ionic-angular';

import { EnterCcPage } from '../enter-cc/enter-cc';

import { JavaApiProvider } from '../../providers/java-api/java-api';

import {
  NavigationApiProvider
} from '../../providers/navigation-api/navigation-api';

import { SignaturePadPage } from '../signature-pad/signature-pad';


/**
 * Generated class for the PaymentFlowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment-flow',
  templateUrl: 'payment-flow.html',
})
export class PaymentFlowPage {

  cards : any = [];
  invoice : any = {};

  constructor(public view: ViewController , public navParams: NavParams,
    public japi : JavaApiProvider,
    public alertCtrl : AlertController,
    public modalCtrl : ModalController,
    private napi : NavigationApiProvider ) {
     this.invoice = navParams.get("invoice");
     this.getTotal();
     this.getCards( this.invoice.history );
  }

  ionViewDidLoad() {
     


  }

   getTotal(){
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
  }

  isTypeCoffee(item){
    let catString = item.category.join(",").toLowerCase();
    return catString.includes("coffee") || catString.includes("notax");
  }

  getCards(history){
    this.cards = [];
     if(history){
      for (var i = history.length - 1; i >= 0; i--) {
        let entry = history[i];
        if(entry.type == "CARD"){
          let card = {
            id : entry.id,
            name : `Card on File # ${i + 1}`
          };
          this.cards.push(card);
        }
      }
    }
  }

  addCard(invoice){

    let profileModal = this.modalCtrl.create(EnterCcPage,
     { 
       invoice : invoice
     });    
    profileModal.onDidDismiss(data => {
     console.log(data);
     if(data){

       this.invoice = data;
       this.getCards(this.invoice.history);
     }
    });

    profileModal.present();
  }


  charge(invoice){


    if(invoice.method == ""){
      this.showAlert("Error", "Please select a payment method");
      return;
    }

     let signModal = this.modalCtrl.create(SignaturePadPage,
     { 
     });    
     signModal.onDidDismiss(data => {
     console.log(data);
         if(!data){
           this.showAlert("Error", "No client signature was provided.");
           return;
         }


         this.invoice.clientSignature = data;
         invoice.amount = parseFloat(invoice.amt);
         this.japi.presentLoading();
          this.japi.http.post(`${this.japi.URL}charge`, invoice, this.japi.httpOptions)
          .subscribe(
            (res : any) => {
              this.japi.hideLoading();
              this.showAlert(res.success ? 'Success' : 'Error', res.message);
              if(res.success){
                 this.invoice = res.data;
                 delete this.invoice.check_number;
                 this.napi.storage.set("shouldClear", "clear")
                 .then(() => console.log("should clear saved!"));
                 this.view.dismiss(this.invoice);
              }
            }
          )
       
      });

      signModal.present();


   
  }

  showAlert(title, message){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  dismiss(){
  	this.view.dismiss();
  }



}
