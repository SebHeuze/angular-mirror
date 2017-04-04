import { Type } from '@angular/core';
import { PluginConfig } from './plugin-config.decorator';

/**
 * Module placement used in PluginConfig
 * 
 * @export
 * @class PluginPlacement
 */
export class PluginPlacement {
    public slot:String;
    public priority:Number;
    public component:Type<any>;
}