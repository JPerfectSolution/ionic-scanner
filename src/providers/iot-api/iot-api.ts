import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  JavaApiProvider
} from '../java-api/java-api';


import {
  Toast
} from '../../pages/ToastReplacement';

import {
  Linea
} from './wrapper';



/*
  Generated class for the IotApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IotApiProvider {


  public linea : Linea;

  constructor(public http: HttpClient,
    private japi : JavaApiProvider
     ) {
  }

  readyLinea(){
    if(!this.linea){
       this.linea = new Linea();
       this.linea.checkIfSet();
     }
  }


  scanBarcode(){
    return new Promise((resolve, reject) => {
       window["cordova"].plugins.barcodeScanner.scan(
          function (result) {
              resolve(result.text);
          },
          function (error) {
             reject(error);
          }
       );
    });
  }

  printSticker(text){

    if(!window["cordova"] || !window["cordova"].plugins || !window["cordova"].plugins.printer){
      return;
    }

     window["cordova"].plugins.printer.print(
      text.split("\n").join("<br>"), 
      { duplex: 'long', border : false }, 
      function (res) {
        Toast.show(res ? 'Text printed' :  'Error printing text, please try again.', '','' );
     })
  }


  print(invoice){

    this.japi.presentLoading();
    this.japi.http.post(`${this.japi.URL}print_invoice_text`, invoice, this.japi.httpOptions)
    .subscribe(
        (res : any) => {

            this.getLocation(invoice)
            .then( (location : any) => {
              this.japi.hideLoading();

              var fileContent = res.data.replace("|DATE|", "Date : " + (new Date()).toLocaleString().split(",")[0] ).replace("\n", "<br/>");
              
              if(location && location.pickup){
                fileContent = fileContent.replace("|LOCATION|", "PICKUP");
              }

              if(location && location.name){
                fileContent = fileContent.replace("|LOCATION|",  `${location.name}<br>${location.address}`);
              }


               window["cordova"].plugins.printer.print(
                `<p style="font-size:25px;">${fileContent}</p>`, 
                { duplex: 'long', border : false }, 
                function (res) {
                  Toast.show(res ? 'Invoice printed' :  'Error printing invoice, please try again.','','' );
               });
    
            });
        }
     )
  }

  getLocation(invoice){

    return new Promise((resolve, reject) => {
      if(!invoice.location){
        resolve({pickup : true});
        return;
      }
      this.japi.http.get(`${this.japi.URL}/locations/${invoice.location}`, this.japi.httpOptions)
      .subscribe(
        (res : any) => {
            if(!res.data){
              this.japi.http.get(`${this.japi.URL}/customers/${invoice.location}`, this.japi.httpOptions)
              .subscribe(
                (res : any) => {
                    resolve(res.data);
                });

            }

            if(res.data){
              resolve(res.data);
            }
        }
      )
    });
  }



}
