import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { ConfigService } from '../../lib/configloader/config.service';
import { Ticker } from './ticker.model';

@Injectable()
export class CoinmarketcapService {
    private host: string;

    constructor(private http: Http, private _config: ConfigService) {
        this.host = 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/';

        console.log('Coinmarketcap service loaded')
    }


    public callTicker() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let args: RequestOptionsArgs = {
            method: 'get',
            headers: headers,
            params: {'limit' : this._config.get('cryptowatch').limit,
                    'callback' : 'JSONP_CALLBACK'}
        };

        return this.http.request(this.host + 'ticker/', args)
        .map( data => {
            return <Ticker[]>data.json()
         });
    }
}
