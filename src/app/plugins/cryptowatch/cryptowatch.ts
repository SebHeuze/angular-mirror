import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';
import { CryptowatchPluginModule } from './cryptowatch.plugin';


@PluginConfig({
    name: 'cryptowatch',
    configUrl: 'cryptowatch.config.json',
    description: 'Cryptowatch Plugin',
    placements: [
        {slot: 'upright', priority: 2,
        component: CryptowatchPluginModule}
    ]
})
export default class WeatherPlugin {

}
