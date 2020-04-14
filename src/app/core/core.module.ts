import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations : [
        HeaderComponent,
        HomeComponent
    ],
    imports:[
        CommonModule,
        AppRoutingModule
    ],
    exports:[
        AppRoutingModule,
        HeaderComponent
    ],
    providers:[]
})
export class CoreModule{
}