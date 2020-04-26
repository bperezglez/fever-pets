import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fever-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagination: any;

  @Output() paginated: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onPaginationClick(link) {
    this.paginated.emit({link});
  }

}
