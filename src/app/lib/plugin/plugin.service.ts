import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { PluginData } from './plugin-data.model';
import { PluginPlacement } from './plugin-placement.model';
import { Http, Response }          from '@angular/http';

@Injectable()
export class PluginService {

    private plugins:Array<PluginData>;
    public change:ReplaySubject<PluginData[]>;
    constructor(private http: Http) {
        this.plugins = [];
        // Tracking change of plugin list
        this.change = new ReplaySubject<PluginData[]>();
        this.loadPlugins();
    }

    public getPluginData(slot:String) {
        return this.plugins.reduce((components, pluginData) => {
            return components.concat(
                pluginData.config.placements
                .filter((placement:PluginPlacement) => placement.slot === slot)
                .map((placement:PluginPlacement) => new PluginData(pluginData.plugin, placement, pluginData.instance, pluginData.config))
            );
        }, []);


    }

    private loadPlugins() {
        this.http.get('app/plugins.json').map((res: Response) => res.json()).subscribe((res: any) => res.plugins.forEach((pluginUrl: String) =>
                this.loadPlugin(pluginUrl)
            )
        ); 
    }

    private loadPlugin(url: String) {
        return System.import('app/plugins/' + url).then((pluginModule) => {
            const Plugin = pluginModule.default;
            console.log("PluginModule " + pluginModule);
            console.log(pluginModule);
            const pluginData = {
                //url,
                plugin: Plugin,
                // Reading the meta data previously stored by the @Plugin
                // decorator
                config: Plugin._pluginConfig,
                placement: new PluginPlacement(),
                // Creates the plugin instance
                instance: new Plugin()
            };
            this.plugins = this.plugins.concat([pluginData]);
            this.change.next(this.plugins);
        });
    }

    
}