import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueueListComponent} from './queue-list/queue-list.component'

const routes: Routes = [
  { path: 'queues', component: QueueListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
