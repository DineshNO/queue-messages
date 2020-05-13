import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformResponseComponent } from './inform-response/inform-response.component';
import { InformComponent } from './inform.component';

const routes: Routes = [
    {
        path: '', component: InformComponent, children: [
            { path: 'details', component: InformResponseComponent } 
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class InformRoutingModule { }