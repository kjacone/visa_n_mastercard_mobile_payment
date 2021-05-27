import { Component } from '@angular/core';
import { IonicPage,  NavParams, NavController, ViewController } from 'ionic-angular';
// import { GlobalVarsProvider } from '../../providers/providers';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';



@IonicPage()
@Component({
  selector: 'page-confirm-modal',
  templateUrl: 'confirm-modal.html',
})
export class ConfirmModalPage {
  template:string="<div></div>";
  body:any;
  data:any;
  completed:boolean=false;
  pageTo:string="Login";
  token:any;
  ttype:string;
  myValue: any;
  constructor( public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
   public globalVars: GlobalVarsProvider ) {
    let data = navParams.get( 'data' )
    this.template = '<div>' + data.template + '</div>' ;
    this.pageTo = data.pageTo;
    this.completed = data.iscomplete;

  }


  closeModal( data: string ) {
    if ( data == 'true' ) {
      this.viewCtrl.dismiss( true );
    } else { 
      this.viewCtrl.dismiss( false );
    }
   
   
  }
 
  close() {
    if ( this.pageTo != "" ) { 
      this.navCtrl.setRoot( this.pageTo );
    }
    this.viewCtrl.dismiss();
  
  }
 

}
