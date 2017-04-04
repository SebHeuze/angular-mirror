import { PluginPlacement } from './plugin-placement.model';
import { PluginConfig } from './plugin-config.decorator';


/**
 * PluginData used to load Plugins
 * 
 * @export
 * @class PluginData
 */
export class PluginData {
    public placement: PluginPlacement;
    public config: PluginConfig;
    public instance: any;

    constructor(placement: PluginPlacement, config: PluginConfig, instance: any) {
        this.placement = placement;
        this.instance = instance;
        this.config = config;
    }
}
