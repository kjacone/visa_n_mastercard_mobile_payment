import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinModalPage } from './pin-modal';

@NgModule({
  declarations: [
    PinModalPage
  ],
  imports: [
    IonicPageModule.forChild( PinModalPage)
  ],
  exports: [
    PinModalPage
  ]
})
export class PinModalPageModule {}
