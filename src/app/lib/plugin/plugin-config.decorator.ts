import { Plugin } from './plugin.model';
import { PluginPlacement } from "./plugin-placement.model";

/**
 * Plugin Config decorator
 * @export
 * @interface PluginConfig
 */
export interface PluginConfig {
    name:String;
    description:String;
    placements:Array<PluginPlacement>

}
export function PluginConfig(config:PluginConfig) {
  //set the pluginConfig to the targetted type
  return function (target:any) {
    console.log(target);
    target._pluginConfig = config;
  }
}