import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {
    UserService,
    ForumService,
    ApiService,
    CATEGORIES,
    POST, POSTS
} from './../../../../firebase-backend/firebase-backend.module';

import { Alert } from './../../../provider/bootstrap/bootstrap-module';

@Component({
    selector: 'categories-component',
    templateUrl: 'categories.html'
})

export class CategoriesComponent implements OnInit {

    // category
    categoryFormGroup: FormGroup;
    categories: CATEGORIES = [];
    categoryError: string = '';


    constructor(
        private fb: FormBuilder,
        public user: UserService,
        public forum: ForumService,
        private api: ApiService
    ) {
        this.initCategoryForm();
        this.runReactiveCategoryUpdate();
    }

    ngOnInit() { }

    initCategoryForm() {
        this.categoryFormGroup = this.fb.group({
            id: [],
            name: []
        });
    }
    
    onCategoryFormSubmit() {
        console.log(this.categoryFormGroup.value);

        this.forum.createCategory(this.categoryFormGroup.value)
            .then(id => console.log("Category Create Success: ", id))
            .catch(e => console.log(e));

    }



    runReactiveCategoryUpdate() {
        this.forum.observeCategory().subscribe(res => {
            console.log(res);
            this.categories = res;
            // this.postFormGroup.get('categories').setValue( this.categories );
            // console.log( this.postFormGroup.value );
        });
    }


    onClickCategoryEdit(id) {
        console.log(`Going to edit: ${id}`);
        let c = this.categories.find(v => v.id == id);
        console.log(c);

        let category = { id: c.id, name: c['name'], description: c['description'] };
        this.forum.editCategory(category)
            .then(category_id => { })
            .catch(e => this.categoryError = e.message);
    }



    onClickCategoryDelete(id) {

        this.forum.deleteCategory(id)
            .then(() => { })
            .catch(e => this.categoryError = e.message);

        // this.forum.deleteCategory( id, () => console.log("Category deleted"), e => console.error(e) );

    }







}