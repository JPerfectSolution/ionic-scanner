import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { IotApiProvider } from '../../providers/iot-api/iot-api';
import { Toast } from '../ToastReplacement';

@Component({
  selector: 'page-scanning',
  templateUrl: 'scanning.html',
})
export class ScanningPage {
  print_type;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public japi: JavaApiProvider,
  	public iapi : IotApiProvider
    ) {
      this.print_type = "invoice";
  }

  ionViewDidEnter() {

    this.japi.storage.get("name")
      .then(
        data => {
          // this.name = data ? data : "NONAME";
        }
      )
      .catch(err => console.log(err))
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PickProductPage');
  }
  gotoPrevPage() {
    this.navCtrl.pop();
  }
  editPOD() {
    // console.log("clicked");
    // this.navCtrl.push(EditPodPage);
  }
  startScanning() {
    this.iapi.scanBarcode()
      .then((code) => {
        console.log(code);
      })
      .catch((err) => {
        Toast.show("Error, barcode was not scanned!","","");
      });
  }
}
