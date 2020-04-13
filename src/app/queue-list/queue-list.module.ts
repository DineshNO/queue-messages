import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QueueListComponent } from './queue-list.component';
import { QueueRoutingModule } from './queue-routing.module';

@NgModule({
  declarations: [
    QueueListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QueueRoutingModule
  ]
})
export class QueueListModule { }
