import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { EditPodPage } from '../edit-pod/edit-pod';

@Component({
  selector: 'page-pod-selection',
  templateUrl: 'pod-selection.html',
})
export class PodSelectionPage {

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
  editPOD() {
    // console.log("clicked");
    this.navCtrl.push(EditPodPage);
  }
}
