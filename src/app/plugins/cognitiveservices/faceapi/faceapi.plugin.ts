import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';
import { ConfigService } from '../../../lib/configloader/config.service';

@Component({
    selector: 'facepi',
    encapsulation: ViewEncapsulation.None,
    template: 'FACEAPI_TEST'    
})
export class FaceApiPluginComponent {
    private plugin: any;
    private host: string;
    private key: string;
    constructor(private _config:ConfigService, @Inject(PluginData) pluginData: PluginData) {
        this.plugin = pluginData.instance;
        this.host = _config.get('cognitiveservices').faceAPI.host;
        this.key = _config.get('cognitiveservices').faceAPI.key;
        console.log('Face API loaded on host ' + this.host);
    }
}

@NgModule({
  declarations: [FaceApiPluginComponent]
})
export class FaceApiPluginModule {}
