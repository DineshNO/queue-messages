import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueueListComponent } from './queue-list.component';

const queueRoutes: Routes = [
    {
        path: '', component: QueueListComponent
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