import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';

/**
 * Generated class for the ScanQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {
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
  present: any = [];
  show = false;
  data = { type: "transact", mobile: "", biller_acc: "", amount: "", card: "", name: "", biller_name: "", image: "" }
  selectionType: string = "scan";
  country: string = "255";
  username: string = "(+255)0734915281";
  accounts = [ "0724727999", "23434827283" ];
  result = [];

  // styro = "drinkcard-click";
  constructor( public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVarsProvider, public barcodeScanner: BarcodeScanner,
    public alertService: AlertServiceProvider ) {
    // let data = navParams.get( 'data' );
    // this.title = data.name;
    // this.data.biller_name = data.name;
    this.country = globalVars.country;
    this.checker();

  }

  checker() {
    if ( this.selectionType == "enter" ) {
      this.data.biller_acc = "";
    } else {
      this.data.biller_acc = "Scan Account";
    }
  }






  continue( data: any ) {

    this.data.amount = data.amount;
    this.data.name = data.id;
    this.data.biller_name = data.name;
    this.navCtrl.push( 'PayauthPage', { data: this.data } );


  }

  scanqr() {
    this.barcodeScanner.scan().then( barcodeData => {
      console.log( 'QRcode data', barcodeData );
      this.data.biller_acc = barcodeData.text;
      // this.alertService.errorPop("",barcodeData.text,true );

    } ).catch( err => {
      console.log( 'Error', err );
      this.alertService.errorPop( "", err, true );
    } );
  }

  paySel( str: string ) {
    if ( this.payChoice === "" ) {
      this.pc = false;
    } else {
      this.payChoice = str;
      this.pc = true;
    }
  }

  openPage( page ) {
    this.navCtrl.push( page );
  }

  goHome() {
    this.navCtrl.setRoot( 'WalletPage' );
  }

  ionViewDidEnter() {
    // this.globalVars.reload();

  }
  submit() {
    // this.navCtrl.setRoot( 'ThirdPage' );
  }

  proceed() {
    if ( this.data.biller_acc == "" || this.data.biller_acc == undefined ) {
      this.alertService.errorPop( "", "Enter or scan your Account Number", true );
    } else {
      this.pay = true;
      let pre = '{"customerNumber":"27949888","packages":[{"amount":"19000","name":"DStv Access Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":"ACSSE36"},{"amount":"69000","name":"DStv Compact Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" COMPE36"},{"amount":"39000","name":"DStv Family Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" COFAME36"},{"amount":"60100","name":"DStv Asian Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" ASIAE36"},{"amount":"169000","name":"DStv Premium E/Afr E36","icon":"+  ","show":false,"currency":"TZS","id":" PREE36"},{"amount":"122500","name":"DStv Bue - Portuguese Add-on Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" PORBDDE36"},{"amount":"210050","name":"DStv Premium E/Afr + Asian Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" PREASIE36"},{"amount":"259000","name":"DStv Premium E/Afr + French Bonus E36","icon":"+  ","show":false,"currency":"TZS","id":" PREFRNSE36"},{"amount":"109000","name":"DStv Compact Plus Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" COMPLE36"},{"amount":"26500","name":"DStv HDPVR Access Service E36","icon":"+  ","show":false,"currency":"TZS","id":" HDPVRE36"},{"amount":"0","name":"DStv Demo Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" DEMOE36"},{"amount":"46000","name":"DStv French 11 Add-on Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" FRN11E36"},{"amount":"88000","name":"DStv French Plus Add-on Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" FRN15E36"},{"amount":"0","name":"Box Office","icon":"+  ","show":false,"currency":"TZS","id":" BOXOFFICE"},{"amount":"0","name":"DStv Education High Definition Access Service E36","icon":"+  ","show":false,"currency":"TZS","id":" EDHDPVRE36"},{"amount":"0","name":"DStv FreeView Public Broadcaster E36","icon":"+  ","show":false,"currency":"TZS","id":" FRUBE36"},{"amount":"0","name":"DStv TANZANIA FTA Commercial Add-on E36","icon":"+  ","show":false,"currency":"TZS","id":" TANZE36 - Tanzania  Free to Air E36"},{"amount":"71500","name":"DStv Asian Add-on Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" ASIADDE36"},{"amount":"15600","name":"DStv French Touch Add-on Bouquet E36","icon":"+  ","show":false,"currency":"TZS","id":" FRN7E36"}]}';
      var res = JSON.parse( pre );
      // console.log( res )
      this.present = res.packages;
    }



  }
  showObject( obj: any ) {
    for ( var p in obj ) {
      if ( obj.hasOwnProperty( p ) ) {
        // result += p + " , " + obj[ p ] + "\n";
        this.result.push( p + " : " + obj[ p ] );
      }
    }

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



}
