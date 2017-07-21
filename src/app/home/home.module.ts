import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';



import { HomePage } from './home';


@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class HomeModule { }
