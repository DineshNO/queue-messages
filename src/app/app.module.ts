import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { QueueModule } from './queue/queue.module';
import { QueueService } from './queue/queue.service';
import { DataService } from './shared/data.service';
import { QueueInterceptor } from './shared/queue.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QueueModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [
    QueueService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: QueueInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
