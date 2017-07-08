import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {
    ApiService,
    CATEGORIES,
    POST, POSTS
} from './../../../firebase-backend/firebase-backend.module';

import { Alert } from './../../../providers/bootstrap/bootstrap-module';
import { AppService } from './../../../providers/app.service';
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
        //public user: UserService,
        //public forum: ForumService,
        private api: ApiService,
        public app: AppService
    ) {
        this.initCategoryForm();
        this.loadCategory();
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

        this.app.forum.createCategory(this.categoryFormGroup.value)
            .then(id => {
                console.log("Category Create Success: ", id);
                this.reloadCategory();
            })
            .catch(e => this.app.warning(e) );
    }


    loadCategory() {
        this.app.forum.getCategories()
            .then( categories => this.categories = categories )
            .catch( e => console.error(e) );
    }

    reloadCategory() {
        this.loadCategory();
    }


    onClickCategoryEdit(id) {
        console.log(`Going to edit: ${id}`);
        let c = this.categories.find(v => v.id == id);
        console.log(c);

        let category = { id: c.id, name: c['name'], description: c['description'] };
        this.app.forum.editCategory(category)
            .then(category_id => {
                this.reloadCategory();
            })
            .catch(e => this.categoryError = e.message);
    }

    onClickCategoryDelete(id) {

        this.app.forum.deleteCategory(id)
            .then(() => {
                this.reloadCategory();
            })
            .catch(e => this.categoryError = e.message);
    }







}