import { NgForm, FormGroup } from '@angular/forms';
import { ExpenseService } from './../../../services/expense.service';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ie-toolbar',
  templateUrl: './ie-toolbar.component.html',
  styleUrls: ['./ie-toolbar.component.css']
})
export class IeToolbarComponent implements OnInit {
  @Output() onAdd = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onAddClick() {
    let dialogRef = this.dialog.open(IeToolbarDialogComponent);

    const sub = dialogRef.componentInstance.onAdd.subscribe((formData) => {
      this.onAdd.emit([formData]);
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  onDeleteClick() { 
    this.onDelete.emit();
  }
}

@Component({
  selector: 'app-ie-toolbar-dialog',
  templateUrl: './ie-toolbar-dialog.component.html'
})
export class IeToolbarDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<IeToolbarDialogComponent>) { }

  onAdd = new EventEmitter();

  frequencies = [
    { name: 'Monthly' },
    { name: 'Yearly' }
  ]

  ngOnInit() {
  }
  onAddClick(form: NgForm) {
    this.onAdd.emit(form.value);
    this.dialogRef.close();
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
