import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { StopsSelectionPage } from '../stops-selection/stops-selection';

@Component({
  selector: 'page-order-routes-tab',
  templateUrl: 'order-routes-tab.html',
})
export class OrderRoutesTabPage {

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
  gotoStopsPage() {
    this.navCtrl.setRoot(StopsSelectionPage);
  }
}
