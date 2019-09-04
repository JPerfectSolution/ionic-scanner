import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';

@Component({
  selector: 'page-unkown-barcode',
  templateUrl: 'unkown-barcode.html',
})
export class UnkownBarcodePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public japi: JavaApiProvider,
    ) {
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
    
  }
  gotoPrevPage() {
    this.navCtrl.pop();
  }
}
