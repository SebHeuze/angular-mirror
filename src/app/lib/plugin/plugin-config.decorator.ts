import { Plugin } from './plugin.model';
import { PluginPlacement } from "./plugin-placement.model";


export interface PluginConfig {
    name:String;
    description:String;
    placements:Array<PluginPlacement>

}

export function PluginConfig(config:PluginConfig) {
  // access the "metadata" message
  console.log(config);
  // return a function closure, which
  // is passed the class as `target`
  return function (target:any) {
    console.log(target);
    target._pluginConfig = config;
  }
}