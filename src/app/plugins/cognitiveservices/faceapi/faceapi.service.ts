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

    constructor(private http: Http, private _config: ConfigService) {
        this.host = this._config.get('cognitiveservices').faceAPI.host;
        this.key = this._config.get('cognitiveservices').faceAPI.key;

        console.log("Face api service loaded on host " + this.host)
    }


    public identify(personGroupId: string, facesIds: string[], confidenceThreshold: Number): void {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Ocp-Apim-Subscription-Key', this.key);
        let args: RequestOptionsArgs = {
            method: 'post',
            body: JSON.stringify({ personGroupId: personGroupId, faceIds: facesIds, confidenceThreshold: confidenceThreshold }),
            headers: headers
        };

        let response = this.http.request(this.host + "/identify", args);
        response.forEach((r: Response) => {
            let json = r.json();
            console.log(json);
            let results = <Array<Face>>json;

            this.currentFaces.next(results);
        });
    }
    public detectFaces(file: File): void {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Ocp-Apim-Subscription-Key', this.key);
        let args: RequestOptionsArgs = {
            method: 'post',
            body: file,
            headers: headers
        };

        let response = this.http.request(this.host + "/detect?returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile", args);
        response.forEach((r: Response) => {
            let json = r.json();
            console.log(json);
            let results = <Array<Face>>json;
            this.identify("b7a64cfe-fa15-4a0b-93cb-079bbb34fa62",[results[0].faceId],0.5)
            this.currentFaces.next(results);
        });
    }
}