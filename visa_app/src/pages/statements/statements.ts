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
    selector: 'page-statements',
    templateUrl: 'statements.html',
})
export class StatementsPage {
  type = "mini";
  selectedColor = "#790427";
  unSelectedColor = "#c8c8c8";
  title: string = "";
  creditCardColor = "";
  mobileMoneyColor = "";
  present = false;
  data = { account_from: "" }
  accounts = ["0724727999","23434827283"];
  statements = [];
  durations = [ { name: "Miezi 3", id: "3" },{ name: "Miezi 6", id: "6" }, { name: "Miezi 12", id: "12" }];
  constructor( public navCtrl: NavController, public navParams: NavParams ) {
    let data = navParams.get( 'data' );
    this.title = data.name
    this.type = data.type
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
