import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { PluginData } from './plugin-data.model';
import { PluginPlacement } from './plugin-placement.model';
import { Http, Response }          from '@angular/http';

/**
 * PluginService used to manage plugins
 * 
 * @export
 * @class PluginService
 */
@Injectable()
export class PluginService {

    //List of all activated plugins
    private plugins: Array<PluginData>;

    //Allow to subscribe to plugins changes
    public change: ReplaySubject<PluginData[]>;


    constructor(private http: Http) {
        this.plugins = [];
        // Tracking change of plugin list
        this.change = new ReplaySubject<PluginData[]>();
        this.loadPlugins();
    }

    //Get plugins to load in specified slot
    public getPluginData(slot: String) {
        return this.plugins.reduce((components, pluginData) => {
            return components.concat(
                pluginData.config.placements
                .filter((placement: PluginPlacement) => placement.slot === slot)
                .map((placement: PluginPlacement) => new PluginData(placement, pluginData.instance, pluginData.config))
            );
        }, []);


    }

    //Load defaults plugins 
    private loadPlugins() {
        this.http.get('app/plugins.json')
        .map((res: Response) => res.json()).subscribe((res: any) => res.plugins.forEach((pluginUrl: String) =>
                this.loadPlugin(pluginUrl)
            )
        );
    }

    //Load particular Plugin
    private loadPlugin(url: String) {
        return System.import('app/plugins/' + url).then((pluginModule) => {
            const Plugin = pluginModule.default;
            const pluginData = {
                config: Plugin._pluginConfig,
                placement: new PluginPlacement(),
                instance: new Plugin()
            };
            this.plugins = this.plugins.concat([pluginData]);
            this.change.next(this.plugins);
        });
    }
}
