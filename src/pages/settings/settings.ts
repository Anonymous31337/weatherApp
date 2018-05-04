import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

//@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city:string;
  country:string;

  countries: string[];
  errorMessage: string;
  descending: boolean = false;
  order: number;
  column: string = 'name';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public rest: RestApiProvider,
    private storage: Storage) {

      this.storage.get('location').then((val) => {
        if(val != null){
          let location = JSON.parse(val);
          this.city = location.city;
          this.country = location.country;
        }
        else {
          this.city = 'Berlin';
          this.country = 'Germany';
        }
      });

    }
  

    saveAlert() {
      let alert = this.alertCtrl.create({
        title: 'Saved',
        subTitle: 'changes saved',
        buttons: ['OK']
      });
      alert.present();
    }

   saveForm(){
    let location = {
      city: this.city,
      country: this.country
    }
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.goToRoot;
  }

  ionViewDidLoad() {
    this.getCountries();
  }

  getCountries() {
    this.rest.getCountries()
       .subscribe(
         countries => this.countries = countries,
         error =>  this.errorMessage = <any>error);
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }


}
