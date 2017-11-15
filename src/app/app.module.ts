import { MirrorComponent } from './mirror/index';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { PluginService } from './lib/plugin/plugin.service';
import { PluginSlotDirective } from './lib/plugin/plugin-slot.directive';
import { CustomRouterOutletDirective } from './lib/configloader/custom-router-outlet.directive';

import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { ConfigService } from "./lib/configloader/config.service";
import AnnyangService from 'app/lib/voicerecognition/annyang.service';

@NgModule({
  imports:      [ BrowserModule, routing, HttpModule ],
  declarations: [ AppComponent, MirrorComponent, PluginSlotDirective, CustomRouterOutletDirective],
  bootstrap:    [ AppComponent ],
  providers: [
    PluginService,
    ConfigService,
    AnnyangService
  ]
})
export class AppModule { }
