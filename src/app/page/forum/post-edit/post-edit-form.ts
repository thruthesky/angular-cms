import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'post-edit-form',
  templateUrl: './post-edit-form.html'
})
export class PostEditForm {
  title: string = "Modal Title !";
  content: string = "Modal Content";
  constructor(public activeModal: NgbActiveModal) {}
}

