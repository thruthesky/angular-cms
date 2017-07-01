import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { RouterModule, Routes } from '@angular/router';


import { ForumPage } from './forum';
import { ForumIndexComponent } from './index/index';
import { PostListComponent } from './post-list/post-list';
import { CategoriesComponent } from './categories/categories';
import { PostCreateComponent } from './post-create/post-create';
import { PostEditModal } from './post-edit/post-edit-modal';
import { PostEditModalContent } from './post-edit/post-edit-modal-content';



const appRoutes: Routes = [
    { path: 'forum', component: ForumPage }
];

@NgModule({
    declarations: [
        ForumPage,
        ForumIndexComponent,
        PostListComponent,
        CategoriesComponent,
        PostCreateComponent,
        PostEditModalContent
    ],
    entryComponents: [
        PostEditModalContent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(appRoutes)
    ],
    providers: [ PostEditModal ],
})
export class ForumPageModule { }
