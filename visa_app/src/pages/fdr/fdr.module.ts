import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FdrPage } from './fdr';

@NgModule({
  declarations: [
    FdrPage,
  ],
  imports: [
    IonicPageModule.forChild(FdrPage),
  ],
})
export class FdrPageModule {}
