import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthWebviewPage } from './auth-webview';

@NgModule({
  declarations: [
    AuthWebviewPage
  ],
  imports: [
    IonicPageModule.forChild(AuthWebviewPage)
  ],
  exports: [
    AuthWebviewPage
  ]
})
export class AuthWebviewPageModule {}
