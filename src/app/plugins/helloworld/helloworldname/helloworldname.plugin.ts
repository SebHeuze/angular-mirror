import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';

@Component({
    selector: 'helloworldname',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/helloworld/helloworldname/helloworldname.html'
})
export class HelloworldnamePluginComponent {
    private plugin: any;
    public name: string;
    constructor(@Inject(PluginData) pluginData: PluginData) {
        this.plugin = pluginData.instance;
        this.name = this.plugin.name;
        console.log('Hello world name loaded');
    }
}

@NgModule({
  declarations: [HelloworldnamePluginComponent]
})
export class HelloworldnamePluginModule {}
