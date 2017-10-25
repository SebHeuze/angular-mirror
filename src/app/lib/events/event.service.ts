import { Injectable, Output, EventEmitter } from '@angular/core';

/**
 * Event Service
 * 
 * @export
 * @class EventService
 */
@Injectable()
export class EventService {

    @Output() testEvent: EventEmitter<any> = new EventEmitter();

}
