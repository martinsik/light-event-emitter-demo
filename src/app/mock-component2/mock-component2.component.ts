import { Component, EventEmitter, Output } from '@angular/core';
import { EMISSIONS } from '../config';

@Component({
  selector: 'app-mock-component2',
  template: ``,
})
export class MockComponent2Component {

  @Output() out1 = new EventEmitter();

  constructor() { }

  startEmitting(): void {
    for (let i = 0; i < EMISSIONS; i++) {
      this.out1.next(i);
    }
  }

}
