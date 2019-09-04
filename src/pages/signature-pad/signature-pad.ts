import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import {  NavController, NavParams , ViewController} from 'ionic-angular';

/**
 * Generated class for the SignaturePadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signature-pad',
  templateUrl: 'signature-pad.html',
})
export class SignaturePadPage {

  data : any;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 450,
    'canvasHeight': 400
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController ) {
  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
  	this.clear();
  }

  dismiss(){

  	this.view.dismiss(this.data);
  }

  clear(){
  	this.data = false;
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

   drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
 
    this.data = this.signaturePad.toDataURL();
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }



}
