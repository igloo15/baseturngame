import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  stateUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
