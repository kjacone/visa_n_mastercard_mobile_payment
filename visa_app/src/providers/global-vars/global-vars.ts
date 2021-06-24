import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import CryptoJS from 'crypto-js';
import { Network } from '@ionic-native/network';
import { AlertServiceProvider } from '../alert-service/alert-service';
import { Storage } from '@ionic/storage';

/*

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
//
import CryptoJS from 'crypto-js';

//import { Keyboard } from '@ionic-native/keyboard';
import { Contacts, ContactFieldType, ContactFindOptions } from 'ionic-native';



//import JString from 'jstring';
*/




@Injectable()
export class GlobalVarsProvider {


  lock: boolean;
  branches: any = [];
  loan_products: any = [];
  loan_accounts: any = [];
  loan_accounts_numbers: any = [];
  orbitr_accounts: any = [];
  orbitr_accounts_numbers: any = [];
  customer_names: any = "Jacone Keya";
  fixed_accounts: any = [];
  fixed_accounts_numbers: any = [];
  wallet_accounts: any = [];
  wallet_accounts_numbers: any = [];
  schools: any = [];
  accounts:any =[];
  loans: any = [];
  partial: boolean;
  uuid: string = "";
  billers: any = [];
  is_first_login: boolean;
  Username: string = "";
  country: string = "255";
  email: string = "";
  id: string = "";
  token: string = "";
  idleState = 'Not started.';
  timedOut = false;
  min: any;
  sec: any;
  Contact: any;
  cards: any = [];
  country_code: string = '254';
  key: string = '1234567891234567';
  SIMinfo: any = {};
  deviceInfo: any = {};
  mobileNo: string;
  customername: string = "Unregistered User";
  constructor( private storage: Storage, public http: HttpClient,  private network: Network, public alertService: AlertServiceProvider) {
    console.log('Hello GlobalVarsProvider Provider');
  }

  trimPhome( phon ) {
    phon = phon.replace( /\s/g, "" );
    var lastnine = phon.substr( phon.length - 9 );
    console.log( lastnine, phon );
    return "255"+lastnine;
  }

  createToken() {
    return "";
  }

  setUsername(value) {
    this.mobileNo = value;
  }

  getUsername() {
    return this.mobileNo;
  }
  getHashPass( mobile:any,pin:any ) {
    let user = this.trimPhome( mobile );
    let words = CryptoJS.enc.Utf8.parse( user + pin );
    let base64 = CryptoJS.enc.Base64.stringify( words );
    let hashPass = CryptoJS.HmacSHA512( base64, "madengele" ).toString( CryptoJS.enc.Hex );

    return hashPass;
  }
  logger( title, msg: any ) {
    if ( title != 'ex' )
      console.log( "*********MOBILE_APP_LOGZ: \n", title + "  : " + msg );
    else
      console.error( "*********MOBILE_APP_ERROR: \n", msg );

  }
getEncryptedVars(bodies){
  return bodies;
}
  getAccounts() {
    return this.accounts;
  }

  saveUser( use ) {
    this.mobileNo = use;
    let encrypted = this.testenc( use );
    this.storage.set( 'visa', encrypted );
  }
  public testenc( stri ) {
    var iv = CryptoJS.lib.WordArray.random( 128 / 16 );
    var encrypted = CryptoJS.AES.encrypt(
      stri,
      CryptoJS.enc.Utf8.parse( this.key ),
      { iv: CryptoJS.enc.Utf8.parse( iv ) } );

    // var r1 = encrypted.ciphertext.toString(); // def44f8822cfb3f317a3c5b67182b437
    var crypttext = CryptoJS.enc.Base64.stringify( encrypted.ciphertext )
    var crypttextIV = iv + crypttext;
    var data = btoa( crypttextIV );
    console.log( data );
    return data;
  }
  public  testdec( data ) {

    var rawData = atob( data );
    var iv = rawData.substring( 0, 16 );
    var crypttext = rawData.substring( 16 );
    var decrypted = CryptoJS.AES.decrypt(
      crypttext,
      CryptoJS.enc.Utf8.parse( this.key ),
      { iv: CryptoJS.enc.Utf8.parse( iv ) } )

    console.log( CryptoJS.enc.Latin1.stringify( decrypted ) );
    return CryptoJS.enc.Latin1.stringify( decrypted );

  }


  checkInternet() {
    var rep = false;
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log( 'network was disconnected :-(' );
      this.alertService.noConnection( 'No internet connection check you connection and try again' );
    } );

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log( 'network connected!' );
      // this.clientdata.getAll();
      setTimeout(() => {
        console.log( 'system timeout' );
      }, 3000 );
    } );
    console.log( 'disconnect:', disconnectSubscription );
    console.log( 'connect:', connectSubscription );
  }


  cleanDigit( numb ) {
    var ni = numb.match( /^[0-9]+$/ );
    ni = Number( ni );
    if ( ni === 0 ) { ni = 'zero'; }
    return ni.toString();
  }


}
