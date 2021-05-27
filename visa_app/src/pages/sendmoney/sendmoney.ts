import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
// import { GlobalVarsProvider } from '../../../providers/providers';

/**
 * Generated class for the AirtimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-sendmoney',
    templateUrl: 'sendmoney.html',
})
export class SendmoneyPage {
  Type = "own";
  selectedColor = "#790427";
  unSelectedColor = "#c8c8c8";
  title: string = "";
  creditCardColor = "";
  mobileMoneyColor = "";
  isSelf = false;
  data = { account_from: "" }
  accounts = ["0724727999","23434827283"];
  constructor( public navCtrl: NavController, public navParams: NavParams ) {
    let data = navParams.get( 'data' );
    this.title = data.name
  }

  onRadioSelected() {

    if ( this.Type === "own" ) {
      this.creditCardColor = this.selectedColor;
      this.mobileMoneyColor = this.unSelectedColor;
      this.isSelf = true;
    } else {
      this.mobileMoneyColor = this.selectedColor;
      this.creditCardColor = this.unSelectedColor;
      this.isSelf = false;

    }

  }

  openPage( page ) {
    this.navCtrl.push( page );
  }

goHome() {
  this.navCtrl.setRoot( 'WalletPage');
  } 

ionViewDidEnter() {
  // this.globalVars.reload();

}






}
