import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  //choma_na_ngoma.jpg
  eventCategory="entertainment";
  entertainmentEvents: any[] = [
    {
      "title": "Anto neo sol Alkamist",
    "description": "Night of soul", "category": "Entertainment",
    "poster": "assets/img/events/anto_neosoul.png",
    "date": "6th March 2018", "location": "Alliance Francaise"
    },
    {
      "title": "Anto neo sol Alkamist",
    "description": "Night of soul", "category": "Entertainment",
    "poster": "assets/img/events/anto_neosoul.png",
    "date": "6th March 2018", "location": "Alliance Francaise"
    },
    {
      "title": "Anto neo sol Alkamist",
    "description": "Night of soul", "category": "Entertainment",
    "poster": "assets/img/events/anto_neosoul.png",
    "date": "6th March 2018", "location": "Alliance Francaise"
    }
  
  ];

  movies:any[]=[
    {
      "title": "Black Panther", "category": "Movie",
      "description": "Black super-hero",
      "poster": "assets/img/events/black_panther.png",
"date":"3rd Aug 2018","location":"20th Century"}];

  artEvents:any[]=[
  {"title":"Art & Music National Museum",
  "description":"Celebrate our heritage",
  "category":"Art","poster":"assets/img/events/art_n_music.png"
,"date":"3rd Aug 2018","location":"National Museum"}
  ];


   sportEvents:any[]=[
  {"title":"Grand Prix Jamhuri Grounds","description":"Car racing","category":"Sports",
  "poster":"assets/img/events/grand_prix.png","date":"3rd Aug 2018","location":"Sopa Lodge,Naivasha"}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


   openEventDetail(event){
   	this.navCtrl.push('EventDetailPage',{event:event});
   }

    openPage(page){
    this.navCtrl.push(page);
  }

   setSection(section){
    this.eventCategory = section;
  }

}
