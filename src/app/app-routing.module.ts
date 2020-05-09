import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { InformComponent } from './inform/inform.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'inform',
    loadChildren: () => import('./inform/inform.module').then(m => m.InformModule)
  },
  {
    path: 'queues',
    loadChildren: () => import('./queue/queue.module').then(m => m.QueueModule)
  },
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
