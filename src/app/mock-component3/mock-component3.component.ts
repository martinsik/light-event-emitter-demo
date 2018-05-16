import { AfterViewInit, Component, Input, Output } from '@angular/core';
import { COMPONENTS } from '../config';
import { LightEventEmitter } from 'light-event-emitter';

@Component({
  selector: 'app-mock-component3',
  template: ``,
})
export class MockComponent3Component implements AfterViewInit {

  @Input() index: number;
  @Output() out0 = new LightEventEmitter();
  @Output() out1 = new LightEventEmitter();
  @Output() out2 = new LightEventEmitter();
  @Output() out3 = new LightEventEmitter();
  @Output() out4 = new LightEventEmitter();
  @Output() out5 = new LightEventEmitter();
  @Output() out6 = new LightEventEmitter();
  @Output() out7 = new LightEventEmitter();
  @Output() out8 = new LightEventEmitter();
  @Output() out9 = new LightEventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    if (this.index === COMPONENTS - 1) {
      this.out0.next(this.index);
    }
  }

}
