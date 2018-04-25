import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string; 

  weather:any;
  location:{
    city:string,
    country:string
  }

  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,
    private storage:Storage,
    private inAppBrowser: InAppBrowser
    ) {

  }

  openWebpage() {
    const browser = this.inAppBrowser.create(this.weather.forecast_url);
  }



  ionViewWillEnter(){

    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      } 
      else {
        this.location = {
          city: 'Dublin',
          country: 'Ireland'
        }
      }

      this.weatherProvider.getWeather(this.location.city, this.location.country)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });
    });
  }
}
