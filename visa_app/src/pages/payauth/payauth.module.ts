import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayauthPage } from './payauth';

@NgModule({
  declarations: [
    PayauthPage,
  ],
  imports: [
    IonicPageModule.forChild(PayauthPage),
  ],
})
export class PayauthPageModule {}
