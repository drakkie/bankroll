import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ie-viewer',
  templateUrl: './ie-viewer.component.html',
  styleUrls: ['./ie-viewer.component.css']
})
export class IeViewerComponent implements OnInit {
  @Input() rows: any[];
  @Output() onDelete = new EventEmitter();
  selected = [];
  constructor() { }

  ngOnInit() {
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onDeleteClick(selectedRows){
    this.onDelete.emit(selectedRows);
  }
}
