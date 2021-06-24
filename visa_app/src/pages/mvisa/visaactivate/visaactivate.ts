import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';


@IonicPage()
@Component({
  selector: 'page-visaactivate',
  templateUrl: 'visaactivate.html',
})
export class VisaactivatePage {
  error: number = 0;
  accounts: any = [];
  objectblock: any = {};
  data: any;
  body: any;
  mobileno: any;
  token: any;
  pageState:string='normal';

  constructor( public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    public alertService: AlertServiceProvider ) {
    
    this.accounts = this.globalVars.getAccounts();
    this.objectblock.accountfrom = this.accounts[ 0 ];

    this.mobileno = globalVars.getUsername();
    this.objectblock.mobileNumber = globalVars.getUsername();
    if ( this.navParams.get( 'state' ) != undefined ) {
      this.pageState = this.navParams.get( 'state' );
    }
    console.log( this.navParams.get( 'state' ) )
     }
  

  goHome() {
    this.navCtrl.setRoot( 'HomePage' );
  } 
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisaactivatePage');
  }


  notification() {
    let template = "<div>Kindly select an account</div>";
    this.alertService.popUp( this.body, template );
  }

  test1(){
    let obj = {
      template: '',
      completed: false,
      pageTo: '',
      pageType: 'notification',
    };
    let myModal = this.modalCtrl.create('VisaSuccessPage', obj);
    myModal.present();
  }
  submit(objectblock) {
    if (objectblock.accountfrom == "" || objectblock.accountfrom == undefined) {
      let template = "<div>Kindly select an account</div>";
      this.alertService.popUp( this.body, template );
    } else if (objectblock.mobileNumber == "" || objectblock.mobileNumber == undefined) {
      let template = "<div>Kindly select mobile number</div>";
      this.alertService.popUp( this.body, template );
    } else {
      let template = "<div>By comfirming, you give consent to the bank to provide your basic info like name and mobile number to the sender for verification " +
        "purpose when receiving funds to your selected bank account using your mobile number.<br><br>This will also replace any existing bank account you have selected " +
        "to receive funds on this mobile number (" + objectblock.mobileNumber + ")</div>";
      let obj = {template: template, completed: false, pageTo: '', pageType: 'notification'};
      let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
      myModal.present();
      myModal.onDidDismiss(data => {
        if (data) {
          this.makeRequest('MVISA_CUST_REG');
        }
        else {

        }
      })
    }
  }

  requestBody(objectblock, field100) {
    this.token = this.globalVars.createToken();
    let body = JSON.stringify({
      esbRequest: {
        f0: "0200",
        f3: "130200",
        data: {
        
        }
      },
      // mnoSession: this.globalVars.mnoSession()
    });
    return this.globalVars.getEncryptedVars(body);
  }


  makeRequest(field100) {
   
    this.updateScanToPay( this.objectblock.accountfrom );
    // let obj = {
    //   template: '',
    //   completed: false,
    //   pageTo: '',
    //   pageType: 'notification',
    //   account: this.objectblock.accountfrom,
    //   pan: this.objectblock.accountfrom
    // };
    // let myModal = this.modalCtrl.create( 'VisaSuccessPage', obj );
    // myModal.present(); 
  }

  updateScanToPay(account) {
    let body = JSON.stringify({
      esbRequest: {
        f0: "0200",
        f2: this.globalVars.getUsername(),
        f3: "120200",
        data: {
          // 37: this.token.field37,
          MVISA_ONBOARDED: '1',
          MVISA_PRIMARY_ACCOUNT: account
        }
      },
      // mnoSession: this.globalVars.mnoSession()
    });
    this.navCtrl.setRoot( 'MvisaMainPage' );
  }
}
