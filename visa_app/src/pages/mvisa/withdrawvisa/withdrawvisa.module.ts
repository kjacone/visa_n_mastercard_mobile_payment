/**
 * Created by vonyango on 9/18/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawvisaPage } from './withdrawvisa';

@NgModule({
  declarations: [
    WithdrawvisaPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawvisaPage),
  ],
  exports: [
    WithdrawvisaPage
  ]
})
export class WithdrawvisaPageModule {}
