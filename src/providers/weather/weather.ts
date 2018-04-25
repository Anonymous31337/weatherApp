import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  apikey='724612b637c5baa2';
  url;

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url='http://api.wunderground.com/api/'+ this.apikey +'/conditions/q';
  }

  getWeather(city, country){
    return this.http.get(this.url+'/'+country+'/'+city+'.json')
      .map(res => res.json());
  }

}
