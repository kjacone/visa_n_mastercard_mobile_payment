import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TurnupPage } from './turnup';

@NgModule({
  declarations: [
    TurnupPage,
  ],
  imports: [
    IonicPageModule.forChild(TurnupPage),
  ],
})
export class TurnupPageModule {}
