import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
    UserService,
    ForumService,
    ApiService,
    CATEGORIES,
    POST, POSTS
} from './../../../firebase-backend/firebase-backend.module';


@Component({
    selector: 'post-create-component',
    templateUrl: 'post-create.html'
})

export class PostCreateComponent implements OnInit {


    // post create form names
    subject: string;
    content: string;
    categories = {};
    dbCategories: CATEGORIES
    

    postError: string = '';


    @Output() success: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public user: UserService,
        private api: ApiService,
        private forum: ForumService
    ) {
        console.log("PostCreateCompoennt::constructor() begins");
        this.init();
    }

    ngOnInit() {

    }


    init() {

        this.getCategories();

    }


    getCategories() {
        this.forum.getCategories()
            .then(categories => this.dbCategories = categories)
            .catch(e => console.error(e));
    }


    onSubmitPostForm() {
        let post: POST = {
            function: 'createPost',
            uid: this.user.uid,
            secret: this.user.secretKey,
            name: this.user.profile.name,
            categories: this.getFormCategories(),
            subject: this.subject,
            content: this.content
        };
        console.log(this.categories);
        console.log("Going to create a post : ", post);

        this.api.post(post).subscribe(key => {
            console.log("Post create with key: ", key);
            this.success.emit(<string><any>key);
        }, e => {
            console.error(e);
            // console.log(e);
            // console.log(e.message);
        });
    }

    getFormCategories(): Array<string> {
        let re = [];
        if ( ! this.categories ) return re;
        for ( let c of Object.keys(this.categories) ) {
            if ( this.categories[c] ) re.push( c );
        }
        return re;
    }


}