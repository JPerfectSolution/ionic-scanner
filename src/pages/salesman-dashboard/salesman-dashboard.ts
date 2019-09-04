import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { CustomerProfilePage } from '../customer-profile/customer-profile';
import { NewOrderSearchPage } from '../new-order-search/new-order-search';
import { SalesmanChooseRoutePage } from '../salesman-choose-route/salesman-choose-route';

import { JavaApiProvider } from '../../providers/java-api/java-api';

import { NavigationApiProvider } from '../../providers/navigation-api/navigation-api';

import { NetController } from '../net_controller';


import {
  Geolocation
} from '@ionic-native/geolocation';

/**
 * Generated class for the SalesmanDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-salesman-dashboard',
  templateUrl: 'salesman-dashboard.html',
})
export class SalesmanDashboardPage extends NetController {
  
  type = 'line';
  loading = false;

  selRange  = "24 HRS";
  currentDate = "";
  total : any = 0;
  startDate = new Date();
  endDate = new Date(this.startDate.getTime() - (  84600 * 1000) );
  customers = 0;
  name : string = "";

	data = {
	  labels: ["January", "February", "March", "April", "May", "June", "July"],
	  datasets: [
	    {
	      label: "Sales",
	      data: [65, 59, 80, 81, 56, 55, 40],
        spanGaps : true,
        pointRadius : 12,
        backgroundColor : 'rgba(255,255,255,0.3)',
        borderColor : '#fff',
        pointBackgroundColor : '#fff'
	    }
	  ]
	};
  email : string;



	options = {
	  responsive: true,
	  maintainAspectRatio: true,
    legend: {
       display: false
    },
    scales : {
      yAxes: [{
        display: true,
        position: 'right',
        ticks: {
          fontColor: '#fff',
          fontSize : 11,
          beginAtZero: true,
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }],
      xAxes: [{
        ticks: {
           fontSize: 8,
           display : false,
        }
      }]
    }
	};

  constructor(
    public japi : JavaApiProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public napi : NavigationApiProvider,
    private geolocation : Geolocation ) {
    super();
  

    this.japi.http.get(`${this.japi.URL}customers`, this.japi.httpOptions)
    .subscribe(
        (res : any) => {
          this.customers = res.data.length;
        }
     )

    

    japi.storage
    .get("email")
    .then(
      email => {
          this.email = email;
          this.updateValDisp();
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesmanDashboardPage');
    this.dateRange = "24";

  }

  newOrder(){
  	this.navCtrl.push(NewOrderSearchPage, { action : 0 });
  }

  ionViewDidEnter(){
    let d = new Date();
    this.currentDate = d.toLocaleString();

    if(this.email)
      this.updateValDisp();

    this.japi.storage.get("name")
    .then(
      data => {
          this.name = data ? data : "NONAME";
      }
    )
    .catch( err => console.log(err) )
  }

   getLocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
        
        this.napi.checkOnActiveRoute(resp.coords);

    }).catch((error) => {
       console.log('Error getting location', JSON.stringify(error));

    });

  }



  updateValDisp(){
    
   

    let range = parseInt(this.dateRange);

    if(range == 24){
      this.endDate = new Date(this.startDate.getTime() - ( 84600 * 1000) );
      this.selRange = "24 HRS";
    }

    if(range == 30){
      this.endDate = new Date(this.startDate.getTime() - ( 30 * 84600 * 1000) );
      this.selRange = "1 Month";
    }

    if(range == 1){
      this.endDate = new Date(this.startDate.getTime() - ( 7 * 84600 * 1000) );
      this.selRange = "1 Week";
    }
    
    this.updateChart();
  }

  updateChart(){
    this.loading = true;
    let query = { fields : ["total", "taxValue"], start : this.startDate, end : this.endDate, owner : this.email }
    this.japi.http.post(`${this.japi.URL}sale_stats`, query, this.japi.httpOptions)
    .subscribe(
        (res : any ) => {

          if(!res.success){
            console.log(res);
            return;
          }

          this.data.labels = res.data.labels;
          this.data.datasets[0].data = res.data.set;
          this.loading = false;
          this.getTotal(res.data.set);
        }
     )
  
  }

  getTotal(dataset){
    this.total = 0;
    for (var i = dataset.length - 1; i >= 0; i--) {
       let data = dataset[i];

       this.total += parseFloat(data);
    }

    this.total = parseFloat(this.total.toFixed(2));

  }

  showOrders(){
  	this.navCtrl.push(NewOrderSearchPage, { action : 1});
  }

  showRoutes(){
    this.navCtrl.push(SalesmanChooseRoutePage, {});
  }

}
