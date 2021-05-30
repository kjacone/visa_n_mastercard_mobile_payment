import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { LanguageProvider } from '../../providers/language/language';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
 walletSection="transactions";
  bal: boolean = false;

 transactions:any[]=[{"title":"VISA-23E-R745",
 "status":"Rejected",
 "amount":"KES -850","date":"25.04.2017 09:30PM"},{"title":"Blankets & Wines - 211-YF38",
 "status":"Purchase",
 "amount":"KES -2200","date":"25.04.2017 10:30PM"},{"title":"MPESA - MBI2T6XPTC",
 "status":"Wallet topup",
 "amount":"KES 8 250","date":"13.04.2017 04:30AM"}];


 ids: any = {
   "tv": {
     "name": "TV Subscription",
     "next": "TopupPage",
     "menu": [
       {
         "name": "DSTV",
         "id": "12345",
         "image": "assets/img/billers/dstv.png"
       },
       {
         "name": "GOTV",
         "id": "12345",
         "image": "assets/img/billers/gotv.png"
       },
       {
         "name": "STARTIMES",
         "id": "12345",
         "image": "assets/img/billers/startimes.png"
       },
       {
         "name": "ZUKU",
         "id": "12345",
         "image": "assets/img/billers/zuku.png"
       }
     ]
   },
   "electricity": {
     "name": "Electricity",
     "next": "TopupPage",
     "menu": [
       {
         "name": "LUKU",
         "id": "12345",
         "image": "assets/img/billers/tanesco.png"
       },
       {
         "name": "TANESCO",
         "id": "12345",
         "image": "assets/img/billers/tanesco2.png"
       }
     ]
   },
   "internet": {
     "name": "Internet Subscription",
     "next": "TopupPage",
     "menu": [
       {
         "name": "SMILE INTERNET",
         "id": "12345",
         "image": "assets/img/billers/dstv.png"
       }
     ]
   },
   "event": {
     "name": "Events",
     "next": "TopupPage",
     "menu": [
       {
         "name": "SMILE INTERNET",
         "id": "12345",
         "image": "assets/img/billers/dstv.png"
       }
     ]
   },
   "water": {
     "name": "Water Bills",
     "next": "TopupPage",
     "menu": [
       {
         "name": "WATER",
         "id": "12345",
         "image": "assets/img/billers/nairobi_water.png"
       }
     ]
   },
   "travel": {
     "name": "Transportation",
     "next": "TopupPage",
     "menu": [
       {
         "name": "FAST JET",
         "id": "12345",
         "image": "assets/img/billers/fastjet-logo.png"
       },
       {
         "name": "PRECISION AIR",
         "id": "12345",
         "image": "assets/img/billers/precision-air.png"
       }
     ]
   }
 };

 menus: any = {
   "viewall": {
     "next": "SecondPage",
     "name": "All Categories",
     "menu": [
       {
         "next": "TopupPage",
         "name": "TV Subscription",
         "id": "1",
         "image": "assets/svg/top1/computer.svg",
         "menu": [
           {
             "name": "DSTV",
             "id": "12345",
             "image": "assets/img/billers/dstv.png"
           },
           {
             "name": "GOTV",
             "id": "12345",
             "image": "assets/img/billers/gotv.png"
           },
           {
             "name": "STARTIMES",
             "id": "12345",
             "image": "assets/img/billers/startimes.png"
           },
           {
             "name": "ZUKU",
             "id": "12345",
             "image": "assets/img/billers/zuku.png"
           }
         ]
       },
       {
         "next": "TopupPage",
         "name": "Electricity",
         "id": "2",
         "image": "assets/svg/top1/computer.svg",
         "menu": [
           {
             "name": "LUKU",
             "id": "12345",
             "image": "assets/img/billers/tanesco.png"
           },
           {
             "name": "TANESCO",
             "id": "12345",
             "image": "assets/img/billers/tanesco2.png"
           }
         ]
       },
       {
         "next": "TopupPage",
         "name": "Internet Subscription",
         "id": "3",
         "image": "assets/svg/top1/computer.svg",
         "menu": [
           {
             "name": "SMILE INTERNET",
             "id": "12345",
             "image": "assets/img/billers/dstv.png"
           }
         ]
       },
       {
         "next": "TopupPage",
         "name": "Water Bills",
         "id": "4",
         "image": "assets/svg/top1/computer.svg",
         "menu": [
           {
             "name": "WATER",
             "id": "12345",
             "image": "assets/img/billers/nairobi_water.png"
           }
         ]
       },
       {
         "next": "TopupPage",
         "name": "Transportation",
         "id": "5",
         "image": "assets/svg/top1/computer.svg",
         "menu": [
           {
             "name": "FAST JET",
             "id": "12345",
             "image": "assets/img/billers/fastjet-logo.png"
           },
           {
             "name": "PRECISION AIR",
             "id": "12345",
             "image": "assets/img/billers/precision-air.png"
           }
         ]
       },
       {
         "next": "TopupPage",
         "name": "Government Services",
         "id": "6",
         "image": "assets/svg/top1/computer.svg",
         "menu": [
           {
             "name": "PARTNER NHIF",
             "id": "12345",
             "image": "assets/img/billers/partner-nhif.png"
           },
           {
             "name": "TRA",
             "id": "12345",
             "image": "assets/img/billers/tra-logo.png"
           },
           {
             "name": "TPA",
             "id": "12345",
             "image": "assets/img/billers/tpa-logo.png"
           }
         ]
       },
       {
         "next": "TopupPage",
         "name": "Entertainment",
         "id": "7",
         "image": "assets/svg/top1/computer.svg",
         "menu": [

         ]
       },
       {
         "next": "TopupPage",
         "name": "Events",
         "id": "8",
         "image": "assets/svg/top1/computer.svg",
         "menu": [

         ]
       }
     ]
   }
 }

  enquiries:any[]=[{"title":"Request Loan","icon":"assets/img/wallet/request_loan.png"},
  {"title":"Full statement","icon":"assets/img/wallet/full_statement.png"},
  {"title":"Mini statement","icon":"assets/img/wallet/mini_statement.png"}];


  data: any = { type: "get_menu",mobile: "",account_from:"" };
  err:any = {}
  accounts = [ "0724727999", "23434827283" ];

  constructor( public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider, public clientdata: ClientdataProvider,
    public popoverCtrl: PopoverController ) {
    this.err = LanguageProvider.getLang( 'en' ).general;
    this.data.mobile = globalVars.mobileNo;
    // this.submitted();

  
  }



  submitted() {
    this.alertService.showDefaultLoading();
    this.clientdata.sendData( this.data )
      .subscribe( data => {
        if ( data.length != 0 ) {
          console.log( "Response: ", data );
          this.alertService.dismissDefaultLoading();
          if ( data.success ) {
            this.ids = JSON.parse( data.submenus );
            console.log( "Sub: ", data.submenus );
            console.log( "Menus: ", data.menus );
            this.menus = JSON.parse( data.menus );


          } else if ( !data.success ) {

            this.alertService.errorPop( "", data.message, true );

          } else {
            this.navCtrl.setRoot( this.navCtrl.getPrevious() );
            this.alertService.errorPop( "", this.err.tech, true );
          }
        } else {
          this.navCtrl.setRoot( this.navCtrl.getPrevious() );
          console.log( " timeout" );
          this.alertService.dismissDefaultLoading();
          this.navCtrl.setRoot( this.navCtrl.getPrevious() );
          this.alertService.errorPop( "", this.err.timeout, true );
        }
      }, error => {
        this.alertService.dismissDefaultLoading();
        this.navCtrl.setRoot( this.navCtrl.getPrevious() );
        this.alertService.errorPop( "", this.err.conn, true );
      } );
  }

  submited() {
    let data = '';
    // this.ids = JSON.parse( data.submenus );
    // this.menus = JSON.parse( data.menus );
  }



  openPage( page ) {
    var mydata = page;
    this.navCtrl.push( 'SecondPage', { data: mydata } );
  }

  open( page,i:string ) {
    var mydata = page.menu.find(i);
    this.navCtrl.push('SecondPage', { data: mydata } );
  }

  eventPage(page:string) {
    this.navCtrl.push( page );
  }

  ionViewDidEnter() {
    console.log( "WalletPage" );
  }


checkBal(){
  this.bal = true;

}
  presentPaymentPopover(myEvent) {
    let popover = this.popoverCtrl.create('PaymentsModalPage');
    popover.present({
      ev: myEvent
    });
  }
turnUp(){
  this.navCtrl.push('TurnupPage');
}
  scan() {
    this.navCtrl.push('ScanQrPage');
  }

}
