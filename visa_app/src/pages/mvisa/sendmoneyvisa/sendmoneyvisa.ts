import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';

import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-sendmoneyvisa',
  templateUrl: 'sendmoneyvisa.html'
})
export class SendmoneyvisaPage {
  token: any;
  menus: string = "scan";
  accounts: any;
  jsonQR: any;
  data: any;
  recipientAC: string;
  charges: number = 0;
  objectblock: any = {};
  template: any;
  receipientType: string = 'till';
  scanningStatus: any;
  scanned: boolean = false;
  valueChecks: any = {
    merchantID: "",
    merchantName: "",
    merchantCity: "",
    currency: "",
    amount: "",
    tip: "",
    convenienceFlat: "",
    conveniencePercent: "",
    referenceNo: "",
    fieldOne: "",
    fieldTwo: ""
  };
  fields: any = {
    additionalFieldOne: "",
    additionalFiledTwo: ""
  };
  field72: string;
  field25: string;
  virtualPan: string = "";
  favourites: any;
  pickedFromFav: boolean = false;
  pickedFav: any;
  sendChoice: string = "normal";
  body: any;
  countries: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVarsProvider, public loadingController: LoadingController,
    public alertService: AlertServiceProvider, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public camera: Camera ) {
    
    this.objectblock.accountfrom = this.globalVars.getUsername();
    this.countries = this.getVisaCountries();
    this.objectblock.country = this.countries[0].code;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendmoneyvisaPagePage');
  }
  goHome() {
    this.navCtrl.setRoot( 'HomePage' );
  } 

  submit(objectblock) {
    if (objectblock.pan == "" || objectblock.pan == undefined) {
      let template = "<div>Kindly enter a valid mobile number</div>";
      this.alertService.popUp( this.body, template );
    }
    else if (objectblock.amount == "" || objectblock.amount == undefined) {
      let template = "<div>Kindly enter amount</div>";
      let obj = { template: template, completed: true, pageTo: '' };
      this.alertService.popUp( this.body, template );
    } else {
      this.makeMerchantLookUpRequest()
    }
  }

  getRandom() {
    let min = 100000;
    let max = 999999;
    let first = Math.floor(Math.random() * (max - min + 1)) + min;
    let second = Math.floor(Math.random() * (max - min + 1)) + min;
    return "M" + first + "N" + second + "B";
  }

  getFavourites() {
   
  }

  useFavourite(favourite) {
    this.objectblock.pan = favourite;
    this.sendChoice = 'normal';
    this.pickedFromFav = true;
    this.pickedFav = favourite;
  }

  requestLookUpBody(field65, field100) {
  //   let alias = this.objectblock.country + field65.substr(field65.length - 9)
  //   console.log(alias)
  //   this.token = this.globalVars.createToken();
  //   let body = JSON.stringify({
  //     esbRequest: {
  //       f0: "0200",
  //       f3: "130200",
  //       data: {
  //         0: '0200',
  //         2: this.globalVars.getUsername(),
  //         3: "320000",
  //         4: '0',
  //         7: this.globalVars.getDate("7"),
  //         25: "MVISA_P2P_FT",
  //         11: this.token.field11,
  //         32: "NMBAPP",
  //         37: this.token.field37,
  //         65: alias,
  //         100: field100
  //       }
  //     },
  //     mnoSession: this.globalVars.mnoSession()
  //   });
  //   return this.globalVars.getEncryptedVars(body);
  }

  makeMerchantLookUpRequest(): void {
  //   if (this.connectivityService.isOnline()) {
  //     let loader = this.loadingController.create({ content: 'Please wait...' });
  //     loader.present();
  //     let body = this.requestLookUpBody(this.objectblock.pan, 'MVISA_ALIASINQ');
  //     let header = this.token;
  //     this.apiConnect.load(body, header).then(data => {
  //       loader.dismiss();
  //       this.data = data;
  //       console.log(this.globalVars.getDecryptedVars(this.data.data))
  //       if (this.data.error == "") {
  //         let resp = this.globalVars.getDecryptedVars(this.data.data);
  //         console.log(resp);
  //         this.field72 = resp.field48;
  //         if (resp.field39 == '00') {
  //           let result: any = {};
  //           resp.field48.split('|').forEach(function (x) {
  //             x.split('~').forEach(function (y) {
  //               let arr = y.split('=');
  //               arr[1] && (result[arr[0]] = arr[1]);
  //             });
  //           });
  //           this.virtualPan = result.VIRTUALPAN;
  //           this.field25 = result.FTTYPE;
  //           if (result.CUSTOMERTYPE == "CONSUMER") {
  //             this.lookupIsConsumer(result);
  //           } else {
  //             this.globalVars.iNotifyMessage("This type of transaction is not permitted")
  //           }

  //         } else if (resp.field39 == '26') {
  //           let template = "<div>Reciepient with that number does not exist</div>";
  //           let obj = { body: '', template: template, completed: true, pageTo: '' };
  //           this.globalVars.initializeModal(obj).present();
  //         } else {
  //           let template = "<div>Error occurred. Please try again later</div>";
  //           let obj = { body: '', template: template, completed: true, pageTo: '' };
  //           this.globalVars.initializeModal(obj).present();
  //         }
  //       }
  //       else {

  //       }

  //     });
  //   }
  //   else {
  //     this.toast.show("Please connect to the internet", '8000', 'bottom').subscribe(
  //       toast => {
  //         console.log(toast);
  //       });
  //   }
  }

  lookupIsConsumer(result) {
  //   let obj = {
  //     template: this.template,
  //     completed: false,
  //     pageTo: '',
  //     pageType: 'confirmation',
  //     confirmType: 'p2p',
  //     data: {
  //       merchantName: result.FIRSTNAME + ' ' + result.LASTNAME,
  //       merchantLocation: result.CITY,
  //       amount: this.objectblock.amount,
  //       merchantID: result.ALIAS,
  //       virtualPan: this.virtualPan
  //     }
  //   };
  //   this.recipientAC = result.ACCOUNTNUMBER;
  //   let myModal = this.modalCtrl.create('VisaSuccessPage', obj);
  //   myModal.present();
  //   myModal.onDidDismiss(data => {
  //     console.log("Data =>" + data);
  //     if (data) {
  //       if (this.connectivityService.isOnline()) {
  //         let loader = this.loadingController.create({ content: 'Please wait...' });
  //         loader.present();
  //         let body = this.requestBody('MVISA_P2P_FT');
  //         let header = this.token;
  //         this.apiConnect.load(body, header).then(data => {
  //           loader.dismiss();
  //           this.data = data;
  //           if (this.data.error == "") {
  //             let resp = this.globalVars.getDecryptedVars(this.data.data);
  //             console.log(resp);
  //             if (resp.field39 == '00') {
  //               let obj = {
  //                 template: this.template,
  //                 completed: false,
  //                 pageTo: '',
  //                 pageType: 'receipt',
  //                 confirmType: 'p2p',
  //                 data: {
  //                   merchantName: result.FIRSTNAME + ' ' + result.LASTNAME,
  //                   merchantLocation: result.CITY,
  //                   amount: this.objectblock.amount,
  //                   date: this.globalVars.getDate('24'),
  //                   merchantID: result.ALIAS,
  //                   ref: resp.field120
  //                 }
  //               };
  //               let myModal = this.modalCtrl.create('VisaSuccessPage', obj);
  //               myModal.present();
  //               myModal.onDidDismiss(data => {
  //                 if (this.objectblock.save) {
  //                   this.globalVars.saveVisaBeneficiary('MVISA_FAV', this.objectblock.pan, obj.data.merchantName).then(data => {
  //                     console.log('I am here already')
  //                   })
  //                 }
  //               })

  //             } else {
  //               let template = "<div>Error occurred. Please try again later</div>";
  //               let obj = { body: '', template: template, completed: true, pageTo: '' };
  //               this.globalVars.initializeModal(obj).present();
  //             }
  //           }
  //           else {

  //           }

  //         });
  //       }
  //       else {
  //         this.toast.show("Please connect to the internet", '8000', 'bottom').subscribe(
  //           toast => {
  //             console.log(toast);
  //           });
  //       }
  //     }
  //   });
  }

  getVisaP2PSuccess(obj: any): void {
  //   let myModal = this.modalCtrl.create('VisaSuccessPage', obj);
  //   myModal.present();
  //   this.navCtrl.setRoot('MvisaMainPage');
  }

  requestBody(field100: string) {
  //   this.token = this.globalVars.createToken();
  //   let body = JSON.stringify({
  //     esbRequest: {
  //       f0: "0200",
  //       f3: "130200",
  //       data: {
  //         0: '0200',
  //         2: this.globalVars.getUsername(),
  //         3: "400000",
  //         4: this.objectblock.amount,
  //         7: this.globalVars.getDate("7"),
  //         11: this.token.field11,
  //         25: this.field25,
  //         32: "NMBAPP",
  //         37: this.token.field37,
  //         65: this.globalVars.getScanToPayCustomerDetails().VIRTUALPAN,
  //         70: this.globalVars.getUsername(),
  //         71: this.virtualPan,
  //         72: this.field72,
  //         88: "@101@",
  //         100: field100,
  //         102: this.objectblock.accountfrom,
  //         103: this.recipientAC,
  //         NOFLEXRESPONSE: ''
  //       }
  //     },
  //     mnoSession: this.globalVars.mnoSession(),
  //   });
  //   return this.globalVars.getEncryptedVars(body);
  }

  getVisaCountries(): any {
    return [
      {
        name: "Tanzania",
        code: "255"
      },
      {
        name: "Kenya",
        code: "254"
      },
      {
        name: "Uganda",
        code: "256"
      },
      {
        name: "Somalia",
        code: "252"
      },
      {
        name: "Rwanda",
        code: "250"
      },
      {
        name: "Burundi",
        code: "257"
      },
      {
        name: "South Sudan",
        code: "211"
      }
    ]
  }
}
