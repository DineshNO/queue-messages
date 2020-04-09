import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QueueListComponent } from './queue-list/queue-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QueueService } from './queue-list/queue.service';
import { QueueInterceptor } from './shared/queue.interceptor';
import { DataService } from './shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QueueListComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    QueueService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: QueueInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
