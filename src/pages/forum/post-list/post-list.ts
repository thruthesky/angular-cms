import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { AppService } from './../../../providers/app.service';
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
    postKeys: Array<string> = [];
    postData: { [key: string]: POST } = {};


    // watch
    watchCount = 0;


    @Input() category: string;

    // category: string = 'all-categories';
    constructor(
        public app: AppService,
        private api: ApiService,
        public user: UserService,
        private edit: PostEditModal
    ) {

        this.watchNewPost();
        this.watchUpdatePost();
    }

    ngOnInit() { }
    ngAfterViewInit() {

        this.loadPosts(this.category, () => {
            // setTimeout(()=>
            //     (<HTMLElement>document.querySelector('#post-edit--Knm0MYprASJFrT3Fi_6'))
            //         .click(),
            //         1000);
        });

    }

    /**
     * This loads post data. It is also invoked by parent compoent.
     * 
     * @param category Category to load.
     * @param callback 
     */
    loadPosts(category, callback?) {
        this.postKeys = [];
        this.postData = {};
        console.log("Going to load forum-category: ", category);
        this.app.forum.categoryPostRelation(category).once('value').then(s => {
            console.log("post-keys: ");
            console.log(s.val());
            let postKeys = s.val();
            if ( postKeys ) Object.keys(s.val()).map(key => this.addPostOnTop(key));
        })
        .catch(e => this.app.warning( e ));


        // this.app.forum.postData().once('value').then(s => {
        //     let obj = s.val();
        //     for (let k of Object.keys(obj)) this.addPostOnTop(obj[k]);
        //     callback();
        // });
    }




    /**
     * If there is a new post, it adds on top.
     */
    watchNewPost() {
        this.app.forum.postData().orderByKey().limitToLast(1).on('child_added', snap => {
            if (this.watchCount++ == 0) return;
            let post = snap.val();
            if (post) this.addPostOnTop(snap.key, post);
            else console.error('Got child_changed event. But post is empty.');
        });
    }
    watchUpdatePost() {
        this.app.forum.postData().on('child_changed', snap => {
            let post = snap.val();
            console.log(`child chagned:`, post);
            if (post) this.updatePost(snap.key, post);
            else console.error('Got child_changed event. But post is empty.');
        });
    }

    /**
     * Adds a post on top of the fourm.
     * @param post Post
     */
    addPostOnTop(key: string, post?: POST) {
        this.postKeys.unshift(key);
        if (post) this.postData[key] = post;
        else {
            this.app.forum.postData(key).once('value').then(s => {
                this.postData[key] = s.val();
            });
        }

        // this.posts.unshift(this.app.forum.sanitizePost(post));
    }
    updatePost(key, post) {
        if (this.postData[key]) {
            this.postData[key] = post;
        }
        else console.error('UpdatePost:: But postData key not exists in container.');
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
