import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import {
    COMMENT, POST, PROFILE,
    ApiService
} from './../../../firebase-backend/firebase-backend.module';

import { AppService } from './../../../providers/app.service';


@Component({
    selector: 'comment-reply-component',
    templateUrl: 'comment-reply.html'
})

export class CommentReplyComponent implements OnInit, AfterViewInit {

    @Input() path: string;
    @Output() create = new EventEmitter<COMMENT>();


    @Input() post: POST = null;         // if parent is a post, then it will have post.
    @Input() comment: COMMENT = null;   // if parent is a comment, then it will have that comment.

    user: PROFILE = null;

    content: string;

    constructor(
        public app: AppService,
        private api: ApiService
    ) {
        
    }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(()=>this.afterChangeDetection(), 1);
    }

    afterChangeDetection() {
        if ( this.post && this.post.user ) this.user = this.post.user;
        else if ( this.comment && this.comment.user ) this.user = this.comment.user;
        else this.user = null;
    }

    onClickSubmit() {
        let comment: COMMENT = {
            function: 'createComment',
            path: this.path,
            uid: this.app.user.uid,
            secret: this.app.user.secretKey,
            content: this.content
        };
        this.api.post(comment).subscribe(res => {
            if ( res['code'] != 0 ) return this.app.warning( res['message'] );

            let path = res['data'];
            console.log("Path: ", path);
            this.app.forum.getComments( path )
            .then( comment => {
                this.create.emit( comment );
            })
            .catch( e => this.app.warning(e));
        },
        e => this.app.warning(e));
    }
}