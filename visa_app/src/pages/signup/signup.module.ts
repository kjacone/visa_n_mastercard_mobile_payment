import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchListComponent } from '../../components/search-list/search-list';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage, SearchListComponent,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild()
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule { }
