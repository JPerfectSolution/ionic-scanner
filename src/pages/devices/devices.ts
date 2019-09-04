import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import {
	IotApiProvider
} from '../../providers/iot-api/iot-api';

import {
	JavaApiProvider
} from '../../providers/java-api/java-api';

import {
	Toast
} from '../ToastReplacement';
/**
 * Generated class for the DevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {
  
  devices : any = [];

  connectDevice : string;
  refreshId : any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public iapi : IotApiProvider,
  	public japi : JavaApiProvider,
  	public alertCtrl: AlertController,
  	  ) {


  		

  }

  ionViewDidEnter(){
  	 this.refreshId = setInterval(() => {

  			this.iapi.linea.listDevices()
  			.then(
  				devices => {
  					this.devices = devices;
  				}
  			)
  		}, 1500);
  }

  ionViewDidLeave(){
  	clearInterval(this.refreshId);
  }

  connectTo(device){
  	let deviceInformation : any = { name : device  };
  	let index = this.devices.indexOf(deviceInformation.name);

  	//this.iapi.linea.connectDevice()
  	 const prompt = this.alertCtrl.create({
      title: `Connect to ${deviceInformation.name} `,
      message: "Enter the pin code of the device you wish to connect to.",
      inputs: [
        {
          name: 'pin',
          placeholder: 'PIN'
        },
      ],
      buttons: [
       	'Cancel',
        {
          text: 'Connect',
          handler: data => {
            if(!data.pin)
            	return;

            deviceInformation.pin = data.pin
            this.iapi.linea.connectDevice(data.pin, index + '')
           	.then(
           		res => {
           			this.japi.storage.set("deviceInformation", JSON.stringify(deviceInformation) )
           			.then(
           				() => {
           					console.log("device information saved.");
           				}
           			)
           			this.connectDevice = device;
           		 	 Toast.show('Device connected', '5000',  'top');
           		},
           		err => {
           			console.log(err);
           			 Toast.show('Error connecting to device, please try again.', '5000',  'top');
           		}
           	)

          }
        }
      ]
    });
    prompt.present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicesPage');
  }




}
