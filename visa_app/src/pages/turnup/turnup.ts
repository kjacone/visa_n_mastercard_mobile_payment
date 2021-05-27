import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { LanguageProvider } from '../../providers/language/language';
/**
 * Generated class for the TurnupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-turnup',
  templateUrl: 'turnup.html',
})
export class TurnupPage {
  data: any = { type: "get_menu",mobile: "",account_from:"" };
  err:any = {}
  present:any = []
  accounts = [ "0724727999", "23434827283" ];

  constructor( public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider, public clientdata: ClientdataProvider,
    public popoverCtrl: PopoverController ) {
    this.err = LanguageProvider.getLang( 'en' ).general;
    this.data.mobile = globalVars.Username;
    this.submitted();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TurnupPage');
  }

  submitted() {
    this.alertService.showDefaultLoading();
    this.clientdata.turnUp( this.data )
      .subscribe( data => {
       
        if ( data.length != 0 ) {
          console.log( "Response: ", data );
          this.alertService.dismissDefaultLoading();
          this.present = data.results;
          
        } else {
          this.navCtrl.setRoot( this.navCtrl.getPrevious() );
          console.log( " timeout" );
          this.alertService.dismissDefaultLoading();
          this.navCtrl.setRoot( this.navCtrl.getPrevious() );
          this.alertService.errorPop( "", this.err.timeout, true );
        }
      }, error => {
        this.alertService.dismissDefaultLoading();
        this.navCtrl.setRoot( this.navCtrl.getPrevious() );
        this.alertService.errorPop( "", this.err.conn, true );
      } );
  }


}
