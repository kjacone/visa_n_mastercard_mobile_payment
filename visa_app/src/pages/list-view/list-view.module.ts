import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListViewPage } from './list-view';

@NgModule({
  declarations: [
    ListViewPage
  ],
  imports: [
    IonicPageModule.forChild( ListViewPage)
  ],
  exports: [
    ListViewPage
  ]
})
export class ListViewPageModule {}
