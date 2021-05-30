import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisaPage } from './visa';

@NgModule({
  declarations: [
    VisaPage,
  ],
  imports: [
    IonicPageModule.forChild(VisaPage),
  ],
})
export class VisaPageModule {}
