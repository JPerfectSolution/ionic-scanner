declare var plugins;
declare var Promise;

export class Linea {

	lineaPlugin : any;

	constructor(){
		if(!plugins)
			plugins = {};

		this.lineaPlugin = plugins.lineaPlugin;
		
		this.initialize();
	}


	scan(){

		return new Promise((resolve, reject) => {

			this.lineaPlugin.scan(resolve, reject);
		
		})
	}

	connectDevice(pin, id){
		return new Promise((resolve, reject) => {
			this.lineaPlugin.connectDevice(pin,id,resolve, reject);
		})
	}

	listDevices(){

		return new Promise((resolve, reject) => {
			this.lineaPlugin.listDevices(resolve, reject);
		})
	}

	initialize(){

		return new Promise((resolve, reject) => {
			this.lineaPlugin.initialize(resolve, reject);
		})
	}

	disconnectDevice(){
		return new Promise((resolve, reject) => {
			this.lineaPlugin.disconnectDevice(resolve, reject);
		})
	}

	lastScanned()  {
		return new Promise((resolve, reject) => {
			this.lineaPlugin.lastScanned(resolve, reject);
		})
	}

}