import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';

import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-withdrawvisa',
  templateUrl: 'withdrawvisa.html'
})
export class WithdrawvisaPage {
  token: any;
  menus: string = "scan";
  accounts: any;
  jsonQR: any;
  data: any;
  body: any;
  marchantAC: string;
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
  base64Image: any;
  constructor( public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVarsProvider, public loadingController: LoadingController,
    public alertService: AlertServiceProvider, public alertCtrl: AlertController,
    public modalCtrl: ModalController , public barcodeScanner: BarcodeScanner) {
    this.accounts = this.globalVars.getAccounts();
    this.objectblock.accountfrom = this.accounts[0];
  //  this.qrScanning()
  }

  goHome() {
    this.navCtrl.setRoot( 'HomePage' );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LipamvisaPagePage');
  }




  qrScanning(){
    console.log("Scanning QR");
    let options =   {
         showTorchButton : true, // iOS and Android
         prompt : "Hold your camera on the QR code to Scan ", // Android
         resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
 disableSuccessBeep: false // iOS and Android
       };
    this.barcodeScanner.scan(options).then((barcodeData) => {
        this.validateAndProcessData(barcodeData);
      }, (err) => {
          this.alertService.error("Error Reading QR Code");
          console.log(err);
      });
  }


  validateAndProcessData(jsonQr) {
    if (jsonQr['00'] == null || jsonQr['00'] == undefined || jsonQr['00'] == "") {
     this.alertService.mytoastdown('Invalid QR code')
      this.restartScan();
    } else if (jsonQr['02'].length < 8 || jsonQr['02'].length > 16) {
     this.alertService.mytoastdown('Invalid Agent ID')
      this.restartScan();
    } else if (jsonQr['52'] == null || jsonQr['52'] == undefined || jsonQr['52'] == "") {
     this.alertService.mytoastdown('Missing Agent Category');
      this.restartScan();
    } else if (jsonQr['52'].length != 4) {
      this.alertService.mytoastdown('Invalid Agent Category');
      this.restartScan();
    } else if (jsonQr['53'] == null || jsonQr['53'] == undefined || jsonQr['53'] == "") {
      this.alertService.mytoastdown('Missing Currency');
      this.restartScan();
    } else if (this.currencyProcessor(jsonQr['53']) == 'invalid') {
      this.alertService.mytoastdown('Invalid Currency');
      this.restartScan();
    } else if (jsonQr['54'] != null && jsonQr['54'] == 0) {
      this.alertService.mytoastdown('Amount must be greater than 0')
      this.restartScan();
    } else if (jsonQr['54'] != null && !this.isNumeric(typeof jsonQr['54'])) {
     this.alertService.mytoastdown('Invalid amount')
      this.restartScan();
    }
    else {
      this.processJsonQr(jsonQr);
      this.scanned = true;
      this.scanningStatus.unsubscribe();
    }

  }

  restartScan() {
    this.navCtrl.setRoot('MvisaMainPage');
    this.navCtrl.push('LipamvisaPage')
  }

  isNumeric(n): boolean {
    let state = true;
    if (n.search(",") != -1) {
      state = false;
    }
    return state;
  }

  yesQR(qrdata) {
    let totallen = qrdata.length;
    let qrinfo = "";

    do {
      let indicator = qrdata.substring(0, 2);
      let len = qrdata.substring(2, 4);
      let values = qrdata.substring(4, parseInt(len) + 4);

      qrinfo += ",\"" + indicator + "\":\"" + values + "\"";
      qrdata = qrdata.substring(4 + parseInt(len), parseInt(totallen) + 4);
      totallen = qrdata.length;
    } while (totallen > 0);

    let json = "{" + qrinfo.substring(1) + "}";
    let jobj = JSON.parse(json);
    if (jobj['62'] != null) {
      qrdata = jobj['62'];
      totallen = qrdata.length;
      do {
        let indicator = qrdata.substring(0, 2);
        let len = qrdata.substring(2, 4);
        let values = qrdata.substring(4, parseInt(len) + 4);

        qrinfo += ",\"62." + indicator + "\":\"" + values + "\"";
        qrdata = qrdata.substring(4 + parseInt(len), parseInt(totallen) + 4);
        totallen = qrdata.length;
      } while (totallen > 0);

    }
    json = "{" + qrinfo.substring(1) + "}";
    return JSON.parse(json);
  }

  processJsonQr(jsonQr) {
    if (jsonQr['02'] != null) {
      this.objectblock.merchantID = jsonQr['02'];
      this.valueChecks.merchantID = 'yes';
    }
    if (jsonQr['59'] != null) {
      this.objectblock.merchantName = jsonQr['59'];
      this.valueChecks.merchantName = 'yes';
    }
    if (jsonQr['60'] != null) {
      this.objectblock.merchantCity = jsonQr['60'];
      this.valueChecks.merchantCity = 'yes';
    }
    if (jsonQr['62']) {
      let result: any = [];
      jsonQr['62'].split('***').forEach(function (x) {
        result.push({ fieldType: x.slice(0, 2), fieldLength: x.slice(2, 4) })
      });
      if (result[0].fieldType) {
        this.valueChecks.fieldOne = 'yes';
        this.fields.additionalFieldOne = this.getAdditionalFieldName(result[0].fieldType);
      }
      if (result[1].fieldType) {
        this.valueChecks.fieldTwo = 'yes';
        this.fields.additionalFiledTwo = this.getAdditionalFieldName(result[1].fieldType);
      }
    }
    if (jsonQr['53'] != null) {
      this.objectblock.currency = this.currencyProcessor(jsonQr['53']);
      this.valueChecks.currency = 'yes';
    }
    if (jsonQr['54'] != null) {
      this.objectblock.amount = jsonQr['54'];
      this.valueChecks.amount = 'yes';
      if (jsonQr['55'] == null) {
        this.objectblock.totalAmount = this.objectblock.amount;
      }
    }
    if (jsonQr['55'] != null) {
      if (jsonQr['55'] == '01') {
        this.valueChecks.tip = 'yes';
      } else if (jsonQr['55'] == '02') {
        this.objectblock.convenienceFlat = jsonQr['56'];
        this.valueChecks.convenienceFlat = 'yes';
        if (jsonQr['54'] != null) {
          this.objectblock.totalAmount = +jsonQr['54'] + +jsonQr['56'];
        } else {
          this.objectblock.totalAmount = jsonQr['56'];
        }
      } else if (jsonQr['55'] == '03') {
        this.objectblock.conveniencePercent = jsonQr['57'];
        this.valueChecks.conveniencePercent = 'yes';
        if (jsonQr['54'] != null) {
          this.objectblock.totalAmount = +jsonQr['54'] + +jsonQr['57'] / 100 * jsonQr['54'];
        } else {
          this.objectblock.totalAmount = 0;
        }
      }
    }
  }

