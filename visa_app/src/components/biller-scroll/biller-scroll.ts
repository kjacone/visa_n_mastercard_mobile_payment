import { Component ,ViewChild} from '@angular/core';
import {  NavController,Slides} from 'ionic-angular';
/**
 * Generated class for the BillerScrollComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'biller-scroll',
  templateUrl: 'biller-scroll.html'
})
export class BillerScrollComponent {
  showSkip = true;
  @ViewChild(Slides) slides: Slides;
quick_list:any;
public showLeftButton: boolean;
    public showRightButton: boolean;
  constructor() {

  this.quick_list = [
    { name: 'LUKU',name1: ' Advance', image: 'assets/svg/quick_access/salary_advance.svg', link: 'Salary Advance' },
  //  { name: 'Scan QR', image: 'assets/svg/quick_access/qr.svg', link: 'ScanPage' },
    { name: 'Dawasa ', name1: ' Kibubu',image: 'assets/svg/quick_access/digital_kibubu.svg', link: 'Digital Kibubu' },
    { name: 'GEPG ',name1: ' Fdr', image: 'assets/svg/quick_access/fdr.svg', link: 'Digital FDR' },
    { name: 'Startimes ',name1: ' Withdrawal', image: 'assets/svg/quick_access/withdraw_cash.svg', link: 'WithdrawCashPage' },
    { name: 'NHC ', name1: ' Topup',image: 'assets/svg/quick_access/airtime_topup.svg', link: 'AirtimePage' },
    { name: 'Azam Tv ',name1: ' Transfer', image: 'assets/svg/quick_access/funds_transfer.svg', link: 'MoneyTransferPage' }
  ];
}

public slideNext(): void {
    this.slides.slideNext();
}

// Method that shows the previous slide
public slidePrev(): void {
    this.slides.slidePrev();
}
// Method executed when the slides are changed
public slideChanged(): void {
   let currentIndex = this.slides.getActiveIndex();
   this.showLeftButton = currentIndex !== 0;
   this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
}
}
