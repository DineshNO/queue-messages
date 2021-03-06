import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { QueueListComponent } from './queue-list/queue-list.component';
import { QueueRoutingModule } from './queue-routing.module';
import { QueueComponent } from './queue.component';
import { QueueEffects } from './store/queue.effects';
import { queueReducer } from './store/queue.reducer';

@NgModule({
  declarations: [
    QueueListComponent,
    QueueComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QueueRoutingModule,
    StoreModule.forFeature('queues', queueReducer),
    EffectsModule.forFeature([QueueEffects])
  ],
  exports: [

  ]
})
export class QueueModule { }
