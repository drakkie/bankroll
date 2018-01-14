import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IeComponent } from './ie.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatSelectModule, MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { IeToolbarComponent, IeToolbarDialogComponent } from './ie-Toolbar/ie-Toolbar.component';
import { IeViewerComponent } from './ie-viewer/ie-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [
    IeToolbarDialogComponent,
    IeComponent,
    IeToolbarComponent,
    IeViewerComponent,
    
  ],
  exports: [
    IeComponent
  ],
  entryComponents: [
    IeToolbarDialogComponent
  ]
})
export class IeModule { }