  getAdditionalFieldName(typeCode) {
    let fieldName = '';
    if (typeCode == '01') {
      fieldName = 'Bill Number';
    } else if (typeCode == '02') {
      fieldName = 'Mobile Number';
    } else if (typeCode == '03') {
      fieldName = 'Store ID'
    } else if (fieldName == '04') {
      fieldName = 'Loyalty Number';
    } else if (typeCode == '05') {
      fieldName = 'Reference ID';
    } else if (typeCode == '06') {
      fieldName = 'Consumer ID';
    } else if (typeCode == '07') {
      fieldName = 'Terminal ID';
    } else if (typeCode == '08') {
      fieldName = 'Purpose ID';
    } else if (typeCode == '09') {
      fieldName = 'Additional Consumer Data';
    } else {
      fieldName = 'Reference ID';
    }
    return fieldName;
  }

  currencyProcessor(currencyCode) {
    let currency = "";
    console.log(currencyCode)
    switch (currencyCode) {
      case ('404'):
        currency = "KES";
        break;
      case ('998'):
        currency = "USD";
        break;
      case ('997'):
        currency = "USD";
        break;
      case ('800'):
        currency = "UGX";
        break;
      case ('826'):
        currency = "GBP";
        break;
      case ('834'):
        currency = "TZS";
        break;
      default:
        currency = "USD";
        break;
    }
    return currency;
  }

  updateAmount() {
    if (this.objectblock.conveniencePercent != null) {
      this.objectblock.totalAmount = +this.objectblock.amount + +this.objectblock.conveniencePercent / 100 * this.objectblock.amount;
    } else if (this.objectblock.convenienceFlat != null) {
      this.objectblock.totalAmount = +this.objectblock.amount + +this.objectblock.convenienceFlat;
    } else if (this.objectblock.tip != "") {
      this.objectblock.totalAmount = +this.objectblock.amount + +this.objectblock.tip
    }

    if (this.valueChecks.amount != 'yes') {
      console.log('I am here');
      this.objectblock.totalAmount = this.objectblock.amount;
    }
  }

  getRandom() {
    let min = 100000;
    let max = 999999;
    let first = Math.floor(Math.random() * (max - min + 1)) + min;
    let second = Math.floor(Math.random() * (max - min + 1)) + min;
    return "M" + first + "N" + second + "B";
  }

  checkRecepeint(recepient) {
    if (recepient == 'my') {
      this.objectblock.accountto = this.globalVars.getUsername();
    }
    else {
      this.objectblock.accountto = "";
    }
  }

  submit(objectblock) {
    if (objectblock.merchantID == "" || objectblock.merchantID == undefined) {
      let template = "<div>Kindly enter a valid Merchant ID</div>";
      this.alertService.popUp( this.body, template );
    } else if (objectblock.amount == "" || objectblock.amount == undefined) {
      let template = "<div>Kindly enter amount</div>";
      this.alertService.popUp( this.body, template );
    } else {
      this.makeMerchantLookUpRequest()
    }
  }
  requestBody(field100) {

  }

  requestLookUpBody(field65, field100) {

  }

  someTest() {
    let obj = {
      template: this.template,
      completed: false,
      pageTo: '',
      pageType: 'confirmation',
      confirmType: 'withdraw',
      data: {
        merchantName: 'Voricles Outlet',
        merchantLocation: 'Kampla',
        amount: this.objectblock.amount,
        merchantID: this.objectblock.merchantID,
        virtualPan: '4783746464'
      }
    };
    console.log(this.virtualPan)
    this.marchantAC = '84677464644';
    let myModal = this.modalCtrl.create('VisaSuccessPage', obj);
    myModal.present();
    myModal.onDidDismiss(data => {
      let obj = {
        template: this.template,
        completed: false,
        pageTo: '',
        pageType: 'receipt',
        confirmType: 'withdraw',
        data: {
          merchantName: 'Voricles Outlet',
          merchantLocation: 'Kampala',
          amount: this.objectblock.amount,
          // date: this.globalVars.getDate('24'),
          ref: '467464666'
        }
      };
      let myModal = this.modalCtrl.create('VisaSuccessPage', obj);
      myModal.present();
    })
  }

  makeMerchantLookUpRequest() {

  }


  resetParameters(array): void {
    for (let obj in array) {
      this.valueChecks[obj] = 'test'
      console.log(this.valueChecks)
    }
  }

  some() {
    this.resetParameters(this.valueChecks);
    this.resetParameters(this.objectblock);
  }
}
