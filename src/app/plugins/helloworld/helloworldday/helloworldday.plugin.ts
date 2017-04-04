import { Component, ViewEncapsulation, Inject, NgModule } from '@angular/core';
import { PluginData } from '../../../lib/plugin/plugin-data.model';

@Component({
    selector: 'helloworldday',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/helloworld/helloworldday/helloworldday.html'
})
export class HelloworlddayPluginComponent {
    public date:Date;
    constructor() {
        this.date = new Date();
        console.log('Hello world day loaded');
    }
}

@NgModule({
  declarations: [HelloworlddayPluginComponent]
})
export class HelloworlddayPluginModule {}
