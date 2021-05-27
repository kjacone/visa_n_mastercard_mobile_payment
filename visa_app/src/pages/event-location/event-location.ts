import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;


/**
 * Generated class for the EventLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-location',
  templateUrl: 'event-location.html',
})
export class EventLocationPage {
  event:any;
  
   
    //mapElement: HTMLElement;
    @ViewChild('mapCanvas') mapElement: ElementRef;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    	this.event = this.navParams.get('event');
    }

   openPage(page){
  	this.navCtrl.push(page);
  }
  ionViewDidLoad() {
 
       let mapEle = this.mapElement.nativeElement;


    let latLng = new google.maps.LatLng(-1.2826514,36.8142843);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

           let map = new google.maps.Map(mapEle, mapOptions);
    


               let eventName = this.event.location;
                let infoWindow = new google.maps.InfoWindow({
                    content: '<h5>'+eventName+'</h5>'
                });


                let markerTitle = this.event.location;
                let marker = new google.maps.Marker({
                    position:map.getCenter(),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: markerTitle
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            

            google.maps.event.addListenerOnce(map, 'idle', () => {
                mapEle.classList.add('show-map');
            });

       

    }

}
