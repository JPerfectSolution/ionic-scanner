import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { EditProductPage } from '../edit-product/edit-product';

/**
 * Generated class for the PickProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-selection',
  templateUrl: 'product-selection.html',
})
export class ProductSelectionPage {

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
    console.log('ionViewDidLoad PickProductPage');
  }
  gotoPrevPage() {
    this.navCtrl.pop();
  }
  editProduct() {
    console.log("clicked");
    this.navCtrl.push(EditProductPage);
  }
}
