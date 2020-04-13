import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QueueListModule } from './queue-list/queue-list.module';
import { QueueService } from './queue-list/queue.service';
import { DataService } from './shared/data.service';
import { QueueInterceptor } from './shared/queue.interceptor';
import { HomeComponent } from './core/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppEffects } from './store/app.effect';
import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QueueListModule,
    StoreModule.forRoot({queues : appReducer}),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    QueueService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: QueueInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
