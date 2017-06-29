import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  POST, CATEGORIES
} from './../../../../firebase-backend/functions/model/forum/forum.interface';
import {
  ForumService,
  UserService,
  ApiService
} from './../../../../firebase-backend/firebase-backend.module';


@Component({
  selector: 'post-edit-modal-content',
  templateUrl: './post-edit-modal-content.html'
})
export class PostEditModalContent implements AfterViewInit {
  post: POST;

  formGroup: FormGroup;

  categories: CATEGORIES = [];
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private forum: ForumService,
    public user: UserService,
    private api: ApiService
  ) {
    this.init();
  }


  ngAfterViewInit() {
    // this.init();
  }

  init() {

    // this.getCategories();

    this.formGroup = this.fb.group({
      subject: [],
      content: [],
      categories: [[]]
    });
  }

  setPost(post: POST) {
    this.post = post;
    this.formGroup.get('subject').setValue(post.subject);
    this.formGroup.get('content').setValue(post.content);
    this.formGroup.get('categories').setValue(post.categories);
    this.forum.getCategories()
      .then(categories => {
        this.categories = categories;
      })
      .catch(e => console.error(e));
  }

  checked(id) {
    if (this.post.categories.findIndex(v => v == id) !== -1) return true;
  }

  onChangeFormCategory($event) {
    let checked = $event.target.checked;
    let value = $event.target.value;
    let categoryArray = this.formGroup.get('categories').value;
    if (checked) { // add
      categoryArray.push(value);
    }
    else { // remove
      categoryArray = categoryArray.filter(v => v !== value)
    }
    this.formGroup.get('categories').setValue(categoryArray);
    console.log(this.formGroup.value);
  }


  onSubmitForm() {

        let form = <POST> this.formGroup.value;
        console.log("Going to create a post : ", form);

        form.uid = this.user.uid;
        form.name = this.user.name;
        form.key = this.post.key;
        form.secret = this.user.secretKey;

        this.api.post(form).subscribe(key => {
            console.log("Post create with key: ", key);
            // this.success.emit( <string><any>key );
            this.activeModal.close();
        }, e => {
            console.error(e);
            // console.log(e);
            // console.log(e.message);
        });
        
  }
}

