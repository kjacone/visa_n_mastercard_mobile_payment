import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavingsPage } from './savings';

@NgModule({
  declarations: [
    SavingsPage
  ],
  imports: [
    IonicPageModule.forChild( SavingsPage )
  ],
  exports: [
    SavingsPage
  ]
})
export class SavingsPageModule {}
