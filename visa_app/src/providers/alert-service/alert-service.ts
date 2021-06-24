import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController,Platform, Loading, AlertController, ModalController } from 'ionic-angular';
import { GlobalVarsProvider, ClientdataProvider } from '../../providers/providers';


/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



// mytoastdown
// error
// popUp

// getUsername
// getAccounts
// createToken




@Injectable()
export class AlertServiceProvider {
  myModal: any;
  loading: any;
  complete: boolean=false;
  constructor( private platform: Platform, private loadingCtrl: LoadingController,private toastCtrl: ToastController,
    public modalCtrl: ModalController, public alertCtrl: AlertController ) {
    console.log('Hello AlertServiceProvider Provider');
  }
//modals
  showPin() {

    this.myModal = this.modalCtrl.create( 'PinModalPage' );
    this.myModal.onDidDismiss( data => {

    } );
    this.myModal.present();


  }


  mytoastup(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  mytoastdown(msg) {
    if (msg == '') {
      msg = "No internet connection"
    }
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  noConnection( mess ) {
    let confirm = this.alertCtrl.create( {
      title: "No Connection",
      message: mess,
      buttons: [ {
        text: "Exit",
        handler: () => {
          console.log( 'exit clicked' );
          this.platform.exitApp();
        }
      }]
    } );
    confirm.present();
  }

  errorPop( page, message,complete:boolean ) {

    if ( message == 'error' ) {
      message = 'There was an error with your Request. Kindly Try Again Later';

    } else if ( message == 'timeout' ) {
      message = 'There was a Connection Timeout. Kindly Try Again Later';

    }
     else if ( message == 'success' ) {
      message = 'Your Request was Successful Thank you';

    }
     else if ( message == 'server' ) {
      message = 'Server Connections Problems Kindly try again Later';

    }



    let obj = { template: message, pageTo: page, iscomplete:complete};
    let myModal = this.modalCtrl.create( 'ConfirmModalPage', { data: obj } );
    myModal.present();
  }
  error( message) {
    let obj = { template: message, pageTo: '', iscomplete:true};
    let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
    myModal.present();
  }
  popUp(bod, template) {
    let obj = { body: bod, template: template, iscompleted: true, pageTo: '' };
    let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
    myModal.present();
  }
  log(page:string,type:number,message:string) {
    console.log(page,': '+ message );
  }

  showDefaultLoading( ) {
    this.loading = this.loadingCtrl.create( {
      content: 'Processing'
    } );
    this.loading.present();
  }

  dismissDefaultLoading() {
    this.loading.dismiss();
  }



}
