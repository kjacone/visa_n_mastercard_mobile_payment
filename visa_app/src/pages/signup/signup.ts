import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, Platform, NavController, ModalController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { ValidatorProvider } from '../../providers/validator/validator';
import { LanguageProvider } from '../../providers/language/language';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component( {
  selector: 'page-signup',
  templateUrl: 'signup.html'
} )
export class SignupPage {

  formatedValue:any = "";
  firstPart: any = "";
  secondPart: any = "";
  thirdPart: any = "";

 data: FormGroup;
  general: any = {};
  lang: any = {};
  error: number = 0;

  card_number: any = "";
  public unregisterBackButtonAction: any;

  constructor(public iab:InAppBrowser ,public platform: Platform, private formBuilder: FormBuilder, public navCtrl: NavController, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider,
     public modalCtrl: ModalController, public clientdata: ClientdataProvider ) {
    this.lang = LanguageProvider.getLang( 'en' ).signup;
    this.general = LanguageProvider.getLang( 'en' ).general;
    this.validate();

  }




  validate() {
    this.data = this.formBuilder.group( {
        cardType: [ '', ],
      firstName: [ '', Validators.compose( [ Validators.maxLength( 16 ), Validators.pattern( '[a-zA-Z ]*' ), Validators.required ] ) ],
      lastName: [ '', Validators.compose( [ Validators.maxLength( 16 ), Validators.pattern( '[a-zA-Z ]*' ), Validators.required ] ) ],
      number: [ '', [ ValidatorProvider.creditCardValidator ] ],
      expiry: [ '', Validators.compose( [ Validators.maxLength( 6 ), Validators.pattern( '[0-9]*' ), Validators.required ] ) ],
      cvc: [ '', Validators.compose( [ Validators.maxLength( 3 ), Validators.pattern( '[0-9]*' ), Validators.required ] ) ],
      email: [ '', Validators.compose( [ Validators.required, Validators.pattern( '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$' ), Validators.minLength( 1 ) ] ) ],
      administrativeArea: [ '', ],
      address1: [ '', ],
      address2: [ '' ],
      locality: [ '', Validators.compose( [ Validators.maxLength( 16 ), Validators.pattern( '[a-zA-Z ]*' ), Validators.required ] ) ],
      postalCode: [ '', Validators.compose( [ Validators.maxLength( 16 ), Validators.pattern( '[0-9]*' ), Validators.required ] ) ],
      country: [ '', Validators.compose( [ Validators.maxLength( 16 ), Validators.pattern( '[a-zA-Z ]*' ), Validators.required ] ) ],
    } );
  }
  setNumber() {
    // this.data.mobile = "";
    // this.data.mobile = "(+" + this.data.country + ")0";
  }


  reg() {
    this.globalVars.logger( "reg_data", JSON.stringify( this.data.value ) );
    this.submit();
  }

  getOTP(data) {
  // let message = "";
  //  let template = "<div>" + message + "</div>";
  // let final_url = "https://eximiousdev.ngrok.io/visa_api/auth3ds.jsp?"+"url="+(data.acsUrl).replaceAll("&","~").replaceAll("=","_")+"&PaReq="+(data.pareq).replaceAll("&","~").replaceAll("=","_")+"&xid="+(data.xid).replaceAll("&","~").replaceAll("=","_");
let term_url ="https://eximiousdev.ngrok.io/visa_api/auth3ds.jsp";
const pageContent = '<html><head></head><body><form name="redirect" id="redirect" action="' + data.acsUrl + '" method="post">' +
        '<input type="hidden" name="PaReq" value="' + data.pareq + '">' +
        '<input type="hidden" name="TermUrl" value="' + term_url + '">' +
        '<input type="hidden" name="MD" value="' + data.xid + '">' +
        '</form> <script type="text/javascript">document.getElementById("redirect").submit();</script></body></html>';
      console.log('pageContent: ', pageContent);
      const pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

      const browserRef = this.iab.create(
        pageContentUrl ,
        '_blank',
        'hidden=no,location=no,clearsessioncache=yes,clearcache=yes'
      );



// this.navCtrl.push("AuthWebviewPage",{ data: data } );
  //  let myModal = this.modalCtrl.create( 'AuthWebviewPage', { data: data } );
  //  myModal.present();
  //  myModal.onDidDismiss( data => {
//      this.navCtrl.push( 'WalletPage' );
  //  } );
  }


  formatVisaCard() {
    this.globalVars.logger( "", "VAR" + this.card_number );

    let value1 = this.card_number;

    value1 = value1.split( '-' ).join( '' );
    let formatedValue = "";
    let firstPart = "";

    if ( value1.length <= 4 ) {
      return value1;
    }

    if ( value1.length > 4 ) {
      firstPart = value1.substring( 0, 4 ) + '-';
      let secondPartTemp = value1.substring( 4, value1.length );
      formatedValue = firstPart + secondPartTemp;
    }

    let secondPart = "";
    if ( value1.length > 8 ) {
      secondPart = value1.substring( 4, 8 ) + '-';
      let thirdPartTemp = value1.substring( 8, value1.length );
      formatedValue = firstPart + secondPart + thirdPartTemp;
    }

    if ( value1.length > 12 ) {
      let lastPart = value1.substring( 8, 12 ) + '-';
      let lastTemp = value1.substring( 12, value1.length );
      formatedValue = firstPart + secondPart + lastPart + lastTemp;
    }

    this.globalVars.logger( "", "formatedValue" + formatedValue.length + "::: " + formatedValue );
    this.data.controls[ 'expiry' ].patchValue( formatedValue);


  }



  submitt() {
    this.globalVars.is_first_login = true;
    // this.globalVars.Username = this.data.mobile;
    // this.globalVars.country = this.data.country;
    // let persist: any = { mobile: this.data.mobile, country: this.data.country }
    // let encryptPersist = this.globalVars.testenc( JSON.stringify( persist ) );




    this.navCtrl.push( 'ReceiptPage', {
      data: {
        message: "Your registration request is being processed",
        style: 'wait',
        next: 'LoginPage'
      }
    } );
  }
  submit(  ) {
    let data = this.data.value;
    data.type = "1001"
    data.phoneNumber = this.globalVars.mobileNo;
    this.alertService.showDefaultLoading();
    this.globalVars.logger( "Request: ", JSON.stringify(data) );
    this.clientdata.sendData( data )
      .subscribe( data => {
        this.alertService.dismissDefaultLoading();
        if ( data.length != 0 ) {

          let r_data = JSON.parse( data );
          console.log( "Response: ", r_data );
          if ( r_data.f39 == "00" ) {
            this.getOTP( r_data );

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




  searchCountry() {
    let obj = LanguageProvider.getCountry();
    let myModal = this.modalCtrl.create( 'ListViewPage', { data: obj } );
    myModal.present();
    myModal.onDidDismiss( dat => {
      this.data.controls[ 'country' ].patchValue( dat.code );
    } );
  }


  public initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.customHandleBackButton();
    }, 10);
  }

  private customHandleBackButton(): void {
    // do what you need to do here ...
    this.navCtrl.setRoot('WalletPage');
  }
  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();

  }



  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }


}
