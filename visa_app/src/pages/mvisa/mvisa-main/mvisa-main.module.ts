/**
 * Created by vonyango on 9/18/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MvisaMainPage } from './mvisa-main';

@NgModule({
  declarations: [
    MvisaMainPage,
  ],
  imports: [
    IonicPageModule.forChild(MvisaMainPage),
  ],
  exports: [
    MvisaMainPage
  ]
})
export class MvisaMainPageModule {}
