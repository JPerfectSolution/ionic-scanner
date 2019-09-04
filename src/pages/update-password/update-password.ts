import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';

import { Mapping } from '../../providers/mapping';

import { Toast } from '../ToastReplacement';
/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {

  data : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public view : ViewController,
  	public japi : JavaApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePasswordPage');
  }

  dismiss(){
  	this.view.dismiss();
  }

  update(data){
  	this.japi.http.post(`${Mapping.baseURL}/auth/update_password`, data, this.japi.httpOptions)
  	.subscribe((res: any) => {

      	Toast.show(res.message,"","");

      	if(res.success){
      		this.view.dismiss();
      	}
     
    });
  }

}
