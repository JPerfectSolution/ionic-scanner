import { LoadingController, Loading } from 'ionic-angular';

export class Mapping {
	static baseURL : string = "https://test.getstorehub.com";
	static URL : string = `${Mapping.baseURL}/api/`;
}

export class Loadable {

	loading : Loading ;

	constructor(public loadingCtrl: LoadingController){

	}

	presentLoading() {
	  this.loading = this.loadingCtrl.create({
	    content: 'Please wait...',
	    duration: 8000,
	    spinner : 'dots'
	  });

	  this.loading.present();
    }

    hideLoading(){
      this.loading.dismiss();
    }
}