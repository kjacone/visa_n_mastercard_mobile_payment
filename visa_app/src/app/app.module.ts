import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Items } from '../mocks/providers/items';
import { Sim } from '@ionic-native/sim';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ClientdataProvider } from '../providers/clientdata/clientdata';
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Network } from '@ionic-native/network';
import { Contacts } from '@ionic-native/contacts';
import { ContactsProvider, GlobalVarsProvider, AlertServiceProvider} from '../providers/providers';
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';
import { ValidatorProvider } from '../providers/validator/validator';
import { LanguageProvider } from '../providers/language/language';
import { OneSignal } from '@ionic-native/onesignal';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */

}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot( MyApp ),
    // NgIdleKeepaliveModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [ AndroidPermissions, CallNumber, Network,Device,
    Items, BarcodeScanner, Sim,InAppBrowser,OneSignal,
    Camera,
    Contacts,
    ContactsProvider, GlobalVarsProvider, AlertServiceProvider, ClientdataProvider,
    SplashScreen,
    StatusBar,
    // { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ValidatorProvider,
    LanguageProvider
  ]
})
export class AppModule { }
