import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InformComponent } from './inform.component';
import { InformRoutingModule } from './inform-routing.module';

@NgModule({
    declarations: [
        InformComponent
    ],
    imports: [
        CommonModule,
        InformRoutingModule  
    ]
})
export class InformModule {}