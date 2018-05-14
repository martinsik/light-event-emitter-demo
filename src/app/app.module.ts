import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MockComponent1Component } from './mock-component1/mock-component1.component';
import { MockComponent2Component } from './mock-component2/mock-component2.component';
import { MockComponent3Component } from './mock-component3/mock-component3.component';
import { MockComponent4Component } from './mock-component4/mock-component4.component';

@NgModule({
  declarations: [
    AppComponent,
    MockComponent1Component,
    MockComponent2Component,
    MockComponent3Component,
    MockComponent4Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
