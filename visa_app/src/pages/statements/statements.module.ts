import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatementsPage } from './statements';

@NgModule({
  declarations: [
    StatementsPage
  ],
  imports: [
    IonicPageModule.forChild( StatementsPage )
  ],
  exports: [
    StatementsPage
  ]
})
export class StatementsPageModule {}
