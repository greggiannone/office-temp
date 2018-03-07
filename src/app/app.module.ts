import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { DataAccessService } from './data-access.service'
import { AuthInterceptorService } from './auth-interceptor.service'
import { AppComponent } from './app.component';
import { SubmitReadingComponent } from './submit-reading/submit-reading.component';
import { LoginComponent } from './login/login.component';
import { CurrentTempComponent } from './current-temp/current-temp.component';
import { SubmissionPanelComponent } from './submission-panel/submission-panel.component';
import { ReadingsChartComponent } from './readings-chart/readings-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    SubmitReadingComponent,
    LoginComponent,
    CurrentTempComponent,
    SubmissionPanelComponent,
    ReadingsChartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [DataAccessService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }