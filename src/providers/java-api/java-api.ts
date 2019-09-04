import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Mapping, Loadable } from '../mapping';
import { LoadingController} from 'ionic-angular';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';


/*
  Generated class for the JavaApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JavaApiProvider extends Loadable {

  resource : string;
  public URL = Mapping.URL;
  private authURL : string = `${Mapping.baseURL}/auth/`; 
  public storage : any; //SecureStorageObject;
  public accountType : string = "";
  backupId : any;

  public httpOptions : any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(public loadingCtrl: LoadingController,
   public http: HttpClient,
   private secureStorage: SecureStorage) {
  		super(loadingCtrl);

     
  }

  // class config 
  setResource(resource : string) {
      this.resource = resource;
  }


  // authentication
  ensureTokenValidity(err){
    console.log(err);
  }

  login(user){

    
    return new Promise((resolve, reject) => {
      this.presentLoading();
      this.http.post(`${this.authURL}login`, user, this.httpOptions)
      .subscribe(
        (res : any) => {
            this.hideLoading();
            if(!res.success || !res.data.token){
              reject(res);
              return;
            }

            
           
            this.storeToken(res.data.token);
            this.storeName(res.data.name);
            this.storeEmail(res.data.email);
            this.storeType(user.type);          
            this.loadType();
            
            this.setToken(res.data.token);
           

            resolve(true);
        },
        err => {
          this.hideLoading();
          reject(err);
        }
      )
    });
  }


  reset(user){
     return new Promise((resolve, reject) => {
      this.presentLoading();
      this.http.post(`${this.authURL}reset`, user, this.httpOptions)
      .subscribe(
        (res : any) => {
            this.hideLoading();
            if(!res.success){
              reject(res);
              return;
            }
            resolve(true);
        },
        err => {
          this.hideLoading();
          reject(err);
        }
      )
    });
  }

  logout(){
     return new Promise((resolve, reject) => {
         this.storage.remove("token")
         .then(
           () => {
             resolve(true);
           },
           error => {
             reject(false);
           }
          )



      
           this.storage.remove("type");
           this.storage.remove("name");
         
     });
  }

  storeToken(token) {
      this.storage.set("token", token);
  }


  storeName(name) {
      this.storage.set("name", name);
  }

  storeEmail(email){
      this.storage.set("email", email);
  }

  storeType(type){
    this.accountType = type;
    this.storage.set("type", type);
  }

  getType(){
    return this.storage.get("type");
  }

  loadType(){

    this.getType()
    .then(
      data => {

         this.accountType = data;
      },
      error => {
        console.log(error);
      }
    )
  }


  setToken(token){
    this.httpOptions = {
          headers : new HttpHeaders({
              'Content-Type' : 'application/json',
              'token' : token
         })
     }
  }

  isLoggedIn(){
    return new Promise((resolve, reject) => {

        this.secureStorage.create("jtvt")
        .then(
          (storage: SecureStorageObject ) => {

              this.storage = storage;

              storage.get("token")
              .then(
                data => {
                  

                  if(data){

                    this.setToken(data);

                    this.http.get(`${this.URL}employees`, this.httpOptions)
                    .subscribe(
                      () => {
                        this.loadType();
                        resolve(data);
                      },
                      (err : any) => {
                        console.log(err);
                        reject(err);
                      }
                     )

                    
                  }

                  if(!data)
                     reject(false);

                },
                err => {
                  reject(err);
                  console.log(err);
                }
              )
          },
          error => {
            reject(error);
            console.log("setting up local storage");
            this.storage = {
              get : function(key){
                console.log(`Test fetching ${key}`)
                return new Promise((resolve,reject) => {
                  resolve(window.localStorage[key]);
                })
              },
              set : function(key, value){
                return new Promise(function(resolve, reject){
                  window.localStorage[key] = value;
                  resolve(true);

                });
              }
            }
            console.log(error);
          }
         )
    })
  }

  //crud

  create(data : any) {
    return this.toPromise(
    	this.http.post(this.URL + this.resource, data, this.httpOptions)
    	);
  }

  delete(id) {
    return this.toPromise(
    	this.http.delete(this.URL + this.resource + "/" + id, this.httpOptions)
    	);
  }

  edit(id , data : any) {
    return this.toPromise(
    	this.http.put(this.URL + this.resource + "/"  + id, data, this.httpOptions)
    	);
  }

  pull(path){
  	return this.toPromise(
  		this.http.get(this.URL + path, this.httpOptions)
  		);
  }

  getAll() {
    return this.toPromise(
     	this.http.get(this.URL + this.resource, this.httpOptions)
     );
  }

  toPromise( fn : Observable<ArrayBuffer>){
  	this.presentLoading();
  	return new Promise((resolve, reject) => {
  		fn.subscribe((res : any) => {
  			this.hideLoading();
  			resolve(res);
  		},
  		(err : any) => {
  			reject(err);
  			this.hideLoading();

  		});
  	});
  }
}


