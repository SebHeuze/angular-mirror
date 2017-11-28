import { HodorModule } from './hodor/hodor.plugin';
import { HelloworlddayPluginModule } from './helloworldday/helloworldday.plugin';
import { HelloworldnamePluginModule } from './helloworldname/helloworldname.plugin';
import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';

@PluginConfig({
    name: 'helloworld',
    configUrl: 'helloworld.config.json',
    description: 'Hello World plugin',
    placements: [
        {slot: 'helloworldday', priority: 1,
        component: HelloworlddayPluginModule},
         {slot: 'center', priority: 3,
        component: HelloworldnamePluginModule},
        {slot: 'helloworldname', priority: 2,
        component: HodorModule}
    ]
})
export default class HelloWorldPlugin {
    private name: String;
    constructor() {
        this.name = 'Test Name';
    }
}
