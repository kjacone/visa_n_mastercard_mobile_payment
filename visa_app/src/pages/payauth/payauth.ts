import { Component } from '@angular/core';
import { LanguageProvider } from '../../providers/language/language';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';


/**
 * Generated class for the PayauthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payauth',
  templateUrl: 'payauth.html',
})
export class PayauthPage {
  type: string = "own";
  pptdata: any;
  payChoice = "";
  selectedColor = "#790427";
  unSelectedColor = "#c8c8c8";
  title: string = "";
  creditCardColor = "";
  mobileMoneyColor = "";
  isSelf = false;
  error: number = 0;
  pay = false;
  pc = false;
  data: any = { type: "transact" };
  dcb_pay: boolean = false;
  myres: boolean = false;
  accounts = [ "255724727999", "23434827283" ];
  err: any = {};
  username: string = "(+255)0734915281";
  cards = [
    { name: 'mpesa', image: 'assets/img/banks/mpesa.png', select: 'drinkcard-cc' },
    { name: 'tigo_pesa', image: 'assets/img/banks/tigopesa.png', select: 'drinkcard-cc' },
    { name: 'airtel_money', image: 'assets/img/banks/airtelmoney.png', select: 'drinkcard-cc' },
    { name: 'dcb_pesa', image: 'assets/img/banks/dcbpesa.png', select: 'drinkcard-cc' },
    { name: 'visa', image: 'assets/img/banks/visa.png', select: 'drinkcard-cc' },
    { name: 'master_card', image: 'assets/img/banks/master.png', select: 'drinkcard-cc' }
  ];
  // error: number = 0;
  trasactions: any = [];
  historyAvailable: string = 'no';
  image: string = '';

    constructor( public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider,
       public modalCtrl: ModalController, public clientdata:ClientdataProvider ) {
      this.err = LanguageProvider.getLang( 'en' ).general;
    this.data = navParams.get( 'data' );
     
    // this.image = this.data.image;
    delete this.data.image;
    // this.data = ( this.data ).remove( "image" );
    this.title = ( this.data.card ).replace( "_", " " );
    console.log( this.data ); 
    }
  
    selected( name: string, image: string ) {
      this.cards.forEach( function ( element ) {
        element.select = "drinkcard-cc";
      } );
      this.cards.find( v => v.name == name ).select = "drinkcard-clicked";
      this.data.card = name;
      this.image = image;
    }
    cancel() {
      this.navCtrl.setRoot( "WalletPage" )
    }

    onRadioSelected() {
      if ( this.type === "own" ) {
        this.creditCardColor = this.selectedColor;
        this.mobileMoneyColor = this.unSelectedColor;
        this.data.mobile = this.username;
        this.isSelf = true;
      } else {
        this.mobileMoneyColor = this.selectedColor;
        this.creditCardColor = this.unSelectedColor;
        this.data.mobile = "";
        this.isSelf = false;
      }
    }
  goback() {
    this.navCtrl.pop();
  }
  
  dcb_auth() { 
    this.dcb_pay = true;
  }
  auth() { 
    // this.alertService.showPin( this.data );
   // this.alertService.showPin();
  }
  continue() { 
    this.myres = true;

  }
  autho() {
    this.alertService.showDefaultLoading();
    this.clientdata.sendData( this.data )
      .subscribe( data => {
        if ( data.length != 0 ) {
          console.log( "Response: ", data );
          this.alertService.dismissDefaultLoading();
          if ( data.success ) {
            // this.globalVars.is_first_login = data.first_login;
            // this.globalVars.Username = this.data.mobile;
            // this.globalVars.country = this.data.country;
            // let persist: any = { mobile: this.data.mobile, country: this.data.country }
            // let encryptPersist = this.globalVars.testenc( JSON.stringify( persist ) );
            // this.storage.set( 'local', encryptPersist );
            this.navCtrl.push( 'ReceiptPage', {
              data: {
                message: data.message,
                style: 'wait',
                next: 'WalletPage'
              }
            } );
          } else if ( !data.success ) {

            this.navCtrl.push( 'ReceiptPage', {
              data: {
                message: data.message,
                style: 'error',
                next: ''
              }
            } );

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayauthPage');
  }

}
