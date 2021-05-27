import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ViewController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { LanguageProvider } from '../../providers/language/language';


@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {
  resProject: any = [];
  lang: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public globalVars: GlobalVarsProvider) {
    this.lang = LanguageProvider.getLang( 'en' ).general;
    this.fetch();
   
  }

  filterItems( event ) {
    this.fetch();
    const val = event.target.value;
    if ( val && val.trim() != '' ) {
      this.resProject = this.resProject.filter( ( item: any ) => {
        return ( item.name.toLowerCase().indexOf( val.toLowerCase() ) > -1 );
      } )
    }
  }

  fetch() {
   this.resProject = this.navParams.get("data");
  }
  sendData( val ) {
    
    this.viewCtrl.dismiss( val );
  }
  }
