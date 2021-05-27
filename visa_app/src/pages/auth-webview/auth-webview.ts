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
  constructor( public platform: Platform, private loadingCtrl:LoadingController, private dSanitizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public globalVars: GlobalVarsProvider) {
    let data = navParams.get( 'data' );
    this.res = data;
    // this.sanitizer = dSanitizer;
    //  this.safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(data.url+'/override-http-headers-default-settings-x-frame-options');
  }

  ngOnInit() {
    // this.presentLoading();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create( {
      content: 'Please wait...'
    } );

    this.loading.present();
  }

  dismissLoading() {
    
    this.loading.dismiss(); 
  }




  close() {
    this.viewCtrl.dismiss();
  }


}
