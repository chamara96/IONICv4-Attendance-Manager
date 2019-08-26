import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';

import {AppComponent} from '../app.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  info = {};
  status={
    head:"",
    content:"",
    icon:""
  };

  constructor(private route: ActivatedRoute,
    public appcomp: AppComponent,
    private navCtrl: NavController,
    public router: Router) {
    firebase.database().ref("infos" + this.appcomp.j + "/" +this.route.snapshot.paramMap.get('key')).on('value', resp => {
      this.info = snapshotToObject(resp);

    });

  }


  ngOnInit() {
  }

  goHomePage(){
    this.navCtrl.goBack('/home');
  }

  formatSubtitle = (percent: number) : string => {

    if(percent > 100){
      this.status.head="Invalid Inputs";
      this.status.content="contact admin"
      this.status.icon="ios-ionitron"
      return ""
    }
    else if(percent == 100){
      this.status.head="WOW..!";
      this.status.content="Amazing.";
      this.status.icon="ios-happy"
      return ""
    }
    else if(percent >= 80){
      this.status.head="Good";
      this.status.content="Please maintain this"
      this.status.icon="ios-thumbs-up"
      return ""
    }
    else{
      this.status.head="Attention";
      this.status.content="Please make sure that your attendance is enough for sitting the end exam."
      this.status.icon="ios-outlet"
      return ""
    }
    
  }




}


export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}
