import { PluginPlacement } from './plugin-placement.model';
import { PluginConfig } from "./plugin-config.decorator";

export class PluginData {
    public placement:PluginPlacement;
    public plugin:Plugin;
    public config:PluginConfig;
    public instance:any;

    constructor(plugin: Plugin, placement: PluginPlacement, config: PluginConfig, instance: any) {
        this.plugin = plugin;
        this.placement = placement;
        this.instance = instance;
        this.config = config;
    }
}