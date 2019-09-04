import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Loadable } from '../mapping';
import { Storage } from '@ionic/storage';

import { Device } from '@ionic-native/device';

import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';

import {
  Toast
} from '../../pages/ToastReplacement';

import {
  GoogleMapsEvent,
  Marker
} from '@ionic-native/google-maps';


import {
  LocalNotifications,
  ILocalNotification
} from '@ionic-native/local-notifications';


import {
  JavaApiProvider
} from '../java-api/java-api';
/*
  Generated class for the NavigationApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  handles background service...
*/
@Injectable()
export class NavigationApiProvider extends Loadable {


  public localIndex = [];
  public activeRoute: any = false;
  public locationTool: LocationTool = new LocationTool(this.localNotifications);
  locationConfig: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: true, // enable this to clear background location settings when the app terminates
  }


  constructor(
    public lctrl: LoadingController,
    public storage: Storage,
    private backgroundGeolocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications,
    private japi: JavaApiProvider,
    private device: Device) {

    super(lctrl);

  }

  getCustomerID() {
    return new Promise((resolve, reject) => {
      if (!this.localNotifications.isPresent(1)) {
        reject({});
        return;
      }
      this.localNotifications.get(1)
        .then(
          (notification: ILocalNotification) => {
            resolve(notification.data);
          }
        )
    });
  }

  makeId() {
    return Math.random().toString(36);
  }

  openInMaps(location) {
    var str = this.device.platform;
    var loc = location.geometry.location;
    var geocoords = loc.lat + ',' + loc.lng;
    if (str == "Android") {
      var label = encodeURI(location.name); // encode the label!
      window.open('geo:0,0?q=' + geocoords + '(' + label + ')', '_system');
      return;
    }
    window.open('maps://?q=' + geocoords, '_system');
  }

  getLocationInBackground() {
    this.backgroundGeolocation.configure(this.locationConfig)
      .subscribe((location: BackgroundGeolocationResponse) => {

        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY

        this.checkOnActiveRoute(location);


      });

    // start recording location
    this.backgroundGeolocation.start();

  }

  checkOnActiveRoute(location) {
    if (!this.activeRoute) {
      console.log("No route!!!");
      return;
    }

    let stopsLeft = this.locationTool.stopsRemaining(this.activeRoute.stops);

    if (stopsLeft == 0) {

      this.locationTool.alertComplete(this.activateRoute);
      this.removeRoute(this.activeRoute);
      this.activeRoute = false;

      return;
    }


    let anyId = this.locationTool.detectClosestStore(this.localIndex, location);

    if (anyId) {

      this.activeRoute = this.locationTool.clearStop(this.activeRoute, anyId);
      this.saveActiveRoute();

    }
  }


  // Route manager
  getRoutes() {
    this.presentLoading()
    this.storage.get('routes').then((val) => {
      this.hideLoading();
      if (!val) {
        return;
      }
      this.localIndex = val;
      this.setActiveRoute(this.localIndex);
    });
  }

  getRouteByIdSync(id) {
    let result;
    this.storage.get('routes').then((val) => {

      for (var i = val.length - 1; i >= 0; i--) {
        let rt = val[i];
        if (rt.id == id) {
          result = rt;
          break;
        }
      }
    });
    return result;
  }

  getRouteById(id) {
    this.presentLoading();
    return new Promise((resolve: Function, reject: Function) => {
      this.storage.get('routes').then((val) => {
        this.hideLoading();
        let found = false;

        if (val)
          for (var i = val.length - 1; i >= 0; i--) {
            let rt = val[i];
            if (rt.id == id) {
              resolve(rt);
              found = true;
              break;
            }
          }
        if (!found)
          resolve(found);
      });
    });
  }

  saveRoutes() {
    this.storage.set("routes", this.localIndex);
  }

  saveActiveRoute() {
    let index = this.activeRoute;
    this.localIndex[index] = this.activeRoute;
    this.saveRoutes();
  }

  setActiveRoute(index) {
    for (var i = index.length - 1; i >= 0; i--) {
      if (index[i].active) {
        this.activeRoute = index[i];
        break;
      }
    }
  }

  activateRoute(route) {
    let index = this.routeIndex(route);

    if (this.anyActive()) {

      Toast.show('You are already on another route.', '5000', 'top');
      return false;
    }

    route.active = true;
    this.activeRoute = route;
    this.localIndex[index] = route;
    this.saveRoutes();

    Toast.show('Route started...', '5000', 'top');
    return true;
  }

  addRoute(name, stops, id) {
    this.localIndex.push({ id, name: name, status: 'pending', stops: [] });
    this.storage.set("routes", this.localIndex);
  }

  routeIndex(route): number {
    let index = 0;

    for (var i = this.localIndex.length - 1; i >= 0; i--) {
      if (this.localIndex[i].id == route.id) {
        index = i;
        break;
      }
    }

    return index;
  }

  addLocations(map, locations, icon, action) {
    for (var i = locations.length - 1; i >= 0; i--) {
      let stop = locations[i];

      if (!stop.cleared)
        this.setupMarker(map, stop, icon, action, i);
    }
  }

  anyActive() {

    var result = false;
    for (var i = this.localIndex.length - 1; i >= 0; i--) {
      if (this.localIndex[i].active) {
        result = true;
        break;
      }
    }

    return result;
  }

  setupMarker(map, stop, icon, action, index) {

    if (!stop.geometry)
      return;

    let coords = stop.geometry.location;

    //.lng
    let marker: Marker = map.addMarkerSync({
      title: `${stop.name}
Stop #${index + 1}`,
      icon: icon,
      animation: 'DROP',
      position: {
        lat: coords.lat,
        lng: coords.lng
      }
    });

    if (marker.on)
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        action(stop, marker);
      });
  }

  updateRoute(route) {
    let index = this.routeIndex(route);
    this.localIndex[index] = route;
    this.saveRoutes();

    this.storage.set(`route_order_${route._id}`, JSON.stringify(route.stops));

    if (route.active) {
      this.activeRoute = route;
    }
  }

  generateRouteLocationIDs(stops) {
    let ids = [];
    for (var i = 0; i < stops.length; i++) {
      ids.push(stops[i]._id);
    }

    return ids;
  }

  releaseLocations(route) {
    if (!route.stops) {
      return;
    }

    let locations = this.generateRouteLocationIDs(route.stops);

    for (var i = locations.length - 1; i >= 0; i--) {
      let location = locations[i];
      this.japi.http.delete(`${this.japi.URL}route_lock/${location}`, this.japi.httpOptions)
        .subscribe(
          (res: any) => {

          }
        );
    }
  }

  removeRoute(route) {
    // this.releaseLocations(route);
    let index = this.routeIndex(route);
    this.localIndex.splice(index, 1);
    this.storage.set("routes", this.localIndex);
  }

}


