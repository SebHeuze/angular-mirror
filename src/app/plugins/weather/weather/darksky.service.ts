import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, RequestOptionsArgs, Headers, Response, Jsonp } from '@angular/http';
import { ConfigService } from '../../../lib/configloader/config.service';
import { Forecast } from './forecast.model';

@Injectable()
export class DarkSkyService {
    private key: string;
    private host: string;
    private latitude: number;
    private longitude: number;

    constructor(private jsonp: Jsonp, private _config: ConfigService) {
        this.host = 'https://api.darksky.net/';
        this.key = this._config.get('weather').apikey;
        this.latitude = this._config.get('weather').latitude;
        this.longitude = this._config.get('weather').longitude;

        console.log("Weather service loaded")
    }


    public callForecast() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let args: RequestOptionsArgs = {
            method: 'get',
            headers: headers,
            params: {'lang' : 'fr',
                    'callback' : 'JSONP_CALLBACK'}
        };

        return this.jsonp.request(this.host + "forecast/" + this.key + "/" + this.latitude + "," + this.longitude, args)
        .map( data => {
            return <Forecast>data.json()
         });
    }
}
