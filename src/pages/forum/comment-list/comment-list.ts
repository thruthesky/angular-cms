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

}