import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import {
  SalesmanDashboardPage
} from '../salesman-dashboard/salesman-dashboard';

import {
  DriverNavPage
} from '../driver-nav/driver-nav';

import {
  PickerCheckerDashPage
} from '../picker-checker-dash/picker-checker-dash';

import {
	JavaApiProvider
} from '../../providers/java-api/java-api';



import {
	Toast
} from '../ToastReplacement';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user : any = {};

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public japi : JavaApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openInterface(type){
  	switch (type) {
  		case "sale":
  			  		this.navCtrl.setRoot(SalesmanDashboardPage);
  			break;
  		case "driver":
            this.navCtrl.setRoot(DriverNavPage);
  			break;
  		default:
  			    this.navCtrl.setRoot(PickerCheckerDashPage);
  			break;
  	}
  }

  login(user){
  	this.japi.login(user)
  	.then(
  		() => {
  			// move to dashboard
          this.openInterface(this.user.type);
  		},
  	)
    .catch(
       err => {
        console.log("error logging in ");
        Toast.show('Error, failed to signin, incorrect username/password combination.', '5000',  'top');
      }
    )

  }
}
