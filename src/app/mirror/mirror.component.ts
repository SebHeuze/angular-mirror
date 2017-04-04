import {
  Component,
  OnInit
} from '@angular/core';

import { PluginSlotDirective } from '../lib/plugin/plugin-slot.directive';

@Component({
  selector: 'mirror',
  providers: [PluginSlotDirective],
  styleUrls: [ '/app/mirror/mirror.component.css' ],
  templateUrl: '/app/mirror/mirror.component.html'
})
export class MirrorComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public ngOnInit() {
    console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.localState.value = '';
  }
}
