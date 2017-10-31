import { PluginService } from './../plugin/plugin.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Config Service
 * 
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
	private _config: Object;
	private _pluginConfig: Object;

	public dataLoaded: Boolean

	constructor(private http: Http) {
		this.dataLoaded = false;
		this._pluginConfig = {};
		this._config = {};
	}
	
	load() {
		return new Promise((resolve, reject) => {
			this.http.get('config.json')
				.map(res => res.json())
				.catch((error: any) => {
					console.error(error);
					return Observable.throw(error.json().error || 'Server error');
				})
				.subscribe((data) => {
					console.log("config.json loaded");
					this._config = data;
					resolve(true);
				});
		});
	}

	loadPluginConfig(pluginName: string, configUrl: string, pluginService: PluginService) {
		this.http.get("app/plugins/" + pluginName + '/' + configUrl)
			.map(res => res.json())
			.catch((error: any) => {
				console.error(error);
				return Observable.throw(error.json().error || 'Server error');
			})
			.subscribe((data) => {
				console.log(configUrl + ' loaded');
				this._pluginConfig[pluginName] = data;
				if (Object.keys(this._pluginConfig).length === pluginService.plugins.length) {
					pluginService.pluginLoaded();
				}
			});
	}

	//Main config before plugin Config
	get(key: any) {
		return this._config[key] != null ?  this._config[key] : this._pluginConfig[key];
	}
}