import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostListComponent } from './post-list/post-list';




@Component({
    selector: 'forum-page',
    templateUrl: 'forum.html'
})

export class ForumPage implements OnInit, AfterViewInit {

    // category
    showCategory: boolean = false;
    onClickShowCategory = () => this.showCategory = !this.showCategory;

    // post create form
    showPostCreateForm: boolean = false;
    onClickCreatePost = () => this.showPostCreateForm = !this.showPostCreateForm;


    // forum category to list
    category: string = 'all-categories';


    //
    @ViewChild('postListComponent') postListComponent: PostListComponent;


    /**
     * To load post data dynamically.
     * If it is first load, then PostListComponent will use '@Input category'.
     * If it is not first load, then, PostListComponent.loadPosts() will be called to load posts data dynmically.
     */
    isFirstLoad: boolean = true;
    constructor(private route: ActivatedRoute) {
        console.log("ForumPage::constructor()");
        route.params
            .subscribe(param => {
                console.log(this.postListComponent);
                if (param['category']) {
                    this.category = param['category'];
                    if ( ! this.isFirstLoad ) this.postListComponent.loadPosts( this.category );
                    this.isFirstLoad = false;
                }
                console.log("ForumPage::constructor(). inside subscription: category: ", this.category);
            });
    }

    ngOnInit() { }
    ngAfterViewInit() {
        console.log("ngAfterViewInit() : ", this.category);
    }

}