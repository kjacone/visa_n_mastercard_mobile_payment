import { Component } from '@angular/core';
import { Platform, IonicPage, NavParams, NavController,LoadingController, ViewController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { DomSanitizer,SafeResourceUrl } from "@angular/platform-browser";


@IonicPage()
@Component({
  selector: 'page-auth-webview',
  templateUrl: 'auth-webview.html',
})
export class AuthWebviewPage {
  safeUrl:  SafeResourceUrl;
  sanitizer: DomSanitizer;
  inCardData: any = {
    url: "",
    status: ""
  };
  loading: any;
  res: any = {};
  response: string = "Your request is being processed";
  statements: any = {};
cssclass:string = "statements"
  next: string = "";


constructor( public navCtrl: NavController, public navParams: NavParams ) {
  let data = navParams.get( "data" );
  // console.log( "Receipt: ", data );
  console.log(data);
this.statements = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }
  goHome() {
    this.navCtrl.setRoot( 'WalletPage' );
  }
  goNext() {
    if ( this.next == "" ) {
      this.navCtrl.setRoot( 'WalletPage' );
    } else {
      this.navCtrl.setRoot( this.next);
    }

  }

}
