import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';
import { WeatherPluginModule } from './weather/weather.plugin';


@PluginConfig({
    name: 'weather',
    configUrl: 'weather.config.json',
    description: 'Weather Plugin',
    placements: [
        {slot: 'upright', priority: 1,
        component: WeatherPluginModule}
    ]
})
export default class WeatherPlugin {

}
