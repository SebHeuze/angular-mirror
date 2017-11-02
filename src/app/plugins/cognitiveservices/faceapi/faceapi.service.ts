import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Face } from './face.model';
import { ConfigService } from '../../../lib/configloader/config.service';

@Injectable()
export class FaceApiService {
    private key: string;
    private host: string;
    public currentFaces: Subject<Array<Face>> = new BehaviorSubject<Array<Face>>(null);

    constructor(private http: Http, private _config:ConfigService) {
        this.host = this._config.get('cognitiveservices').faceAPI.host;
        this.key = this._config.get('cognitiveservices').faceAPI.key;

        console.log("Face api service loaded on host " + this.host)
    } 


    public detectFaces(pictureUrl: string): void {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Ocp-Apim-Subscription-Key', this.key);
      let args: RequestOptionsArgs = {
          method: 'post',
          body: JSON.stringify({url: pictureUrl}),
          headers: headers
      };

    let response = this.http.request(this.host+"/detect?returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile", args);
    response.forEach((r: Response) => {
        let json = r.json();
        console.log(json);
        let results = <Array<Face>> json;
        
        this.currentFaces.next(results);
    });
  }
}