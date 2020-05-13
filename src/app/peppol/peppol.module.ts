import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeppolRoutingModule } from './peppol-routing.module';
import { PeppolComponent } from './peppol.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { peppolReducer } from './store/peppol.reducer';

@NgModule({
  declarations: [
    PeppolComponent
  ],
  imports: [
    CommonModule,
    PeppolRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('peppolState', peppolReducer)
  ]
})
export class PeppolModule { }
