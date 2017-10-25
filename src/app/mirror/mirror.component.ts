import { EventService } from './../lib/events/event.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

import { PluginSlotDirective } from '../lib/plugin/plugin-slot.directive';


@Component({
  selector: 'mirror',
  providers: [PluginSlotDirective, EventService],
  styleUrls: [ '/app/mirror/mirror.component.css' ],
  templateUrl: '/app/mirror/mirror.component.html'
})
export class MirrorComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }
  public ngOnInit() {
    console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.localState.value = '';
  }

  public emitTestEvent() {
    console.log('Test event triggered');
    this.eventService.testEvent.emit('YOUHOU');
  }
}
