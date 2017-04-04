import { Type } from '@angular/core';
import { PluginConfig } from './plugin-config.decorator';

export class PluginPlacement {
    public slot:String;
    public priority:Number;
    public component:Type<any>;
}