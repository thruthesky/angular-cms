import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { RouterModule, Routes } from '@angular/router';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ForumPage } from './forum';
import { ForumIndexComponent } from './index/index';
import { PostListComponent } from './post-list/post-list';
import { CategoriesComponent } from './categories/categories';
import { PostCreateComponent } from './post-create/post-create';
import { PostEditModal } from './post-edit/post-edit-modal';
import { PostEditModalContent } from './post-edit/post-edit-modal-content';
import { PostViewComponent } from './post-view/post-view';
import { CommentReplyComponent } from './comment-reply/comment-reply';
import { CommentListComponent } from './comment-list/comment-list';
import { CommentViewComponent } from './comment-view/comment-view';



const appRoutes: Routes = [
    { path: 'forum', component: ForumPage },
    { path: 'forum/:category', component: ForumPage }
];

@NgModule({
    declarations: [
        ForumPage,
        ForumIndexComponent,
        PostListComponent,
        CategoriesComponent,
        PostCreateComponent,
        PostEditModalContent,
        PostViewComponent,
        CommentReplyComponent,
        CommentListComponent,
        CommentViewComponent
    ],
    entryComponents: [
        PostEditModalContent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(appRoutes),
        NgbModule.forRoot()
    ],
    providers: [ PostEditModal ],
})
export class ForumPageModule { }
