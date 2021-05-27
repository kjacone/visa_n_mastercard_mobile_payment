import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PinchangePage } from './pinchange';

@NgModule({
  declarations: [
    PinchangePage,
  ],
  imports: [
    IonicPageModule.forChild( PinchangePage),
    TranslateModule.forChild()
  ],
  exports: [
    PinchangePage
  ]
})
export class PinchangePageModule { }
