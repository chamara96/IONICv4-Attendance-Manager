import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { AuthenticationService } from '../authentication.service';
import { NavController } from '@ionic/angular';

import {AppComponent} from '../app.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.page.html',
  styleUrls: ['./aboutme.page.scss'],
})
export class AboutmePage implements OnInit {

  isenabled=false;

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'regNo': [
     { type: 'required', message: 'Enter EG number with password' },
     { type: 'pattern', message: 'Example- "2865#####"' }
   ]
 };




  constructor(
    private navCtrl: NavController,
    public appcomp: AppComponent,
    public alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      regNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[2-3]{1}[0-9]{3}[a-z0-9]{5}')
      ])),
    });

    if(this.appcomp.valueJ == null || this.appcomp.j==""){
      this.isenabled=true;
    }
    else{
      this.isenabled=false;
    }





  }

  // tryRegister(value){
  //   this.authService.registerUser(value)
  //    .then(res => {
  //      console.log(res);
  //      this.errorMessage = "";
  //      this.successMessage = "Your account has been created. Please log in.";
  //    }, err => {
  //      console.log(err);
  //      this.errorMessage = err.message;
  //      this.successMessage = "";
  //    })
  // }

  goHomePage(){
    this.navCtrl.goBack('/home');
  }


}
