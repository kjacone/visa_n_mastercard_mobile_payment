import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { App, Platform, Nav, Config, ModalController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { LanguageProvider } from '../../providers/language/language';
/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var SMS: any;
@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
  } )

export class OtpPage {
  messages: any = [];
  data: any = { type: "1002", code: "", phoneNumber:""};
  general: any = {};
  error: number = 0;
  otp: number = 1;
  otpied: any = "";
  checked: boolean = false;
  constructor( public navCtrl: NavController, public navParams: NavParams, public app: App, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider,
    public modalCtrl: ModalController, public clientdata: ClientdataProvider,
    public androidPermissions: AndroidPermissions, public platform: Platform, public callNumber: CallNumber ) {

    this.general = LanguageProvider.getLang( 'en' ).general;
    // console.log( this.err );
    //this.submittt();
  }


  verifyOTP() {
    if ( this.data.code == this.otpied ) {
     this.globalVars.saveUser( this.globalVars.trimPhome(  this.data.phoneNumber ) );
      this.globalVars.mobileNo = this.data.phoneNumber;
      this.alertService.errorPop( "LoginPage","OTP verification was Successful",true );


    } else {
      console.log( "fail" );
      this.alertService.errorPop("", "Your OTP verification failed",true );
    }
  }



  submitOTP() {
    if ( this.checked ) {
      this.alertService.showDefaultLoading();
      this.data.phoneNumber = this.globalVars.trimPhome( this.data.phoneNumber );
      this.clientdata.sendData( this.data )
        .subscribe( data => {
          this.alertService.dismissDefaultLoading();
          if ( data.length != 0 ) {
            console.log( "Response: ", data );
            let r_data = JSON.parse(data);
            if ( r_data.f39 == "00" ) {
              this.otpied = r_data.code;
              this.otp = 2;
              // if ( data.code == "0100" ) {
              //   this.alertService.errorPop( "PinchangePage", data.message, true );
              // } else {
              //   this.alertService.errorPop( "", "Incorrect Confirmation Code", true );
              // }


            } else {
              //  this.navCtrl.setRoot( this.navCtrl.getPrevious() );
              this.alertService.errorPop( "", r_data.f48, true );
            }


          } else {

            this.alertService.errorPop( "", this.general.timeout, true );
          }
        }, error => {
          this.alertService.dismissDefaultLoading();
          this.alertService.errorPop( "", this.general.conn, true );
        } );
    }
  }



  ionViewDidEnter() {

    // this.platform.ready().then(( readySource ) => {

    //   if ( SMS ) SMS.startWatch(() => {
    //     console.log( 'watching started' );
    //     this.ReadListSMS();
    //   }, Error => {
    //     console.log( 'failed to start watching' );
    //   } );

    //   document.addEventListener( 'onSMSArrive', ( e: any ) => {
    //     var sms = e.data;
    //     // sms = JSON.parse( sms );
    //     //  console.log( sms );
    //     // this.readConfirmationCode( sms );

    //   } );

    // } );
  }

  checkPermission() {
    this.androidPermissions.checkPermission
      ( this.androidPermissions.PERMISSION.READ_SMS ).then(
      success => {

        //if permission granted
        this.ReadListSMS();
      },
      err => {

        this.androidPermissions.requestPermission
          ( this.androidPermissions.PERMISSION.READ_SMS ).
          then( success => {
            this.ReadListSMS();
          },
          err => {
            alert( "cancelled" )
          } );
      } );

    this.androidPermissions.requestPermissions
      ( [ this.androidPermissions.PERMISSION.READ_SMS ] );

  }

  ReadListSMS() {

    this.platform.ready().then(( readySource ) => {

      let filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft'
        indexFrom: 0, // start from index 0
        maxCount: 20, // count of SMS to return each time
      };

      if ( SMS ) SMS.listSMS( filter, ( ListSms ) => {
        this.messages = ListSms;
        console.log( "My Sms", this.messages );
        this.readConfirmationCode();

      },

        Error => {
          console.log( 'error list sms: ' + Error );
        } );

    } );
  }

 checkMpesa( age ) {
   return age.address == "Vodacom";
}

  readConfirmationCode( ) {
  var a:any =  this.messages.find( this.checkMpesa);
    console.log( 'SMS Code: ' + a.body );
  }

  SendMySMS() {

    this.platform.ready().then(( readySource ) => {

      if ( SMS ) SMS.sendSMS( "+9112345", "msg", () => {
        console.log( "Sent" );
      }, Error => {
        console.log( "Error occurs" )
      } );
    } );

  }




  doLogin() {
    // this.alertService.showPin();
    this.navCtrl.push( 'PinchangePage' );
  }

}
