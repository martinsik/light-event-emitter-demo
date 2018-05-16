import { Component, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { COMPONENTS } from '../config';

@Component({
  selector: 'app-mock-component1',
  template: ``,
})
export class MockComponent1Component implements AfterViewInit {

  @Input() index: number;
  @Output() out0 = new EventEmitter();
  @Output() out1 = new EventEmitter();
  @Output() out2 = new EventEmitter();
  @Output() out3 = new EventEmitter();
  @Output() out4 = new EventEmitter();
  @Output() out5 = new EventEmitter();
  @Output() out6 = new EventEmitter();
  @Output() out7 = new EventEmitter();
  @Output() out8 = new EventEmitter();
  @Output() out9 = new EventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    if (this.index === COMPONENTS - 1) {
      this.out0.next(this.index);
    }
  }

}
