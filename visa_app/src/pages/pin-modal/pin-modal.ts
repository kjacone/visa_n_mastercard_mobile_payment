import { Component } from '@angular/core';
import { Platform, IonicPage, ModalController, NavController, NavParams, ViewController, LoadingController, App } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { Storage } from '@ionic/storage';
import { LanguageProvider } from '../../providers/language/language';

@IonicPage()
@Component( {
  selector: 'page-pin-modal',
  templateUrl: 'pin-modal.html',
  } )
  
export class PinModalPage {
  template: string = "<div></div>";
  body: any;
  data: any = { };
  completed: boolean = false;
  pageTo: string = "Login";
  token: any;
  ttype: string;
  pin: string = "";

  rate: number = 0;  
  pinEntry: boolean;
  steps: number = 0;
  enteredKey: string;
  accounts: any = [];
  dataObject: any = {};
  type: string;

  one: string = "grad-pin";
  two: string = "grad-pin";
  three: string = "grad-pin";
  four: string = "grad-pin";
  final_data: any = { type: "1004", enc_pin: "" };
  encryptIsPresent = false;
  public unregisterBackButtonAction: any;
 
  customer: any;
  err: any;
  constructor(
    public navCtrl: NavController, public modalCtrl: ModalController, public platform: Platform,
    public navParams: NavParams, public loadingController: LoadingController, private storage: Storage,
    public globalVars: GlobalVarsProvider, public appCtrl: App,  public viewCtrl: ViewController, 
    public alertService: AlertServiceProvider,public clientdata:ClientdataProvider
  ) {

    this.data = navParams.get( 'data' );

 

    this.err = LanguageProvider.getLang( 'en' ).general;
  }

  playnum() {
    if ( this.pin.length == 1 ) {
      this.one = "grad-pin-active";
      this.two = "grad-pin";
      this.three = "grad-pin";
      this.four = "grad-pin";
    } else if ( this.pin.length == 2 ) {
      this.one = "grad-pin-active";
      this.two = "grad-pin-active";
      this.three = "grad-pin";
      this.four = "grad-pin";
    } else if ( this.pin.length == 3 ) {
      this.one = "grad-pin-active";
      this.two = "grad-pin-active";
      this.three = "grad-pin-active";
      this.four = "grad-pin";
    } else if ( this.pin.length == 4 ) {
      this.one = "grad-pin-active";
      this.two = "grad-pin-active";
      this.three = "grad-pin-active";
      this.four = "grad-pin-active";
      console.log( 'PIN: ' + this.pin );
      this.submit();
    } else { 
      this.one = "grad-pin";
      this.two = "grad-pin";
      this.three = "grad-pin";
      this.four = "grad-pin";
      this.pin = "";
    }
  }




  submit() {
 
    this.viewCtrl.dismiss( this.pin );
  }






  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ConfirmModal' );
  }

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  public initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.customHandleBackButton();
    }, 10 );
  }

  private customHandleBackButton(): void {
    this.viewCtrl.dismiss();
  }

  


popmeth( message ) {
  let template = "<div>" + message + "</div>";
  let obj = { body: "", template: template, ttype: "", completed: true, pageTo: '' };
  let myModal = this.modalCtrl.create( 'ConfirmModalPage', obj );
  myModal.present();
  myModal.onDidDismiss( data => {
    console.log( "Data =>" + data );
    if ( data ) {
     
    }
    else {
     
    }
  } );
}



logine() { 
   this.navCtrl.setRoot( 'WalletPage' );
}

calculate( numb ) {
  let data: boolean = false;
  if ( numb == 'del' ) {
    if ( this.pin.length == 1 ) {
      this.one = "grad-pin";
      this.two = "grad-pin";
      this.three = "grad-pin";
      this.four = "grad-pin";
      this.pin = "";
    } else {
      this.pin = this.pin.slice( 0, -1 );
      this.playnum();
    }
  } else {
    if ( this.pin.length == 4 ) {
      data = true;
      this.submit();
    } else {
      this.pin = this.pin.concat( numb );
      this.playnum();
    }
  }
  return data;
}
}
