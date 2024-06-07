import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoLoginComponent } from './todo-login/todo-login.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';

const routes: Routes = [
  {
    path:'',
    component:TodoLoginComponent
  },
  {
    path:'create',
    component:TodoCreateComponent
  },
  {
    path:'list',
    component:TodoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
