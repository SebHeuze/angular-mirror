import { Forecast } from './forecast.model';
import { PluginData } from './../../../lib/plugin/plugin-data.model';
import { Component, ViewEncapsulation, NgModule, Inject } from '@angular/core';
import { ConfigService } from '../../../lib/configloader/config.service';
import { DarkSkyService } from './darksky.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'weather',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/weather/weather/weather.html',
    providers: [DarkSkyService]    
})
export class WeatherPluginComponent{
    private plugin: any;
    private key: string;
    private temperature: number;
    private summary: string;

    constructor(private _config:ConfigService, private darkskyService: DarkSkyService, @Inject(PluginData) private pluginData: PluginData) {
        this.plugin = this.pluginData.instance;  
        this.darkskyService.callForecast().subscribe((result: Forecast) => {
            this.temperature = result.currently.temperature;
            this.summary = result.currently.summary;
        });
        }
    }

}

@NgModule({
  imports: [CommonModule],
  declarations: [WeatherPluginComponent]
})
export class WeatherPluginModule {}
