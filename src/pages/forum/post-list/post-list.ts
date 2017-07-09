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

import { PageScroll } from './../../../providers/page-scroll';



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


    // page scroll & pagination
    watch;
    pageSize: number = 10;
    paginationKey = null;
    inLoading: boolean = false;
    noMorePosts: boolean = false;


    //
    @Input() category: string;

    // category: string = 'all-categories';
    constructor(
        public app: AppService,
        private api: ApiService,
        public user: UserService,
        private edit: PostEditModal,
        private pageScroll: PageScroll
    ) {

        this.watchNewPost();
        this.watchUpdatePost();
    }


    ngOnInit() {
        this.watch = this.pageScroll.watch('body', 350).subscribe(e => this.loadPage(this.category));
    }

    ngOnDestroy() {
        this.watch.unsubscribe();
    }

    ngAfterViewInit() {

        this.loadPage(this.category, () => {
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
    loadPage(category, callback?) {
        console.log("loadPage: begin");
        if (this.noMorePosts) { console.log("No more posts..."); return; }
        if (this.inLoading) { console.log("In loading..."); return; }
        else this.inLoading = true;

        let o = {
            ref: this.app.forum.categoryPostRelation(category),
            key: this.paginationKey,
            size: this.pageSize + 1,
            keyOnly: true
        };

        this.app.forum.page(o)
            .then((posts: Array<string>) => {
                this.inLoading = false;
                let re = this.app.forum.pageHelper( o, posts );
                //if ( ! posts || posts.length == 0 || posts.length < o.size) this.noMorePosts = true;
                this.noMorePosts = re.noMorePosts;
                this.paginationKey = re.paginationKey;
                posts = re.posts;

                console.log("page: ", posts);
                posts.map(key => this.addPostAtBottom(key));
                // this.paginationKey = posts[posts.length - 1];
                console.log("paginationKey: ", this.paginationKey);
            })
            .catch(e => this.app.warning(e));
    };





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
        console.log(this.postKeys);
        this.postKeys.unshift(key);
        console.log(this.postKeys);
        this.updatePost(key, post);

        // this.posts.unshift(this.app.forum.sanitizePost(post));
    }
    addPostAtBottom(key: string, post?: POST) {
        this.postKeys.push(key);
        this.updatePost(key, post);
        if (post) this.postData[key] = post;
        else {
            this.app.forum.postData(key).once('value').then(s => {
                this.postData[key] = s.val();
            });
        }
    }

    /**
     * If a post has updated/edited.
     * @param key 
     * @param post 
     */
    updatePost(key, post) {
        if (post) this.postData[key] = post;
        else if (key) {
            this.app.forum.postData(key).once('value').then(s => {
                this.postData[key] = s.val();
            });
        }
        else console.error("updatePost() key and post are empty");
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
