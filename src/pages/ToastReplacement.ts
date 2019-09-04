import { AlertController } from 'ionic-angular';


export class Toast {

	public static alt : AlertController 

	public static show(message, duration, position){
		let alert = this.alt.create({
		    title: 'Alert',
		    subTitle: message,
		    buttons: ['Dismiss']
		});
		alert.present();
	}

}