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
    constructor(private _config:ConfigService, @Inject(PluginData) private pluginData: PluginData) {
        
    }

    ngOnInit() {
        this.plugin = this.pluginData.instance;
        this.host = this._config.get('cognitiveservices').faceAPI.host;
        this.key = this._config.get('cognitiveservices').faceAPI.key;
        console.log('Face API loaded on host ' + this.host);
    }
}

@NgModule({
  declarations: [FaceApiPluginComponent]
})
export class FaceApiPluginModule {}
