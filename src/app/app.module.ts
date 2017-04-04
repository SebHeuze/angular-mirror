import { MirrorComponent } from './mirror/index';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { PluginService } from './lib/plugin/plugin.service';
import { PluginSlotDirective } from './lib/plugin/plugin-slot.directive';

import { routing } from './app.routes';
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, routing, HttpModule ],
  declarations: [ AppComponent, MirrorComponent,PluginSlotDirective],
  bootstrap:    [ AppComponent ],
  providers: [
    PluginSlotDirective,
    PluginService
  ]
})
export class AppModule { }
