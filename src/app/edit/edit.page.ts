import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import {AppComponent} from '../app.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  isenabled=false;

  ref = firebase.database().ref("infos" + this.appcomp.j + "/");
  infoForm: FormGroup;
  i=0;
  presentHours=0;
  totalHours=0;
  absentHours=0;
  excuseHours=0;
  notes=0;

  title:string;
  code:string;

  // myDate= Date.now();


  constructor(private route: ActivatedRoute,
    public router: Router,
    private navCtrl: NavController,
    public appcomp: AppComponent,
    private formBuilder: FormBuilder) {
      this.infoForm = this.formBuilder.group({
        'info_present' : [null,Validators.required],
        'info_total' : [null,Validators.required],
        'info_absent' : [null,Validators.required],
        'info_excuse' : [null,Validators.required],
        'info_percentage' : [null,Validators.required],
        'info_notes' : [null,Validators.required]
      });
      this.getInfo(this.route.snapshot.paramMap.get('key'));
    }

  ngOnInit() {
    if(this.appcomp.valueJ == null){
      this.isenabled=true;
    }
    else{
      this.isenabled=false;
    }
  }

  getInfo(key) {
    firebase.database().ref("infos" + this.appcomp.j + "/" + key).on('value', resp => {
      let info = snapshotToObject(resp);
      //this.i= +info.info_percentage;

      this.presentHours= +info.info_present;
      this.totalHours= +info.info_total;
      this.absentHours= +info.info_absent;
      this.excuseHours= +info.info_excuse;
      this.notes= +info.info_notes;

      this.title=info.info_title;
      this.code=info.info_description;


      // this.infoForm.controls['info_title'].setValue(info.info_title);
      // this.infoForm.controls['info_description'].setValue(info.info_description);
      this.infoForm.controls['info_present'].setValue(info.info_present);
      this.infoForm.controls['info_total'].setValue(info.info_total);
      this.infoForm.controls['info_absent'].setValue(info.info_absent);
      this.infoForm.controls['info_excuse'].setValue(info.info_excuse);
      this.infoForm.controls['info_percentage'].setValue(info.info_percentage);
      this.infoForm.controls['info_notes'].setValue(info.info_notes);
    });
  }

  updateInfo() {

    //this.i = this.presentHours*100.00/this.totalHours;
    //this.i = +this.i.toFixed(2);


    this.infoForm.controls['info_percentage'].setValue(+((this.presentHours+this.excuseHours)*100/this.totalHours).toFixed(2));
    //this.infoForm.controls['info_percentage'].setValue(this.i.toFixed(2));

    let newInfo = firebase.database().ref("infos" + this.appcomp.j + "/" +this.route.snapshot.paramMap.get('key')).update(this.infoForm.value);
    this.router.navigate(['/detail/'+this.route.snapshot.paramMap.get('key')]);
  }


  setPresent(){
    this.infoForm.controls['info_present'].setValue(++this.presentHours);
    this.infoForm.controls['info_total'].setValue(++this.totalHours);
  }

  setExcuse(){
    // this.infoForm.controls['info_absent'].setValue(--this.absentHours);
    this.infoForm.controls['info_excuse'].setValue(++this.excuseHours);
  }

  setAbsent(){
    this.infoForm.controls['info_total'].setValue(++this.totalHours);
    this.infoForm.controls['info_absent'].setValue(++this.absentHours);
  }

  goHomePage(){
    this.navCtrl.goBack('/home');
  }

}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}
