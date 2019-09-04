export class Linea {

	lineaPlugin : any;

	constructor(){

		//this.initialize();
	}

	checkIfSet(){
		
	}


	scan(){
		this.checkIfSet();
		return new Promise((resolve, reject) => {

			this.lineaPlugin.scan(resolve, reject);
		
		})
	}

	printSticker(text){
		return new Promise((resolve, reject) => {
			window["cordova"].exec(succ => {
				resolve(succ);
			},  err => {
				reject(err);
			}, 'lineaPlugin', 'printSticker', [text]);
		})
	}

	connectDevice(pin, id){
		this.checkIfSet();
		return new Promise((resolve, reject) => {
			this.lineaPlugin.connectDevice(pin,id,resolve, reject);
		})
	}

	listDevices(){
		this.checkIfSet();
		return new Promise((resolve, reject) => {
			this.lineaPlugin.listDevices(resolve, reject);
		})
	}

	initialize(){
		return new Promise((resolve, reject) => {
			window["cordova"].exec(succ => {
					resolve(succ);
				},  err => {
					reject(err);
				}, 'lineaPlugin', 'initialize', []);
		});
	}

	disconnectDevice(){
		this.checkIfSet();
		return new Promise((resolve, reject) => {
			this.lineaPlugin.disconnectDevice(resolve, reject);
		})
	}

	lastScanned()  {
		this.checkIfSet();
		return new Promise((resolve, reject) => {
			this.lineaPlugin.lastScanned(resolve, reject);
		})
	}

}