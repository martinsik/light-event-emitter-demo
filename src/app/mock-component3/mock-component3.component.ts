import { AfterViewInit, Component, Input, Output } from '@angular/core';
import { COMPONENTS } from '../config';
import { LightEventEmitter } from 'light-event-emitter';

@Component({
  selector: 'app-mock-component3',
  template: ``,
})
export class MockComponent3Component implements AfterViewInit {

  @Input() index: number;
  @Output() out1 = new LightEventEmitter();
  @Output() out2 = new LightEventEmitter();
  @Output() out3 = new LightEventEmitter();
  @Output() out4 = new LightEventEmitter();
  @Output() out5 = new LightEventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    if (this.index === COMPONENTS - 1) {
      this.out1.next(this.index);
    }
  }

}
