import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendmoneyPage } from './sendmoney';

@NgModule({
  declarations: [
    SendmoneyPage
  ],
  imports: [
    IonicPageModule.forChild( SendmoneyPage )
  ],
  exports: [
    SendmoneyPage
  ]
})
export class SendmoneyPageModule {}
