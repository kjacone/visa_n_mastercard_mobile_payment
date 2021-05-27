import { Component } from '@angular/core';
import {  NavController} from 'ionic-angular';
/**
 * Generated class for the MenuFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-footer',
  templateUrl: 'menu-footer.html'
})
export class MenuFooterComponent {

  text: string;

  constructor(  public navCtrl: NavController) {

  }
  openPage(page) {
    this.navCtrl.push(page);
  }
}
