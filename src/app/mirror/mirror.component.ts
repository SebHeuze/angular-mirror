import { EventService } from './../lib/events/event.service';
import { ConfigService } from './../lib/configloader/config.service';
import { PluginService } from './../lib/plugin/plugin.service';

import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'mirror',
  providers: [EventService],
  styleUrls: [ '/app/mirror/mirror.component.css' ],
  templateUrl: '/app/mirror/mirror.component.html'
})
export class MirrorComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  constructor(private eventService: EventService, private configService: ConfigService, private pluginService: PluginService) {
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
    this.configService.dataLoaded = true;
    this.eventService.testEvent.emit('YOUHOU');
  }
}
