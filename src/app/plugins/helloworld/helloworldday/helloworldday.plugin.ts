import { EventService } from './../../../lib/events/event.service';
import { Component, ViewEncapsulation, Inject, NgModule } from '@angular/core';
import { PluginData } from '../../../lib/plugin/plugin-data.model';

@Component({
    selector: 'helloworldday',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/plugins/helloworld/helloworldday/helloworldday.html'
})
export class HelloworlddayPluginComponent {
    public date: Date;
    public eventService: EventService;
    constructor(eventService: EventService) {
        this.eventService = eventService;
        this.date = new Date();

        this.eventService.testEvent.subscribe((message: String) => this.testEvent(message));
        console.log('Hello world day loaded');
    }

    testEvent(message: String) {
        console.log(message);
    }
}

@NgModule({
  declarations: [HelloworlddayPluginComponent]
})
export class HelloworlddayPluginModule {}
