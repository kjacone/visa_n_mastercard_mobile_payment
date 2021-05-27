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
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {
  customer: any;
  menus: any = [];
  image:string= 'assets/img/icon.svg'
  next: string = 'ThirdPage';
  title: string = '';
  eventCategory = "monthly";
  monthlyBills: any[] = [
    {
      "title": "Anto neo sol Alkamist",
      "description": "Night of soul", "category": "Entertainment",
      "poster": "assets/img/events/anto_neosoul.png",
      "date": "6th March 2018", "location": "Alliance Francaise"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.customer = this.globalVars.getCustomerName();
   // console.log( this.globalVars.getAirtimeBillers() );
    // this.menus = [ { name: 'Vodacom', image: 'assets/img/billers/startimes.png' }, { name: 'Vodacom', image: 'assets/img/billers/startimes.png' }];
    
    let data = navParams.get( 'data' );
    this.menus = data.menu
    this.title = data.name
    this.next = data.next;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
  }
  
goHome() {
  this.navCtrl.setRoot( 'WalletPage');
  } 

ionViewDidEnter() {
  // this.globalVars.reload();

}



openPage( mypage ) {
  let mydata = mypage;
  console.log( mydata );
    this.navCtrl.push( this.next, {data:mydata} );
}



}
