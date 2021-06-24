import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';

import { GlobalVarsProvider } from '../../../providers/global-vars/global-vars';


export interface Slide {

  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public globarVars: GlobalVarsProvider) {
    this.slides = [
      {
        description: 'Securely buy good, send money anywhere in the world with visa',
        image: 'assets/img/slideshow/slide1.jpg'
      },
      {
        description: 'Scan to Pay makes it easy to use your Visa card anywhere in the world',
        image: 'assets/img/slideshow/slide2.jpg'
      },
      {
        description: 'Enroll yourself now and start enjoying the Visa digital payment',
        image: 'assets/img/slideshow/slide0.jpg'
      }
    ];
  }

  startApp() {
    this.navCtrl.push('MvisaMenuPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
  goHome() {
    this.navCtrl.setRoot( 'HomePage' );
  }
  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  getStarted() {
    this.navCtrl.push('MvisaMenuPage')
  }
}
