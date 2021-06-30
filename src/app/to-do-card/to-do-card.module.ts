import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoCardRoutingModule } from './to-do-card-routing.module';
import { ToDoCardComponent } from './to-do-card.component';
import {MatCardModule} from '@angular/material/card';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToDoCardComponent],
  imports: [
    CommonModule,
    ToDoCardRoutingModule,
    MatCardModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class ToDoCardModule { }
