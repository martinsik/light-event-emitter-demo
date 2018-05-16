import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MockComponent2Component } from './mock-component2/mock-component2.component';
import { MockComponent4Component } from './mock-component4/mock-component4.component';
import * as config from './config';

enum BenchmarkScenario {
  EventEmitterComponents1Binding,
  EventEmitterComponents5Bindings,
  EventEmitterComponents10Bindings,
  EventEmitterEmissions,
  LightEventEmitterComponents1Binding,
  LightEventEmitterComponents5Bindings,
  LightEventEmitterComponents10Bindings,
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
  results: { [key: number]: number[] };
  activePromise: Promise<number>;
  resolveActiveBenchmark: (value: number) => void;

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

  async run() {
    const results = {};

    for (const enumMember of Object.keys(BenchmarkScenario)) {
      const intVal = parseInt(enumMember, 10);

      if (intVal >= 0) {
        results[intVal] = [];

        for (let run = 0; run < config.RUNS; run++) {
          const duration = await this.runComponentBenchmark(intVal);
          results[intVal].push(duration);
        }
      }
    }

    this.results = results;
    console.log(this.results);
  }

  async runComponentBenchmark(scenario: BenchmarkScenario): Promise<number> {
    console.log('starting', scenario);
    this.activePromise = new Promise((resolve, reject) => this.resolveActiveBenchmark = resolve);

    setTimeout(() => {
      this.currentScenario = null;
      this.cdRef.markForCheck(); // Let Angular remove previous components

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
    });

    return this.activePromise;
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
    const duration = new Date().getTime() - this.started.getTime();
    this.resolveActiveBenchmark(duration);
    this.cdRef.markForCheck();
  }

  calculateAverage(scenario: BenchmarkScenario): Date {
    const results = this.results[scenario];
    return new Date(results.reduce((acc, value) => acc + value, 0) / results.length);
  }
}
