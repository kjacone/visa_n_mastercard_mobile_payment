import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
declare let qrcode;
@IonicPage()
@Component({
  selector: 'page-lipamvisa',
  templateUrl: 'lipamvisa.html'
})
export class LipamvisaPage {
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
    merchantID: false,
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
  field71: string;
  field72: string;
  field25: string;
  base64Image: any;

  constructor( public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner,
    public globalVars: GlobalVarsProvider, public loadingController: LoadingController,private camera:Camera,
    public alertService: AlertServiceProvider, public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    // this.qrScanning();
    this.accounts = this.globalVars.getAccounts();
    this.objectblock.accountfrom = this.accounts[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LipamvisaPagePage');
  }
  goHome() {
    this.navCtrl.setRoot( 'HomePage' );
  }
  scanningMenu(activeMenu: string): void {
    this.menus = activeMenu;

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
      let barcodeResponse = JSON.parse(barcodeData.text);
     this.validateAndProcessData(barcodeResponse);
      }, (err) => {
          this.alertService.error("Error Reading QR Code");
          console.log(err);
      });

  }

  validateAndProcessData(jsonQr: any): void {
    if (jsonQr['00'] == null || jsonQr['00'] == undefined || jsonQr['00'] == "") {
     this.alertService.mytoastdown('Invalid QR code')
      this.restartScan();
    } else if (jsonQr['02'].length < 8 || jsonQr['02'].length > 16) {
     this.alertService.mytoastdown('Invalid Merchant ID')
      this.restartScan();
    } else if (jsonQr['52'] == null || jsonQr['52'] == undefined || jsonQr['52'] == "") {
     this.alertService.mytoastdown('Missing Merchant Category');
      this.restartScan();
    } else if (jsonQr['52'].length != 4) {
     this.alertService.mytoastdown('Invalid Merchant Category');
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

  restartScan(): void {
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

  yesQR(qrdata: any): any {
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

  processJsonQr(jsonQr: any): void {
    if (jsonQr['02'] != null) {
      this.objectblock.merchantID = jsonQr['02'];
      this.valueChecks.merchantID = true;
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

  getAdditionalFieldName(typeCode: string): string {
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

  currencyProcessor(currencyCode: any): string {
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
        currency = "invalid";
        break;
    }
    return currency;
  }

  updateAmount(): void {
    if (this.objectblock.conveniencePercent != null) {
      this.objectblock.totalAmount = +this.objectblock.amount + +this.objectblock.conveniencePercent / 100 * this.objectblock.amount;
    } else if (this.objectblock.convenienceFlat != null) {
      this.objectblock.totalAmount = +this.objectblock.amount + +this.objectblock.convenienceFlat;
    } else if (this.objectblock.tip != "") {
      this.objectblock.totalAmount = +this.objectblock.amount + +this.objectblock.tip
    }

    if (this.valueChecks.amount != 'yes') {
      this.objectblock.totalAmount = this.objectblock.amount;
    }
  }

  submit(objectblock: any): void {
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

  getRandom(): string {
    let min = 100000;
    let max = 999999;
    let first = Math.floor(Math.random() * (max - min + 1)) + min;
    let second = Math.floor(Math.random() * (max - min + 1)) + min;
    return "M" + first + "N" + second + "B";
  }

  checkRecepeint(recepient: string): void {
    if (recepient == 'my') {
      this.objectblock.accountto = this.globalVars.getUsername();
    }
    else {
      this.objectblock.accountto = "";
    }
  }

  openPage(page: string): void {
    this.navCtrl.setRoot(page)
  }

  requestBody(field100: string) {
  //   this.token = this.globalVars.createToken();
  //   console.log(this.field71)
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
  //         71: this.field71,
  //         72: this.field72,
  //         100: field100,
  //         102: this.objectblock.accountfrom,
  //         103: this.marchantAC,
  //         NOFLEXRESPONSE: ''
  //       }
  //     },
  //     mnoSession: this.globalVars.mnoSession(),
  //   });
  //   return this.globalVars.getEncryptedVars(body);
  }

  requestLookUpBody(field65: string, field100: string) {
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
  //         11: this.token.field11,
  //         25: "MVISA_MERCHANT_PAY",
  //         32: "NMBAPP",
  //         37: this.token.field37,
  //         65: field65,
  //         100: field100
  //       }
  //     },
  //     mnoSession: this.globalVars.mnoSession()
  //   });
  //   return this.globalVars.getEncryptedVars(body);
  }

  makeMerchantLookUpRequest() {
    //   if (this.connectivityService.isOnline()) {
    //     let loader = this.loadingController.create({ content: 'Please wait...' });
    //     loader.present();
    //     let body = this.requestLookUpBody(this.objectblock.merchantID, 'MVISA_ALIASINQ');
    //     let header = this.token;
    //     this.apiConnect.load(body, header).then(data => {
    //       loader.dismiss();
    //       this.data = data;
    //       if (this.data.error == "") {
    //         let resp = this.globalVars.getDecryptedVars(this.data.data);
    //         this.field72 = resp.field48;
    //         if (resp.field39 == '00') {
    //           let result: any = {};
    //           resp.field48.split('|').forEach(function (x) {
    //             x.split('~').forEach(function (y) {
    //               let arr = y.split('=');
    //               arr[1] && (result[arr[0]] = arr[1]);
    //             });
    //           });
    //           this.field25 = result.FTTYPE;
    //           if (result.CUSTOMERTYPE == 'MERCHANT') {
    //             this.lookupIsMerchant(result);
    //           } else {
    //            this.alertService.mytoastdown("This transaction is not permitted")
    //           }
    //         } else if (resp.field39 == '26') {
    //          this.alertService.mytoastdown("Merchant does not exist");
    //         } else {
    //          this.alertService.mytoastdown("Error occurred. Please try again later");
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
  }


  lookupIsMerchant(result: any): void {
    this.navCtrl.setRoot( 'MvisaMainPage' );
  }

  readQRfromGallery(imageURI: string): any {
    return new Promise(function (resolve) {
      decodeImageFromBase64(imageURI, function (decodedInformation) {
        resolve(decodedInformation)
      });
    });
    function decodeImageFromBase64(data, callback) {
      qrcode.callback = callback;
      qrcode.decode(data);
    }
  }

  accessGallery(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.readQRfromGallery(this.base64Image).then(data => {
        this.resetParameters(this.valueChecks);
        this.resetParameters(this.objectblock);
        if (data == 'invalidQR' || data == 'invalidImage') {
         this.alertService.mytoastdown('Invalid QR code. Please ensure you select a valid QR Code');
        } else {
          this.processJsonQr(this.yesQR(data));
          this.scanned = true;
        }
      });
    }, (err) => {
     this.alertService.mytoastdown('Error occurred. Please try again')
    });
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
