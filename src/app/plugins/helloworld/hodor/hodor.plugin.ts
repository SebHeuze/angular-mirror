import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';

@Component({
    selector: 'hodor',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/helloworld/hodor/hodor.html'
})
export class HodorCompnent {
    private plugin: any;
    public name: string;
    constructor(@Inject(PluginData) pluginData: PluginData) {
        this.plugin = pluginData.instance;
        this.name = "HODOR ! ";
    }
}

@NgModule({
  declarations: [HodorCompnent]
})
export class HodorModule {}
