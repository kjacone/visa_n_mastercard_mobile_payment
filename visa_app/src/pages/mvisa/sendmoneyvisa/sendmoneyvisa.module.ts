/**
 * Created by vonyango on 9/18/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendmoneyvisaPage } from './sendmoneyvisa';

@NgModule({
  declarations: [
    SendmoneyvisaPage,
  ],
  imports: [
    IonicPageModule.forChild(SendmoneyvisaPage),
  ],
  exports: [
    SendmoneyvisaPage
  ]
})
export class SendmoneyvisaPageModule {}
