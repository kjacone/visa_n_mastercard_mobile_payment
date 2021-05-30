import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileMoneyPage } from './mobile-money';

@NgModule({
  declarations: [
    MobileMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileMoneyPage),
  ],
})
export class MobileMoneyPageModule {}
