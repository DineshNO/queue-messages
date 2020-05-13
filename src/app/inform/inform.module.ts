import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InformResponseComponent } from './inform-response/inform-response.component';
import { InformRoutingModule } from './inform-routing.module';
import { InformComponent } from './inform.component';
import { InformEffects } from './store/inform.effects';
import { informReducer } from './store/inform.reducer';

@NgModule({
    declarations: [
        InformComponent,
        InformResponseComponent
    ],
    imports: [
        CommonModule,
        InformRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature('informCustomer', informReducer),
        EffectsModule.forFeature([InformEffects])
    ]
})
export class InformModule { }