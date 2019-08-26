import { Component, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';


import {AppComponent} from '../app.component';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {


  // infos = [];
  // ref = firebase.database().ref('infos/');
  [key:string]:any;
  ref = firebase.database().ref("infos" + this.appcomp.j + "/");

  myDate= Date.now();

  constructor(private route: ActivatedRoute,
    public router: Router,
    private navCtrl: NavController,
    public appcomp: AppComponent,
    public alertController: AlertController) {
    // this.ref = firebase.database().ref("infos" + this.appcomp.j + "/");
    this.ref.on('value', resp => {
      this['infos'+this.appcomp.j] = [];
      this['infos'+this.appcomp.j] = snapshotToArray(resp);
    });

  }

  ngOnDestroy() {
    firebase.database().goOffline();
    // console.log('HomePage destroyed!');
  }


  ngOnInit(){
    firebase.database().goOnline();
    // console.log('HomePage Again!');
  }




  edit(key) {
    this.router.navigate(['/edit/'+key]);
  }

  async delete(key) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            firebase.database().ref("infos" + this.appcomp.j + "/" +key).remove();
          }
        }
      ]
    });

    await alert.present();
  }



  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     header: 'H.M.Chamara Herath',
  //     // subHeader: 'Undergraduate student of Electrical & Information Engineering Department in Faculty of Engineering University of Ruhuna',
  //     subHeader:'Contact me',
  //     cssClass: 'popup-pin',
  //     message: '<center><img src="https://i.ibb.co/nQDmRyh/DSC-0177-2.jpg" height="100"></center><p><a href="mailto:cmb.info96@gmail.com">cmb.info96@gmail.com</a></p><p><a href="https://github.com/chamara96">GitHub</a></p><p><a href="https://www.linkedin.com/in/chamara-herath-838446172">LinkedIn</a></p><p><a href="https://www.facebook.com/chamara.cmb96">Facebook</a></p><p><a href="tel:+94702697490">(+94)70 269 7490</a></p>',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }




}



export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}
