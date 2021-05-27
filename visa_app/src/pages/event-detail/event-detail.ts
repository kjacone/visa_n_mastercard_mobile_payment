import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event:any= {"title":"Anto neo sol Alkamist","category":"Entertainment",
  "description":"A night of soul",
  "poster":"assets/img/events/anto_neosoul.png","date":"6th March 2018"};

  ticket:any={vipTicketNo:1,regularTicketNo:1,kidTicketNo:1};
  totalTicketCost:number=0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
  }

  openPage(page){
    this.navCtrl.push(page);
  }


  viewTicket(ticket){
    console.log(JSON.stringify(ticket));
    this.navCtrl.push('BuyTicketPage',{ticket:this.ticket,event:this.event});
  }
 

  getDirections(){
    this.navCtrl.push('EventLocationPage',{event:this.event});
  }

  calculateTotal(ticketNo,amount){
    console.log("Ticket Number ",ticketNo);
    console.log("Amount ",ticketNo);

    this.totalTicketCost+=(ticketNo*amount);
    
  }


  

}
