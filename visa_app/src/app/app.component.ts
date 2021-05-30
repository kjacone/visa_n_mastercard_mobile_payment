import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Config, Nav, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { Storage } from '@ionic/storage';
import { Sim } from '@ionic-native/sim';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'OtpPage';
  // rootPage = 'ThirdPage';
  // rootPage='SignUpPage';
  // rootPage ='LoginPage';
  //rootPage='BuyTicketPage';
  //rootPage = 'FlightTicketPage';
  //rootPage = 'MainPage';

  @ViewChild(Nav) nav: Nav;
  constructor( private sim: Sim, platform: Platform, private config: Config, public globalVars: GlobalVarsProvider, public alertService: AlertServiceProvider, public device: Device ,
    private storage: Storage,private statusBar: StatusBar, private splashScreen: SplashScreen ) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString( '#00ADEE' );
      globalVars.checkInternet();
      this.initializeApp();
      this.splashScreen.hide();
      
      console.log( "Device_Info",  device  )
      this.globalVars.deviceInfo = device;
    } );
   
 
  }

 

  initializeApp() {

 
   
      // this.sim.getSimInfo().then(
      //   ( info ) => {
      //     this.globalVars.SIMinfo = info;
      //    console.log( "Sim_Info",info )
      //   },
      //   ( err ) => {
      //     console.log( 'Unable to get sim info: ', err );

      //   }
      // );
      // this.sim.hasReadPermission().then(
      //   ( info ) => console.log( 'Has permission: ', info )
      // );
      // this.sim.requestReadPermission().then(
      //   () => console.log( 'Permission granted' ),
      //   () => console.log( 'Permission denied' )
      // );
    
    
    
    
    
    
      // this.storage.clear();
      this.storage.get( 'visa' ).then( ( val ) => {
        if ( val ) {
          let decrypted = this.globalVars.testdec( val );
          console.log( "Dataz::::", decrypted );
          this.globalVars.mobileNo = decrypted;
          this.auth();
        } else {
          this.rootPage = 'OtpPage';
        }
      } );
  }

  auth() {
    // this.alertService.showPin();
    this.rootPage = 'LoginPage';
    }
  
  openPage(page) {
      this.nav.push(page);

  }


   logout() {
     //this.platform.exitApp();
     this.nav.push('LoginPage');
   }


}
