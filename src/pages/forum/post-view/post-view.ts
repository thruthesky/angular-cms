import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { POST, COMMENT } from './../../../firebase-backend/firebase-backend.module';
import { AppService } from './../../../providers/app.service';
@Component({
    selector: 'post-view-component',
    templateUrl: 'post-view.html'
})

export class PostViewComponent implements OnInit {
    @Input() post: POST;
    @Output() edit = new EventEmitter<POST>();
    constructor(
        public app: AppService
    ) {

    }

    ngOnInit() { }

    onCreate(newComment: COMMENT, parent: POST) {
        console.log("comment created", newComment);
        newComment.depth = 1;
        if (this.post['comments'] && this.post['comments'].length) this.post['comments'].unshift(newComment);
        else this.post['comments'] = [newComment];
    }

    get short() {
        if (this.app.lib.isToday(this.post.stamp)) return 'shortTime';
        else return 'y-MM-dd';
    }

}