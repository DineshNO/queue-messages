import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutFactoryComponent } from './layout-factory/layout-factory.component';
import { LayoutResponseComponent } from './layout-factory/layout-response/layout-response.component';
import { LayoutStartComponent } from './layout-start/layout-start.component';
import { LayoutReplaceComponent } from './layout-replace/layout-replace.component';

const layoutRoutes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: LayoutStartComponent } ,
            { path: 'resend', component: LayoutResponseComponent } ,
            { path: 'replace', component: LayoutReplaceComponent } 
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(layoutRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule { }