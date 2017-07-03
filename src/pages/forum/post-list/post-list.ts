import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
    UserService,
    ForumService,
    ApiService,
    CATEGORIES,
    POST, POSTS
} from './../../../firebase-backend/firebase-backend.module';

import { PostEditModal } from './../post-edit/post-edit-modal';


@Component({
    selector: 'post-list-component',
    templateUrl: 'post-list.html'
})

export class PostListComponent implements OnInit, AfterViewInit {

    // post list
    posts: POSTS = [];


    // watch
    watchCount = 0;

    constructor(
        public forum: ForumService,
        private api: ApiService,
        public user: UserService,
        private edit: PostEditModal
    ) {
        this.loadPosts(() => {
            // setTimeout(()=>
            //     (<HTMLElement>document.querySelector('#post-edit--Knm0MYprASJFrT3Fi_6'))
            //         .click(),
            //         1000);
        });


        this.watchNewPost();
    }

    ngOnInit() { }
    ngAfterViewInit() {

    }

    loadPosts(callback) {
        this.posts = [];
        this.forum.postData().once('value').then(s => {
            let obj = s.val();
            for (let k of Object.keys(obj)) this.addPostOnTop(obj[k]);
            callback();
        });
    }

    watchNewPost() {
        this.forum.postData().orderByKey().limitToLast(1).on('child_added', snap => {
            if (this.watchCount++ == 0) return;
            let post = snap.val();
            this.addPostOnTop( post );
        });
    }

    /**
     * Adds a post on top of the fourm.
     * @param post Post
     */
    addPostOnTop(post: POST) {
        this.posts.unshift(this.forum.sanitizePost(post));
    }


    onClickPostEdit(post: POST) {
        this.edit.open({
            post: post,
            success: key => console.log(`post edit success: ${key}`),
            cancel: key => console.log(`post edit cancel: ${key}`),
            error: e => console.error(e)
        });
    }

}
