import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';
import { ConfigService } from '../../../lib/configloader/config.service';
import { FaceApiService } from './faceapi.service';

@Component({
    selector: 'facepi',
    encapsulation: ViewEncapsulation.None,
    template: 'FACEAPI_TEST',
    providers: [FaceApiService]    
})
export class FaceApiPluginComponent {
    private plugin: any;
    private host: string;
    private key: string;
    constructor(private _config:ConfigService, private faceApiService:FaceApiService, @Inject(PluginData) private pluginData: PluginData) {
        this.plugin = this.pluginData.instance;

        faceApiService.detectFaces("https://www.thefamouspeople.com/profiles/images/bill-gates-3.jpg");
    }
}

@NgModule({
  declarations: [FaceApiPluginComponent]
})
export class FaceApiPluginModule {}
