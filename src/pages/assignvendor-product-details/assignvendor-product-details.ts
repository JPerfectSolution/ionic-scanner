import { Component } from '@angular/core';
import {   NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AssignvendorProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-assignvendor-product-details',
  templateUrl: 'assignvendor-product-details.html',
})
export class AssignvendorProductDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignvendorProductDetailsPage');
  }

}
