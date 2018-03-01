import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { DataAccessService } from './data-access.service'
import { AppComponent } from './app.component';
import { SubmitReadingComponent } from './submit-reading/submit-reading.component';


@NgModule({
  declarations: [
    AppComponent,
    SubmitReadingComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [DataAccessService],
  bootstrap: [AppComponent]
})

export class AppModule { }