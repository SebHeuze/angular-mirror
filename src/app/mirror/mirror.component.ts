import {
  Component,
  OnInit
} from '@angular/core';

import { PluginSlotDirective } from '../lib/plugin/plugin-slot.directive';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'mirror',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [PluginSlotDirective],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ '/app/mirror/mirror.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: '/app/mirror/mirror.component.html'
})
export class MirrorComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.localState.value = '';
  }
}
