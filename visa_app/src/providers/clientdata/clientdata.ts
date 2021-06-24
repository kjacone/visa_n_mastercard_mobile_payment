import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";
import { GlobalVarsProvider } from '../../providers/providers';
// import { Network } from '@ionic-native/network';
// import { Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
// declare var Connection;
@Injectable()
export class ClientdataProvider {



    url = 'http://eximiousdev.ngrok.io/visa_api/visa_api';
    google_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-6.805293,39.252749&radius=1500&type=club&keyword=event&key=AIzaSyAD941hRyogzLW-7f7RBRXsOKeK5kVIgMo';

    token: any;
    myhmac: any;
    key: string = "ab765f9ewrt5hgf";
    iv: string = "ab765f987654321098765a98765abcd0";
    sample_data: any = {
        "esbRequest": { "f2": "255765874564", "f3": "1001","channel":"APP", "data": {} }, "mnoSession": { "id": "21091508", "imsi": "",  "lang": "en", "location": {}, "deviceid": ""} }

    constructor( public device: Device,public http: Http, public globalVars: GlobalVarsProvider ) {

    }

    getGet( user: any ) {
        return this.http.get( this.google_url )
            .timeout( 20000 )
            .map(
                ( data: Response ) =>
                    data.json()
            )
            .catch( this.handleError );
    }

    getPost( user: any ) {

        let headers = new Headers( {
            //'Content-Type': 'application/json',
            'token': this.token,
           // 'X-FORWARDED_FOR': this.myhmac
        } );
        let send_data = this.sample_data;
        send_data.esbRequest.data = user;
        send_data.esbRequest.f2 = user.phoneNumber;
        send_data.esbRequest.f3 = user.type;

        let device_info = {
            'uuid': this.device.uuid,
            'manufacturer': this.device.manufacturer,
            'model': this.device.model,
            'platform': this.device.platform,
            'version': this.device.version
        }

        send_data.esbRequest.deviceInfo = device_info;
        send_data.mnoSession.deviceid = this.device.uuid;
        send_data.mnoSession.imsi = this.device.uuid;
        send_data.mnoSession.lang = 'en';

        //var body = this.JSONify( user );
        var body = JSON.stringify( send_data );
        this.globalVars.logger("REQUEST :", body );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.url, body, options )
            .timeout( 20000 )
            .map(( data: Response ) =>

                    data.json()  )
            .catch( this.handleError );

    }



    JSONify( data ) {
          var source = JSON.stringify( data );
          let encypted = this.globalVars.testenc( source );
          return JSON.stringify( { data: encypted } );
    }


    sendData( user: any ) { return this.getPost( user ); }
    turnUp( user: any ) { return this.getGet( user ); }




    private handleError( error: any ) {
        console.log( error );
        return Observable.throw( error.json() );
    }
}
