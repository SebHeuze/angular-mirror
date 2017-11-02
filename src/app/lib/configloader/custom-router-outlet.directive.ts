import { Directive, Attribute, ElementRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef  } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, ChildrenOutletContexts} from '@angular/router';
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
	constructor(_parentContexts: ChildrenOutletContexts, location: ViewContainerRef, resolver: ComponentFactoryResolver, @Attribute("name") name: string, changeDetector: ChangeDetectorRef,
		 private _config: ConfigService, private _pluginService: PluginService) {
		super(_parentContexts, location, resolver, name, changeDetector);
	}
	activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
		return this._config.load().then(() => {
			 return this._pluginService.loadPlugins().then( () => { return super.activateWith(activatedRoute, resolver) });
			})
	}
}