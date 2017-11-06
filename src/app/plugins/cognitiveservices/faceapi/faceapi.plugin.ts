import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';
import { ConfigService } from '../../../lib/configloader/config.service';
import { FaceApiService } from './faceapi.service';
import { EventService } from '../../../lib/events/event.service';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { CommonModule } from '@angular/common';

const options = {
    audio: false,
    video: true,
    width: 500,
    height: 500
};

@Component({
    selector: 'facepi',
    encapsulation: ViewEncapsulation.None,
    template: '<ack-webcam [(ref)]="webcam" [options]="options"></ack-webcam>    <canvas></canvas>',
    providers: [FaceApiService]    
})
export class FaceApiPluginComponent {
    private plugin: any;
    private host: string;
    private key: string;
    public webcam: WebCamComponent;    

    constructor(private _config:ConfigService, private eventService: EventService, private faceApiService:FaceApiService, @Inject(PluginData) private pluginData: PluginData) {
        this.plugin = this.pluginData.instance;
        this.eventService.testEvent.subscribe((message: String) => this.capture(message));        
    }

    capture(message: String) {
        console.log("test");
        this.webcam.getBase64()
        .then((base: String)=> this.faceApiService.detectFaces(this.webcam.dataUriToFormData(base,{}).get("file") as File))
        .catch((e: any)=>console.error(e) )  
    }

}

@NgModule({
  imports: [CommonModule],
  declarations: [FaceApiPluginComponent, WebCamComponent]
})
export class FaceApiPluginModule {}
