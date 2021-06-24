import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisaactivatePage } from './visaactivate';

@NgModule({
  declarations: [
    VisaactivatePage,
  ],
  imports: [
    IonicPageModule.forChild(VisaactivatePage),
  ],
  exports: [
    VisaactivatePage
  ]
})
export class VisaactivatePageModule {}
