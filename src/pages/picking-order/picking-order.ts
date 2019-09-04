import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { EditPodPage } from '../edit-pod/edit-pod';
import { ScanningPage } from '../scanning/scanning';

@Component({
  selector: 'page-picking-order',
  templateUrl: 'picking-order.html',
})
export class PickingOrderPage {
  print_type;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public japi: JavaApiProvider,
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
    this.navCtrl.push(ScanningPage);
  }
}
