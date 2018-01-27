import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsDisplayerComponent } from './transactions-displayer/transactions-displayer.component';

import { 
  MatPaginatorModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { TransactionsAdderComponent } from './transactions-adder/transactions-adder.component';
import { TransactionsToolbarComponent, TransactionsAddDialog } from './transactions-toolbar/transactions-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    NgxDatatableModule,
    MatSelectModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionsDisplayerComponent,
    TransactionsAdderComponent,
    TransactionsToolbarComponent,
    TransactionsAddDialog
  ],
  exports: [
    TransactionsComponent
  ],
  entryComponents: [
    TransactionsAddDialog
  ]
})
export class TransactionsModule { }
