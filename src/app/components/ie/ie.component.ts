import { IeViewerComponent } from './ie-viewer/ie-viewer.component';
import { GoalService } from './../../services/goal.service';
import { IeToolbarComponent } from './ie-Toolbar/ie-Toolbar.component';
import { ExpenseService } from './../../services/expense.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ie',
  templateUrl: './ie.component.html',
  styleUrls: ['./ie.component.css']
})
export class IeComponent implements OnInit {
  constructor(private expense_service: ExpenseService, private goal_service: GoalService) { }
  @ViewChild('expenseViewer') expenseViewer: IeViewerComponent;
  @ViewChild('goalViewer') goalViewer: IeViewerComponent;

  ngOnInit() {
  }

  addExpense(value) {
    this.expense_service.add(value);
  }

  deleteExpense(value) {
    console.log('delete expense');
    console.log(this.expenseViewer.selected);
    this.expense_service.delete(this.expenseViewer.selected);
  }

  addGoal(value) {
    this.goal_service.add(value);
  }

  deleteGoal(value) {
    console.log(value);
    console.log(this.goalViewer.selected);

    this.goal_service.delete(this.goalViewer.selected);
  }

}
