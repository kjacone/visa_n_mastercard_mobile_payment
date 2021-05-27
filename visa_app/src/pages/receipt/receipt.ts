import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  response: string = "Your request is being processed";
  statements: any = {};
cssclass:string = "success"
  next: string = "";
constructor( public navCtrl: NavController, public navParams: NavParams ) {
  let data = navParams.get( "data" );
  // console.log( "Receipt: ", data );
  this.cssclass = data.style;
  if (this.cssclass == 'statements'){
    this.statements = data.message;
    this.response = "";
   } else { 
    this.response = data.message;
  }
 
  this.next = data.next;
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
