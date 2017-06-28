import { Component, OnInit } from '@angular/core';
import {
    UserService,
    ForumService,
    ApiService,
    CATEGORIES,
    POST, POSTS
} from './../../../../firebase-backend/firebase-backend.module';


@Component({
    selector: 'post-list-component',
    templateUrl: 'post-list.html'
})

export class PostListComponent implements OnInit {

    // post list
    posts: POSTS = [];


    constructor(
        public forum: ForumService,
        private api: ApiService,
        public user: UserService
    ) {
        this.loadPosts();
    }

    ngOnInit() { }

    loadPosts() {
        this.posts = [];
        this.forum.postData().once('value').then(s => {
            ;
            let obj = s.val();
            for (let k of Object.keys(obj)) {
                this.posts.unshift( this.forum.sanitizePost( obj[k] ) );
            }
        });
    }

}
