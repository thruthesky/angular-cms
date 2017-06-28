import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { RouterModule, Routes } from '@angular/router';


import { ForumPage } from './forum';
import { ForumIndexComponent } from './index/index';
import { PostListComponent } from './post-list/post-list';
import { CategoriesComponent } from './categories/categories';
import { PostCreateComponent } from './post-create/post-create';



const appRoutes: Routes = [
    { path: 'forum', component: ForumPage }
];

@NgModule({
    declarations: [
        ForumPage,
        ForumIndexComponent,
        PostListComponent,
        CategoriesComponent,
        PostCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(appRoutes)
    ],
    providers: [],
})
export class ForumPageModule { }
