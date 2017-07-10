import { Component, OnInit, Input } from '@angular/core';
import { COMMENT } from './../../../firebase-backend/firebase-backend.module';
@Component({
    selector: 'comment-list-component',
    templateUrl: 'comment-list.html'
})

export class CommentListComponent implements OnInit {
    @Input() comments: Array<COMMENT>;
    constructor() { }

    ngOnInit() { }


    onCreate( newComment: COMMENT, parent: COMMENT ) {
        console.log("comment created", newComment);
        let path = newComment.path;
        let paths = path.split('/');
        paths.pop();
        let parentPath = paths.join('/');
        if ( this.comments && this.comments.length ) {
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