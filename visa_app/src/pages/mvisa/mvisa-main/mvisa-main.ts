import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  LoadingController,
  ModalController,
  MenuController
} from 'ionic-angular';



// import { GlobalVarsProvider, AlertServiceProvider, ClientdataProvider } from '../../../providers/providers';
import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';

@IonicPage()
@Component({
  selector: 'page-mvisa-main',
  templateUrl: 'mvisa-main.html'
})
export class MvisaMainPage {
  token: any;
  data: any;
  trasactions: any = [];
  historyAvailable: string = 'no';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public modalCtrl: ModalController, public globalVars: GlobalVarsProvider,
    public menu: MenuController,
    public loadingController: LoadingController) {
    menu.enable(true);
    // this.makeRequest();
    //this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MvisaMainPage');
  }

  openPage(page) {
    // this.globalVars.slideTransition();
    this.navCtrl.push(page);
  }

  openComingSoon(): void{
    let template = "<div>Coming Soon...</div>";
    let obj = { body: "", template: template, completed: true, pageTo: '' };
    let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
    myModal.present();
  }

  openMenu(evt: string) : void{
    if (evt === "main") {
      this.menu.enable(true, 'menu1');
      this.menu.enable(false, 'menu2');
    } else {
      this.menu.enable(true, 'menu2');
      this.menu.enable(false, 'menu1');
    }
    this.menu.toggle();
  }

  goHome() {
    this.navCtrl.setRoot( 'HomePage' );
  } 
  
  requestBody(field65: string, field100: string) {
    this.token = this.globalVars.createToken();
    let body = JSON.stringify({
      esbRequest: {
        f0: "0200",
        f3: "130200",
        data: {
          0: '0200',
          2: this.globalVars.getUsername(),
          3: "320000",
          4: '0',
          // 7: this.globalVars.getDate("7"),
          11: this.token.field11,
          32: "",
          37: this.token.field37,
          65: field65,
          100: field100
        }
      },
      // mnoSession: this.globalVars.mnoSession()
    });
    return this.globalVars.getEncryptedVars(body);
  }

  makeRequest(): void {
  
  }

  makeCifInquiryRequest(): void {
  
  }

  getStatementNarration(drCr: string): string {
    let narration: string = "";
    if (drCr == 'MVISA_P2P_FTDR') {
      narration = "Sent to"
    } else if (drCr == 'MVISA_P2P_FTCR') {
      narration = "Received from"
    } else if (drCr == 'MVISA_MERCHANT_PAYDR') {
      narration = "Pay merchant"
    } else if (drCr == 'MVISA_CASH_OUTDR') {
      narration = "Withdraw cash from"
    } else if (drCr == 'MVISA_CASH_INCR') {
      narration = "Deposit Cash"
    }
    return narration;
  }


}
