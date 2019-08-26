
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';


 
@Component({
  selector: 'app-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.scss'],
})
export class OpenPage implements OnInit {
 
  constructor(
 
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) { }
 
  ngOnInit() {
  }

  goHomePage(){
    this.navCtrl.goBack('/home');
  }
 
 
}