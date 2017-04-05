import { Component } from '@angular/core';
import { CustomRouterOutletDirective } from './lib/configloader/custom-router-outlet.directive';

@Component({
  selector: 'my-app',
  template: `<custom-router-outlet></custom-router-outlet>`,
  providers: [CustomRouterOutletDirective]
})
export class AppComponent  { }
