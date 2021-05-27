import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OthersPage } from './others';

@NgModule({
  declarations: [
    OthersPage
  ],
  imports: [
    IonicPageModule.forChild( OthersPage )
  ],
  exports: [
    OthersPage
  ]
})
export class OthersPageModule {}
