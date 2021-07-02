import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { LanguageProvider } from '../../providers/language/language';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { CardIO } from '@ionic-native/card-io';

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
  general: any = {};
  browserRef: any;
  data: any = { type: "get_menu",mobile: "",account_from:"" };
  constructor( private cardIO: CardIO, private oneSignal: OneSignal, public iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider, public clientdata: ClientdataProvider ) {

    this.data.mobile = globalVars.mobileNo;
    this.general = LanguageProvider.getLang('en').general;
   }

  goHome() {
  //  this.navCtrl.setRoot( 'WalletPage' );
  }




  readCreditCard(){

    let options = {
      requireExpiry: true,
      requireCVV: true,
      requirePostalCode: false,
      requireCardholderName:true,
  
    };
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            this.cardIO.scan(options) .then(
              (res) => {
              console.log(res);
             this.submit(res);
              })
              .catch(function(error) {
              alert(JSON.stringify(error));
              });
          
  
          }
        }
      );
  
  }
  


  getOTP(data) {
    // let message = "";
    //  let template = "<div>" + message + "</div>";
    // let final_url = "https://eximiousdev.ngrok.io/visa_api/auth3ds.jsp?"+"url="+(data.acsUrl).replaceAll("&","~").replaceAll("=","_")+"&PaReq="+(data.pareq).replaceAll("&","~").replaceAll("=","_")+"&xid="+(data.xid).replaceAll("&","~").replaceAll("=","_");
    let term_url = "http://eximious.ngrok.io/payments/webhook";
    const pageContent = '<html><head></head><body><form name="redirect" id="redirect" action="' + data.acsUrl + '" method="post">' +
      '<input type="hidden" name="PaReq" value="' + data.pareq + '">' +
      '<input type="hidden" name="TermUrl" value="' + term_url + '">' +
      '<input type="hidden" name="MD" value="' + data.xid + '">' +
      '</form> <script type="text/javascript">document.getElementById("redirect").submit();</script></body></html>';
    console.log('pageContent: ', pageContent);
    const pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
  
    this.browserRef = this.iab.create(
      pageContentUrl,
      '_blank',
      'hidden=no,location=no,clearsessioncache=yes,clearcache=yes'
    );
  
  }
  
  
  submit(res) {
    let data = res;
    data.type = "1001"
    data.phoneNumber = this.globalVars.mobileNo;
  
    this.alertService.showDefaultLoading();
    this.globalVars.logger("Request: ", JSON.stringify(data));
    this.clientdata.sendData(data)
      .subscribe(data => {
        this.alertService.dismissDefaultLoading();
        if (data.length != 0) {
  
          let r_data = JSON.parse(data);
          console.log("Response: ", r_data);
          if (r_data.f39 == "00") {
            this.getOTP(r_data);
  
          } else {
            //  this.navCtrl.setRoot( this.navCtrl.getPrevious() );
            this.alertService.errorPop("", r_data.f48, true);
          }
  
  
        } else {
  
          this.alertService.errorPop("", this.general.timeout, true);
        }
      }, error => {
        this.alertService.dismissDefaultLoading();
        this.alertService.errorPop("", this.general.conn, true);
      });
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
