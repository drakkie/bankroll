import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCardModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { TotalDisplayerComponent } from './total-displayer/total-displayer.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    NgxDatatableModule
  ],
  declarations: [
    OverviewComponent,
    TotalDisplayerComponent,
    
  ],
  exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
