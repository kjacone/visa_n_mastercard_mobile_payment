/**
 * Created by vonyango on 9/18/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LipamvisaPage } from './lipamvisa';

@NgModule({
  declarations: [
    LipamvisaPage,
  ],
  imports: [
    IonicPageModule.forChild(LipamvisaPage),
  ],
  exports: [
    LipamvisaPage
  ]
})
export class LipamvisaPageModule {}
