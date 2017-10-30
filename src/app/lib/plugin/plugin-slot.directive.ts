import {
    Directive,
    Input,
    Inject,
    Compiler,
    ViewContainerRef,
    ComponentFactoryResolver,
    ReflectiveInjector,
    ComponentFactory,
} from '@angular/core';
import { PluginData } from './plugin-data.model';
import { PluginService } from './plugin.service';

/**
 * Slot where plugins will load
 * @export
 * @class PluginSlotDirective
 */
@Directive({
    selector: 'ngc-plugin-slot'
})
export class PluginSlotDirective {

    //Name of the plugin slot
    @Input() private name: any;

    //Contain list of loaded Plugins Components
    private componentRefs: any;

    //Used to sucribe to plugin's changes
    private pluginChangeSubscription: any;

    ngOnInit() {
        // Subscribing to changes on the plugin service and re-
        // initialize slot if needed
        this.pluginChangeSubscription =
        this.pluginService.change.subscribe(() => this.initialize());
    }

    constructor(private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private pluginService: PluginService,
                private compiler: Compiler) {
        this.componentRefs = [];
    }

    private initialize() {
        // First unload all existing components
        if (this.componentRefs.length > 0) {
            this.componentRefs.forEach(
                (componentRef: any) => componentRef.destroy()
            );
            this.componentRefs = [];
        }

        //Get pluginData that fit to that slot
        const pluginData = this.pluginService.getPluginData(this.name);
        
        //Sort using priority
        pluginData.sort(
        (a, b) => a.placement.priority < b.placement.priority ?
            1 : a.placement.priority > b.placement.priority ? -1 : 0);

        console.log("PluginSlotDirective initialized pluginData : " + pluginData.length);

        //Load each plugin    
        return Promise.all(
            pluginData.map((subPluginData: PluginData) =>
            this.instantiatePluginComponent(subPluginData))
        );
    }

    private instantiatePluginComponent(pluginData: PluginData) {
            return this.compiler.compileModuleAndAllComponentsAsync(pluginData.placement.component).then((moduleWithFactories) => {
            moduleWithFactories.componentFactories.forEach((componentFactory: ComponentFactory<any>) => {

            // Get the injector of the plugin slot parent component
            const contextInjector = this.viewContainerRef.parentInjector;
            console.log("ViewContainerRef" + this.viewContainerRef);
            // Preparing additional PluginData provider for the created
            // plugin component, allow to access parent plugin from components
            const providers = [
                { provide: PluginData, useValue: pluginData}
            ];

            // We're creating a new child injector and provide the
            // PluginData provider
            const childInjector = ReflectiveInjector
            .resolveAndCreate(providers, contextInjector);
            
            // Now we can create a new component using the plugin slot view
            // container and the resolved component factory
            const componentRef = this.viewContainerRef
                .createComponent(componentFactory, this.viewContainerRef.length, childInjector);
            this.componentRefs.push(componentRef);
            });
        });
    }
}
