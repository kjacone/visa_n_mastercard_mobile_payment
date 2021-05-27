import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThirdPage } from './third';

@NgModule({
  declarations: [
    ThirdPage
  ],
  imports: [
    IonicPageModule.forChild( ThirdPage )
  ],
  exports: [
    ThirdPage
  ]
})
export class ThirdPageModule {}
