import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Face } from './face.model';
import { ConfigService } from '../../../lib/configloader/config.service';

@Injectable()
export class DarkSkyService {
    private key: string;
    private host: string;
    private latitude: number;
    private longitude: number;

    public currentFaces: Subject<Array<Face>> = new BehaviorSubject<Array<Face>>(null);

    constructor(private http: Http, private _config: ConfigService) {
        this.host = "https://api.darksky.net/";
        this.key = this._config.get('weather').apikey;
        this.latitude = this._config.get('weather').latitude;
        this.longitude = this._config.get('weather').longitude;

        console.log("Weather service loaded")
    }


    public callForecast(): void {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let args: RequestOptionsArgs = {
            method: 'get',
            headers: headers,
            params: {"lang" : "fr"}
        };

        let response = this.http.request(this.host + "forecast/" + this.key + "/" + this.latitude + "," + this.longitude, args);
        response.forEach((r: Response) => {
            let json = r.json();
            console.log(json);
            let results = <Array<Face>>json;

            this.currentFaces.next(results);
        });
    }
}