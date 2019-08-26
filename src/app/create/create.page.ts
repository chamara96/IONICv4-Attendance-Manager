import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import {AppComponent} from '../app.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  isenabled=false;

  ref = firebase.database().ref("infos" + this.appcomp.j + "/");
  infoForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private navCtrl: NavController,
    public appcomp: AppComponent,
    private formBuilder: FormBuilder) {
      this.infoForm = this.formBuilder.group({
        'info_title' : [null, Validators.required],
        'info_description' : [null, Validators.required],
        'info_present' : [" ",Validators.required],
        'info_total' : [" ",Validators.required],
        'info_absent' : [" ",Validators.required],
        'info_excuse' : [" ",Validators.required],
        'info_percentage' : [" ", Validators.required],
        'info_notes' : [" ", Validators.required]
      });
    }

  ngOnInit() {
    if(this.appcomp.valueJ == null){
      this.isenabled=true;
    }
    else{
      this.isenabled=false;
    }
  }

  saveInfo() {
    let newInfo = firebase.database().ref("infos" + this.appcomp.j + "/").push();
    newInfo.set(this.infoForm.value);
    // this.router.navigate(['/detail/'+newInfo.key]);
    this.router.navigate(['/home']);
  }

  goHomePage(){
    this.navCtrl.goBack('/home');
  }

}
