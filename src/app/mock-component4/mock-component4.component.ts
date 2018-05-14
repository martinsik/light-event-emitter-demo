import { Component, OnInit, Output } from '@angular/core';
import { EMISSIONS } from '../config';
import { LightEventEmitter } from 'light-event-emitter';

@Component({
  selector: 'app-mock-component4',
  template: ``,
})
export class MockComponent4Component {

  @Output() out1 = new LightEventEmitter();

  constructor() { }

  startEmitting(): void {
    for (let i = 0; i < EMISSIONS; i++) {
      this.out1.next(i);
    }
  }

}
