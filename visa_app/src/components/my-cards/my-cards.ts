import { Component,ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { LanguageProvider } from '../../providers/language/language';
/**
 * Generated class for the MyCardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-cards',
  templateUrl: 'my-cards.html'
})
export class MyCardsComponent {
  showSkip = true;
  @ViewChild(Slides) slides: Slides;
  data: any = {}
  final_data: any = { type: "1005" };
  err: any = {};
  error: number = 0;
    public cards: any;
  constructor( public navCtrl: NavController, public alertCtrl: AlertServiceProvider, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider,
   public clientdata: ClientdataProvider) {

    this.err = LanguageProvider.getLang( 'en' ).general;
    this.data.phoneNumber = globalVars.mobileNo;


    
    this.sendData();

    }


  
  sendData() {
    this.alertService.showDefaultLoading();
    this.final_data.phoneNumber = this.globalVars.trimPhome( this.data.phoneNumber );
    this.final_data.token = this.globalVars.token;
    this.clientdata.sendData( this.final_data )
      .subscribe( data => {
       
        this.alertService.dismissDefaultLoading();
        if ( data.length != 0 ) {
          console.log( "Response: ", data );
          let r_data = JSON.parse( data );
          if ( r_data.f39 == "00" ) {
           
            this.globalVars.logger( "card_response", JSON.parse(r_data.f48) );
            this.cards = JSON.parse(r_data.f48);
            this.globalVars.cards = JSON.parse(r_data.f48);
          } else if ( r_data.f39 == "99" ) {
            this.alertService.errorPop( "", r_data.f48, true );
          } else { 
            this.alertService.errorPop( "", this.err.technical, true );
          }



        } else {
          this.alertService.errorPop( "", this.err.timeout, true );
        }
      }, error => {
        this.alertService.dismissDefaultLoading();
        this.alertService.errorPop( "", this.err.conn, true );
      } );
  }

  }
