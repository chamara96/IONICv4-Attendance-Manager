import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

import {Storage} from '@ionic/storage';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  // [key:string]:any;

  pages = [
    {
      title: 'Registation',
      url: '/aboutme',
      icon: 'md-person-add'
    },
    {
      title: 'Add Module',
      url: '/create',
      icon: 'add-circle'
    },
    {
      title: 'Info',
      url: '/open',
      icon: 'md-contact'
    }
  ];



  j="";
  myName="";


  constructor(
    private platform: Platform,
    private storage: Storage,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
    storage.get('j_storage').then((val) => {this.j=val;});
    storage.get('userName').then((val) => {this.myName=val;});
    // storage.clear();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebaselog);
  }


  public get valueJ() : string {
    return this.j;
  }
  public set valueJ(v : string) {
    this.j = v;
    this.storage.set('j_storage', v);
  }

  public get userName() : string {
    return this.myName;
  }
  public set userName(v : string) {
    this.myName = v;
    this.storage.set('userName', v);
  }

  ngOnInit(){
  }

}
