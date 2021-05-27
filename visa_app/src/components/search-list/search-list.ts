
import { LanguageProvider } from '../../providers/language/language';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
/**
 * Generated class for the SearchListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-list',
  templateUrl: 'search-list.html'
})
export class SearchListComponent {

  // resProject: any[];
  lang: any;
  @Input( 'list' ) resProject:any;
  @Output() outputEvent = new EventEmitter();
  constructor() {

    this.lang = LanguageProvider.getLang( 'en' ).general;
    // this.initializeItems();
  }

  filterItems( event ) {
    const val = event.target.value;
    if ( val && val.trim() != '' ) {
      this.resProject = this.resProject.filter( ( item: any ) => {
        return ( item.name.toLowerCase().indexOf( val.toLowerCase() ) > -1 );
      } )
    }
  }

  sendData( val ) {
    this.outputEvent.emit( val );
  }
  
}