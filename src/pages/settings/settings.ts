import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

//@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city:string;
  country:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
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

}
