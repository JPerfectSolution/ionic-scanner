import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { PickerCheckerDashPage } from '../picker-checker-dash/picker-checker-dash';
import { OrderRoutesTabPage } from '../order-routes-tab/order-routes-tab';
import { StopsSelectionPage } from '../stops-selection/stops-selection';

@Component({
  selector: 'page-order-channels',
  templateUrl: 'order-channels.html',
})
export class OrderChannelsPage {
  tab1Root:any = OrderRoutesTabPage;
  tab2Root:any = OrderRoutesTabPage;
  tab3Root:any = OrderRoutesTabPage;

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
    this.navCtrl.setRoot(PickerCheckerDashPage);
  }
  
  gotoStopsPage() {
    this.navCtrl.push(StopsSelectionPage);
  }
}
