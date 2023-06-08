import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

const modules: Array<any> = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTreeModule,
  MatMenuModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  DragDropModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
