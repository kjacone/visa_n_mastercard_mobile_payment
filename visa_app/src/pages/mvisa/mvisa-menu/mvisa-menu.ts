import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';

import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';


@IonicPage()
@Component({
  selector: 'page-mvisa-menu',
  templateUrl: 'mvisa-menu.html',
})
export class MvisaMenuPage {
  activePage:string;
  title:string;
  objectblock:any={};
  data:any;
  token: any;
  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider,
     public loadingController: LoadingController,public modalCtrl: ModalController
    ) {
    // this.activePage = navParams.get('state');
    // if(this.activePage == 'link'){
    //   this.title = 'Receive with Mobile'
    // }else if(this.activePage == 'security'){
    //   this.title = 'Security Tips'
    // }else if(this.activePage == 'terms'){
    //   this.title = 'Terms and Conditions'
    // }
  }

  goMain() {
    this.navCtrl.push( 'MvisaMainPage' );
  }

  goHome() {
    this.navCtrl.setRoot( 'MainPage' );
  }
  openPage(page){

	this.navCtrl.push('WithdrawPage',{type:page});
  }

  openActivePage(page){
    this.navCtrl.push(page)
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Linked Mobile:'+this.globalVars.getUsername(),
      buttons: [
        {
          text: 'CHANGE',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push('VisaactivatePage', {state: 'modify'});
          }
        },
        {
          text: 'REMOVE',
          handler: () => {
           this.deleteLinked()
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  deleteLinked(){
    let template = "<div>Do you really want to delete this linked mobile number?</div>";
    let obj = {
      body: '',
      template: template,
      completed: false,
      pageTo: '',
      saveService: false,
      submitBtn: true
    };

    let myModal = this.modalCtrl.create( 'ConfirmModalPage', obj );
    myModal.present();
    myModal.onDidDismiss( data => {
      if ( data ) {

      }
      else {

      }
    } )
  }





}
