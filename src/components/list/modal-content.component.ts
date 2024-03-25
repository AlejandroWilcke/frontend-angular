import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-content',
  styleUrl: './modal-content.component.css',
  template: `
    <div class='modal-container'>
      <div class="modal-header">
        <h4 class="modal-title">{{ title }}</h4>
        <button type="button" class="btn btn-success close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img class="modal-image" src={{imageUrl}} alt="Product Image not found">
        <p>{{ category }}</p>
        <p>{{ description }}</p>
        <div class="modal-bottom">
          <div>Price</div>
          <div>&dollar;{{ price }}</div>
        </div>
      </div>
    </div>
  `
})
export class ModalContentComponent {
  @Input() title: string;
  @Input() imageUrl: string;
  @Input() description: string;
  @Input() price: string;
  @Input() category: string;
  
  constructor(public modal: NgbActiveModal) {}
}
