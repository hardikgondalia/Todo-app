import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoCreateComponent } from './todo-components/todo-create/todo-create.component';
import { TodoListComponent } from './todo-components/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoLoginComponent } from './todo-components/todo-login/todo-login.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoCreateComponent,
    TodoListComponent,
    TodoLoginComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
