import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutFactoryComponent } from './layout-factory/layout-factory.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from '../layout/layout.component'
import { LayoutResponseComponent } from './layout-factory/layout-response/layout-response.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './store/layout.effects';
import { layoutReducer } from './store/layout.reducer';
import { LayoutReplaceComponent } from './layout-replace/layout-replace.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutFactoryComponent,
    LayoutComponent,
    LayoutResponseComponent,
    LayoutReplaceComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('layout', layoutReducer),
    EffectsModule.forFeature([LayoutEffects])
  ]
})
export class LayoutModule { }
