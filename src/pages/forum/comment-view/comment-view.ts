import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { COMMENT, COMMENTS, PROFILE } from './../../../firebase-backend/firebase-backend.module';
import { AppService } from './../../../providers/app.service';
@Component({
    selector: 'comment-view-component',
    templateUrl: 'comment-view.html'
})

export class CommentViewComponent implements OnInit, AfterViewInit {
    @Input() comment: COMMENT;
    @Input() comments: COMMENTS;
    showCommentForm: boolean = false;
    constructor(
        public app: AppService
    ) { }

    ngOnInit() { }


    ngAfterViewInit() {
        setTimeout(() => this.afterChangeDetection(), 1);
    }

    afterChangeDetection() {
        this.app.user.getUserProfile( this.comment.uid ).then( (user: PROFILE) => {
            this.comment.user = user;
        })
        .catch( e => this.app.warning(e) );
    }


    get short() {
        if (this.app.lib.isToday(this.comment.stamp)) return 'shortTime';
        else return 'y-MM-dd';
    }

    onCreate( newComment: COMMENT, parent: COMMENT ) {
        console.log("comment created", newComment);
        let path = newComment.path;
        let paths = path.split('/');
        paths.pop();
        let parentPath = paths.join('/');
        if ( this.comments && this.comments.length) {
            console.log(this.comments);
            let re = this.comments.findIndex( v => v.path == parentPath );
            if ( re == -1 ) this.comments.unshift( newComment );
            else {
                newComment.depth = parent.depth + 1;
                this.comments.splice( re + 1, 0, newComment );
            }
        }
        else this.comments = [ newComment ];
    }
}