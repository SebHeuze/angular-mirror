import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';
import { WeatherPluginModule } from 'app/plugins/weather/weather/weather.plugin';


@PluginConfig({
    name: 'weather',
    configUrl: 'weather.config.json',
    description: 'Weather Plugin',
    placements: [
        {slot: 'helloworldday2', priority: 4,
        component: WeatherPluginModule}
    ]
})
export default class WeatherPlugin {

}
