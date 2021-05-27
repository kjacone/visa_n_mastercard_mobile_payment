import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController,AlertController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { LanguageProvider } from '../../providers/language/language';

@IonicPage()
@Component({
    selector: 'page-pinchange',
    templateUrl: 'pinchange.html'
})
export class PinchangePage {
  data: any = {}
  final_data: any = { type:"1003", enc_pin:""};
  err: any = {};
  error: number = 0;

  constructor( public navCtrl: NavController,public alertCtrl: AlertController , public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider,
    public modalCtrl: ModalController, public clientdata:ClientdataProvider) {

    this.err = LanguageProvider.getLang( 'en' ).general;
    this.data.mobile = globalVars.mobileNo;
  }



  reg() {
    this.error = 0;
    this.data.mobile =  this.globalVars.trimPhome( this.data.mobile );
    if ( this.data.name == "" || this.data.name == undefined ) {
      this.error = 3;
    } else if ( this.data.pin == "" || this.data.pin == undefined ) {
      this.error = 1;
    } else if ( this.data.newpin != this.data.pin) {
      this.error = 2;
    } else {
    
      this.submit();
    }
  }

  submit() {
    let message = "this is a Secure PIN. Please do not share ";
    let template = "<div>" + message + "</div>";

    let obj = { template: template, pageTo: '', iscomplete: false };
    let myModal = this.modalCtrl.create( 'ConfirmModalPage', { data: obj } );
    myModal.present();
    myModal.onDidDismiss( data => {
      console.log( "Data =>" + data );
      if ( data ) {
       this.sendData();
      }
      else {

      }
    } );
  }

  sendData() {
    this.alertService.showDefaultLoading();
  
    this.final_data.phoneNumber = this.globalVars.trimPhome( this.data.mobile );
    this.final_data.enc_pin = this.globalVars.getHashPass( this.final_data.phoneNumber, this.data.pin );
    this.final_data.userFullName = this.data.name;
    this.clientdata.sendData( this.final_data )
      .subscribe( data => {
        this.alertService.dismissDefaultLoading();
        if ( data.length != 0 ) {
          console.log( "Response: ", data );
          let r_data = JSON.parse( data );
          if ( r_data.f39 == "00" ) {
            this.globalVars.saveUser( this.globalVars.trimPhome( this.final_data.phoneNumber ) );
            this.showPaymentPrompt();

          } else if ( r_data.f39 == "26" ) {
            this.globalVars.saveUser( this.globalVars.trimPhome( this.final_data.phoneNumber ) );
            this.showPaymentPrompt();
            this.alertService.errorPop( "", r_data.f48, true );

          } else {
            this.alertService.errorPop( "", r_data.f48, true );
          }


        } else {

          this.alertService.errorPop( "", this.err.timeout, true );
        }
      }, error => {
        this.alertService.dismissDefaultLoading();
        this.alertService.errorPop( "", this.err.conn, true );
      } );
  }


  register(){
    this.navCtrl.push('SignupPage');
  }

  showPaymentPrompt() {
     const prompt = this.alertCtrl.create({
       title: 'Payment ',
       message: "Add Card as a default mode of payment",

       buttons: [

         {
           text: 'Add Card ',
           handler: data => {
              this.register();
           }
         }
       ]
     });
     prompt.present();
   }


}
