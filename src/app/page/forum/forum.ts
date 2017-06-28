import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'forum-page',
    templateUrl: 'forum.html'
})

export class ForumPage implements OnInit {

    // category
    showCategory: boolean = false;
    onClickShowCategory = () => this.showCategory = !this.showCategory;

    // post create form
    showPostCreateForm: boolean = false;
    onClickCreatePost = () => this.showPostCreateForm = !this.showPostCreateForm;
    

    constructor(
        
    ) {

    }

    ngOnInit() { }

}