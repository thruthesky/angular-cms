import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostEditModalContent } from './post-edit-modal-content';
import { POST } from './../../../../firebase-backend/functions/model/forum/forum.interface';
interface POST_EDIT_DATA {
  post: POST;
  success: (key: string) => void;
  error: (e) => void;
  cancel: (key: string) => void;
}

@Injectable()
export class PostEditModal {
  modalRef = null;

  constructor(private modalService: NgbModal) {
  }

  open( data ): NgbModalRef {

    if ( this.modalRef ) this.modalRef.close();
    
    this.modalRef = this.modalService.open( PostEditModalContent );
    let content: PostEditModalContent = this.modalRef.componentInstance;
    content.setPost( data.post );
    this.modalRef.result.then((result) => {
      console.log("Going to edit post");

    }, (reason) => {
      data.cancel( data.post.key );
    });

    return this.modalRef;
  }

}
