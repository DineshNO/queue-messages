import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueueComponent } from './queue.component';

const queueRoutes: Routes = [
    {
        path: '', component: QueueComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(queueRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class QueueRoutingModule { }