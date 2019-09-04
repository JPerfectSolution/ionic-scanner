import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController, ModalController } from 'ionic-angular';

import { RoutePickPage } from '../route-pick/route-pick';
import { CheckinVendorProductPage } from '../checkin-vendor-product/checkin-vendor-product';
import { JavaApiProvider } from '../../providers/java-api/java-api';
import { IotApiProvider } from '../../providers/iot-api/iot-api';
import { Toast } from '../ToastReplacement';
import { ProductSelectionPage } from '../product-selection/product-selection';
import { PodSelectionPage } from '../pod-selection/pod-selection';
import { UnkownBarcodePage } from '../unkown-barcode/unkown-barcode';
import { OrderChannelsPage } from '../order-channels/order-channels';
/**
 * Generated class for the PickerCheckerDashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-picker-checker-dash',
  templateUrl: 'picker-checker-dash.html',
})
export class PickerCheckerDashPage {

  opt: string = "picker";
  loader: Loading;
  refreshId: any;
  currentDate: any;
  name: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public iapi: IotApiProvider,
    public japi: JavaApiProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {

    this.iapi.readyLinea();

  }

  gotoUpdateInventory() {
    this.navCtrl.push(ProductSelectionPage);
  }
  gotoUpdatePOD() {
    this.navCtrl.push(PodSelectionPage);
  }
  gotoOrders() {
    this.navCtrl.setRoot(OrderChannelsPage);
  }
  gotoReceiving() {

  }
  gotoTransfer() {

  }
  scanAynBarcode() {
    const modal = this.modalCtrl.create(UnkownBarcodePage,{});
    return modal.present();
  }
  startScan(opt) {
    switch (opt) {
      case "picker":
        // code...
        this.navCtrl.push(RoutePickPage, {});
        break;
      default:
        // code...
        break;
    }
  }

  tryScan() {
    let alert = this.alertCtrl.create({
      title: 'Enter barcode',
      inputs: [
        {
          name: 'bar',
          placeholder: 'PRODUCT BARCODE'
        }
      ],
      buttons: [
        {
          text: 'Use camera',
          handler: data => {
            var amount;

            this.iapi.scanBarcode()
              .then((code) => {
                if (!code || code == "") {
                  Toast.show("Error, no items scanned.", "", "");
                  return;
                }
                this.checkinItem(code);
              })
              .catch((err) => {
                Toast.show("Error, barcode was not scanned!", "", "");
              });

          }
        },
        'Cancel',
        {
          text: 'Confirm',
          handler: data => {
            if (!data.bar)
              return;

            this.checkinItem(data.bar);
          }
        }
      ]
    });
    alert.present();
  }

  updateItems() {
    this.navCtrl.push(CheckinVendorProductPage, { editMode: true });
  }

  checkinItem(barcode) {
    this.loader = this.loadingCtrl.create({
      content: `Saving`
    });
    this.loader.present();

    this.japi.http.post(`${this.japi.URL}checkin_item`, { barcode: barcode, amount: 0 }, this.japi.httpOptions)
      .subscribe(
        (res: any) => {
          this.loader.dismiss();

          if (!res.success) {
            Toast.show(`This barcode is not known, please set which item it is.`, '4000', 'top');
            this.navCtrl.push(CheckinVendorProductPage, { barcode: barcode });
            return;
          }
          Toast.show('Item checked in', '4000', 'top');
        }
      )
  }
  ionViewDidEnter() {
    let d = new Date();
    this.currentDate = d.toLocaleString();

    this.japi.storage.get("name")
      .then(
        data => {
          this.name = data ? data : "NONAME";
        }
      )
      .catch(err => console.log(err))
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PickerCheckerDashPage');
  }
}
