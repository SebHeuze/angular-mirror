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
@Directive({
    selector: 'ngc-plugin-slot'
})
export class PluginSlotDirective {
    @Input() private name: any;
    private pluginService: PluginService;
    private viewContainerRef: ViewContainerRef;
    private componentRefs: any;
    private pluginChangeSubscription: any;
    private componentFactoryResolver: ComponentFactoryResolver;
    private compiler: Compiler;

    constructor(@Inject(ViewContainerRef) viewContainerRef: ViewContainerRef,
                @Inject(ComponentFactoryResolver) componentFactoryResolver: ComponentFactoryResolver,
                @Inject(PluginService) pluginService: PluginService,
                @Inject(Compiler) compiler: Compiler) {
        this.compiler = compiler;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.pluginService = pluginService;
        this.componentRefs = [];
        // Subscribing to changes on the plugin service and re-
        // initialize slot if needed
        this.pluginChangeSubscription =
            this.pluginService
            .change.subscribe(() => this.initialize());
    }

    private initialize() {
        if (this.componentRefs.length > 0) {
            this.componentRefs.forEach(
                (componentRef: any) => componentRef.destroy()
            );
            this.componentRefs = [];
        }
        const pluginData = this.pluginService.getPluginData(this.name);
        console.log(pluginData);
        pluginData.sort(
        (a, b) => a.placement.priority < b.placement.priority ?
            1 : a.placement.priority > b.placement.priority ? -1 : 0);
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
            // Preparing additional PluginData provider for the created
            // plugin component 
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
