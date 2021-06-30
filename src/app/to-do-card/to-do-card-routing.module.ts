import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoCardComponent } from './to-do-card.component'

const routes: Routes = [
  {
    path: '',
    component: ToDoCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoCardRoutingModule { }
