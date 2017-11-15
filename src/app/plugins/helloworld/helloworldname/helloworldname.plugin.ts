import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';
import { ConfigService } from "../../../lib/configloader/config.service";
import AnnyangService from 'app/lib/voicerecognition/annyang.service';

@Component({
    selector: 'helloworldname',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/helloworld/helloworldname/helloworldname.html'
})
export class HelloworldnamePluginComponent {
    private plugin: any;
    public name: string;
    constructor(private _config:ConfigService, @Inject(PluginData) pluginData: PluginData, private annyangService: AnnyangService) {
        this.plugin = pluginData.instance;
        this.name = _config.get('testConfig') +  _config.get('speech').projectId + _config.get('helloworld').name;

        this.annyangService.addCommand("plugin test", () => this.testCallBack());
        console.log('Hello world name loaded');
    }

    public testCallBack() {
        alert(this._config.get("helloworld").name);
      }
}

@NgModule({
  declarations: [HelloworldnamePluginComponent]
})
export class HelloworldnamePluginModule {}
