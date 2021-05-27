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
    selector: 'page-third',
    templateUrl: 'third.html',
})
export class ThirdPage {
  customer: any;
  menus: any = [];
  image: string = 'assets/img/icon.svg'
  next: string = 'ThirdPage';
  title: string = '';
  transactions: any[] = [ {
    "title": "VISA-23E-R745",
    "status": "Rejected",
    "amount": "850", "date": "25.04.2017 09:30PM"
  }, {
    "title": "Blankets & Wines - 211-YF38",
    "status": "Purchase",
    "amount": "2200", "date": "25.04.2017 10:30PM"
  }, {
    "title": "MPESA - MBI2T6XPTC",
    "status": "Wallet topup",
    "amount": "250", "date": "13.04.2017 04:30AM"
  }];

  constructor( public navCtrl: NavController, public navParams: NavParams ) {
    // let data = navParams.get( 'data' );
    // this.menus = data.menu
    // this.title = data.name
    // this.next = data.next;
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ThirdPage' );
  }

  goHome() {
    this.navCtrl.setRoot( 'WalletPage' );
  }

  ionViewDidEnter() {
    // this.globalVars.reload();

  }

  receipt(statement:any) {
    // this.alertService.show
    // this.navCtrl.push( 'ReceiptPage' );
    this.navCtrl.push( 'ReceiptPage', {
      data: {
        message: statement,
        style: 'statements',
        next: 'WalletPage'
      }
    } );
  }

  openPage( mypage ) {
    let mydata = mypage;
    console.log(mydata);
    this.navCtrl.push( this.next, { data: mydata } );
  }




}
