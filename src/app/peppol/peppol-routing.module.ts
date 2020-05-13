import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeppolComponent } from './peppol.component';

const peppolRoutes: Routes = [
  {
    path: '', component: PeppolComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(peppolRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PeppolRoutingModule { }
