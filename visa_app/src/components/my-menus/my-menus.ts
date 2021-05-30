import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecentTransactionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-menus',
  templateUrl: 'my-menus.html'
})
export class MyMenusComponent {
  customer: any;
  menus: any = [];
  image: string = 'assets/img/icon.svg'
  next: string = 'ThirdPage';
  title: string = '';
  transactions: any[] = [ {
    "title": "VISA-23E-R745",
    "status": "Rejected",
    "payment_type":"VISA",
    "amount": "850", "date": "25.04.2017 09:30PM"
  }, {
    "title": "Blankets & Wines - 211-YF38",
    "status": "Purchase",
      "payment_type":"VISA",
    "amount": "2200", "date": "25.04.2017 10:30PM"
  }, {
    "title": "MPESA - MBI2T6XPTC",
    "status": "Wallet topup",
      "payment_type":"VISA",
    "amount": "250", "date": "13.04.2017 04:30AM"
  }];

  constructor( public navCtrl: NavController, public navParams: NavParams ) { }

  goHome() {
  //  this.navCtrl.setRoot( 'WalletPage' );
  }



  receipt(statement:any) {
    this.navCtrl.push( 'ReceiptPage', {
      data: {
        message: statement,
        style: 'statements',
        next: 'WalletPage'
      }
    } );
  }

  openPage( mypage ) {
   
    switch(mypage) {
      case 'gepg':
        this.navCtrl.push( 'BillPage');
        break;
      case 'mobile_money':
        this.navCtrl.push( 'MobileMoneyPage');
        break;
      case 'add_card':
        this.navCtrl.push( 'SignupPage');
        break;
      default:
        // code block
        break;
    }


  }




}
