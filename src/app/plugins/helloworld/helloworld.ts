import { HodorModule } from './hodor/hodor.plugin';
import { HelloworlddayPluginModule } from './helloworldday/helloworldday.plugin';
import { HelloworldnamePluginModule } from './helloworldname/helloworldname.plugin';
import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';
import { NgModule } from '@angular/core';


@PluginConfig({
    name: 'helloworld',
    description: 'Hello World plugin',
    placements: [
        {slot: 'helloworldday', priority: 1,
        component: HelloworlddayPluginModule},
         {slot: 'helloworldname', priority: 3,
        component: HelloworldnamePluginModule},
        {slot: 'helloworldname', priority: 2,
        component: HodorModule}
    ]
})
@NgModule({
  declarations: [ HelloworlddayPluginModule]
})
export default class HelloWorldPlugin {
    private name:String;
    constructor() {
        this.name = 'Test Name';
    }
}
