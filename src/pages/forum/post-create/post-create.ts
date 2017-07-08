import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
    UserService,
    ForumService,
    ApiService,
    CATEGORIES,
    POST, POSTS
} from './../../../firebase-backend/firebase-backend.module';

import { AppService } from './../../../providers/app.service';


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


    /// file
    files: Array<string> = []; // urls.
    percentage: number = 0;



    /// error
    postError: string = '';


    @Output() success: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public app: AppService,
        // public user: UserService,
        private api: ApiService,
        // private forum: ForumService
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
        this.app.forum.getCategories()
            .then(categories => this.dbCategories = categories)
            .catch(e => this.app.alert(e));
    }


    onSubmitPostForm() {
        let post: POST = {
            function: 'createPost',
            uid: this.app.user.uid,
            secret: this.app.user.secretKey,
            name: this.app.user.profile.name,
            categories: this.getFormCategories(),
            subject: this.subject,
            content: this.content,
            files: this.files
        };
        console.log(this.categories);
        console.log("Going to create a post : ", post);

        this.api.post(post).subscribe(key => {
            console.log("Post create with key: ", key);
            this.success.emit(<string><any>key);
        }, e => {

            console.error(e);
            this.app.warning(e);
            // console.log(e);
            // console.log(e.message);
        });
    }

    getFormCategories(): Array<string> {
        let re = [];
        if (!this.categories) return re;
        for (let c of Object.keys(this.categories)) {
            if (this.categories[c]) re.push(c);
        }
        return re;
    }

    onChangeFile(event) {

        if (event === void 0 || event.target === void 0 || event.target.files === void 0) {
            console.log("No file was selected.");
            return;
        }
        let files = event.target.files;
        if (files === void 0 || files[0] == void 0 || !files[0]) {
            console.log("No file was selected or file does not exists.");
            return;
        }
        let file = files[0];

        console.log(file);

        let filename = this.app.getSafeStorageReferencePath(file.name);


        this.app.upload(filename, file,
            url => {
                this.files.push( url );
                console.log("File upload success: ", url);
            },
            e => console.error(e),
            p => {
                this.percentage = p;
                console.log(`File is uploaded by: ${p} %`);
            }
        );

    }


}