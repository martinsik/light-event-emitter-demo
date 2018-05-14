import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MockComponent2Component } from './mock-component2/mock-component2.component';
import { MockComponent4Component } from './mock-component4/mock-component4.component';
import * as config from './config';

enum BenchmarkScenario {
  EventEmitterComponents1Binding,
  EventEmitterComponents5Bindings,
  EventEmitterEmissions,
  LightEventEmitterComponents1Binding,
  LightEventEmitterComponents5Bindings,
  LightEventEmitterEmissions,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  iterationsArray: number[];
  duration: Date;
  currentScenario: BenchmarkScenario;
  BenchmarkScenario = BenchmarkScenario;
  config = config;

  @ViewChild(MockComponent2Component) eventEmitterComponent: MockComponent2Component;
  @ViewChild(MockComponent4Component) lightEventEmitterComponent: MockComponent4Component;

  private started: Date;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) {
    this.iterationsArray = [];
    for (let i = 0; i < config.COMPONENTS; i++) {
      this.iterationsArray.push(i);
    }
  }

  runComponentBenchmark(scenario: BenchmarkScenario): void {
    this.currentScenario = null;

    setTimeout(() => {
      this.currentScenario = scenario;
      this.started = new Date();
      this.cdRef.markForCheck();

      switch (scenario) {
        case BenchmarkScenario.EventEmitterEmissions:
          this.eventEmitterComponent.startEmitting();
          break;

        case BenchmarkScenario.LightEventEmitterEmissions:
          this.lightEventEmitterComponent.startEmitting();
          break;
      }
    });
  }

  noopHandler(): void {
    // noop
  }

  componentCreated(): void {
    this.measureTime();
  }

  componentEmit(index: number): void {
    if (config.EMISSIONS - 1 === index) {
      this.measureTime();
    }
  }

  measureTime(): void {
    this.duration = new Date(new Date().getTime() - this.started.getTime());
    this.cdRef.markForCheck();
  }
}
