import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MvisaMenuPage } from './mvisa-menu';

@NgModule({
  declarations: [
    MvisaMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MvisaMenuPage),
  ],
  exports: [
    MvisaMenuPage
  ]
})
export class MvisaMenuPageModule {}
