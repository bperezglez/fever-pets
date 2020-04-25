import { Component, EventEmitter, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';

import SortType from './sortable.interface';

@Component({
  selector: 'fever-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.scss']
  ,
   encapsulation: ViewEncapsulation.None
})
export class SortableComponent implements OnInit {
  @Input() name: String;
  @Input() order: String;
  @Input() sortable: Boolean;
  @Input() title: String;

  @Output() sorted: EventEmitter<SortType> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.order = this.order || null;
  }

  onSort() {
    this.order = this.order === 'desc' ? 'asc' : 'desc';

    this.sorted.emit({
      order: this.order,
      name: this.name,
    })
  }

}
