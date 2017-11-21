import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';
import { CryptowatchPluginModule } from './cryptowatch.plugin';


@PluginConfig({
    name: 'cryptowatch',
    configUrl: 'cryptowatch.config.json',
    description: 'Cryptowatch Plugin',
    placements: [
        {slot: 'helloworldday2', priority: 4,
        component: CryptowatchPluginModule}
    ]
})
export default class WeatherPlugin {

}