export class LocationTool {

  constructor(private localNotifications: LocalNotifications) {

  }

  detectClosestStore(index, location: any) {
    //1.2
    let inRange = 0.5; // km
    let stopId = false;
    for (var i = index.length - 1; i >= 0; i--) {
      let stop = index[i];
      let coords = stop.geometry.location;
      let distance = this.getDistanceFromLatLonInKm(
        coords.lat,
        coords.lng,
        location.latitude,
        location.longitude
      );

      if (distance <= inRange) {
        this.alert(stop);
        stopId = stop._id;
        break;
      }
    }

    return stopId;
  }

  stopsRemaining(stops) {
    let result = 0;

    if (stops)
      for (var i = stops.length - 1; i >= 0; i--) {
        if (stops[i].cleared)
          result++;
      }

    return result;
  }

  clearStop(route, stop) {
    for (var i = route.stops.length - 1; i >= 0; i--) {
      let s = route.stops[i];
      if (s._id == stop) {
        route.stops[i].cleared = true;
        break;
      }
    }

    return route;
  }

  alert(stop) {

    if (this.localNotifications.isPresent(1)) {
      return;
    }

    this.localNotifications.schedule({
      id: 1,
      text: `Your are near ${stop.name}, tap on this notification to open this customer's profile. `,
      sound: null,
      data: { customer: stop.customer, id: stop._id }
    });
  }

  alertComplete(route) {
    this.localNotifications.schedule({
      id: 1,
      text: `You completed your route ${route.name}.`,
      sound: null
    });
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
}

