import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';

import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
                  // set defaults here
                  radius: 60,
                  outerStrokeWidth: 4,
                  innerStrokeWidth: 4,
                  space:-4,
                  outerStrokeLinecap:"round",
                  outerStrokeColor: "#808080",
                  innerStrokeColor: "#e7e8ea",
                  animationDuration: 800,
                  toFixed:2,
                  unitsFontSize:"14",
                  showTitle:true,
                  showSubtitle:false,
                  showBackground:true,

                  backgroundPadding: 7,
                  subtitleFontSize: "20",
                  animateTitle: false,
                  showUnits: true,
                  clockwise: false                  
              })
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {

  // formatSubtitle = (percent: number) : string => {
  //   if(percent == 100){
  //     return "Congratulations!"
  //   }
  //   else if(percent >= 80){
  //     return "Good"
  //   }
  //   else if(percent < 80){
  //     return "Attention"
  //   }
  //   else {
  //     return "Not started"
  //   }
  // }
}
