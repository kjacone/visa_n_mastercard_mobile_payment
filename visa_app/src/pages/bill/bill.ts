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
    selector: 'page-bill',
    templateUrl: 'bill.html',
})
export class BillPage {
  Type = "own";
  selectedColor = "#790427";
  unSelectedColor = "#c8c8c8";
  title: string = "";
  creditCardColor = "";
  mobileMoneyColor = "";
  present = false;
  data = { account_from: "" }
  accounts = ["0724727999","23434827283"];
  constructor( public navCtrl: NavController, public navParams: NavParams ) {
    let data = navParams.get( 'data' );
    this.title = data.name
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
