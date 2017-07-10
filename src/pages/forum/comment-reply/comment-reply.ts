import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    COMMENT,
    ApiService
} from './../../../firebase-backend/firebase-backend.module';

import { AppService } from './../../../providers/app.service';


@Component({
    selector: 'comment-reply-component',
    templateUrl: 'comment-reply.html'
})

export class CommentReplyComponent implements OnInit {

    @Input() path: string;
    @Output() create = new EventEmitter<COMMENT>();

    content: string;

    constructor(
        public app: AppService,
        private api: ApiService
    ) { }

    ngOnInit() { }

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