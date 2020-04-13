import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'queues',
    loadChildren: () => import('./queue-list/queue-list.module').then(m => m.QueueListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
