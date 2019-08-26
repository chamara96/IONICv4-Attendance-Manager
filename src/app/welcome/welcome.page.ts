import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import {LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import {Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';



// import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navCtrl: NavController,
    private plt:Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
  		){
    this.plt.ready().then(()=>{
      this.localNotifications.on('click').subscribe(res=>{
        console.log('click:', res);
        let msg = res.data ? res.data.mydata:'';
        this.showAlert(res.title,res.text,msg);
      });

      // this.localNotifications.on('trigger').subscribe(res=>{
      //   console.log('trigger:', res);
      //   let msg = res.data ? res.data.mydata:'';
      //   this.showAlert(res.title,res.text,msg);
      // });

    });

     // this.pushNotification();
  }

  ngOnInit() {
  

  	setTimeout(() => {
      this.pushNotification();
        // console.log('heloooo');
        this.navCtrl.goBack('/home');
    }, 800);

  }

  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header:header,
      subHeader: sub,
      message: msg,
      buttons:['OK']
    }).then(alert=>alert.present());
  }


  // trigger: { every: { weekday:3, hour: 14, minute: 30 }, count:200 },

  pushNotification() {
    this.localNotifications.schedule({
      id:1,
      title:'Reminder!!',
      text:'now 9.00PM\nMark Attendance',
      data:{mydata:'Good night'},
      trigger: { every: { hour: 21, minute: 0 }, count:999 }
      // foreground:true
    });
  }



}
