import { Directive, Attribute, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router, RouterOutlet, RouterOutletMap, ActivatedRoute } from '@angular/router';
import { ConfigService } from './config.service';
import {PluginService} from './../plugin/plugin.service';
/**
 * Used to be sure to load config service before loading views
 * 
 * @export
 * @class CustomRouterOutletDirective
 * @extends {RouterOutlet}
 */
@Directive({
	selector: 'custom-router-outlet'
})
export class CustomRouterOutletDirective extends RouterOutlet {
	publicRoutes: any;
	private parentRouter: Router;
	constructor(_routeurOutletMap: RouterOutletMap, location: ViewContainerRef, _loader: ComponentFactoryResolver,
		@Attribute('name') nameAttr: string, private _config: ConfigService, private _pluginService: PluginService) {
		super(_routeurOutletMap, location, _loader, nameAttr);
	}
	activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null, outletMap: RouterOutletMap) {
		return this._config.load().then(() => {
			 return this._pluginService.loadPlugins().then( () => { return super.activateWith(activatedRoute, resolver, outletMap) });
			})
	}
}