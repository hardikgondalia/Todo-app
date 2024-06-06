import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.css'
})
export class TodoCreateComponent implements OnInit {

  public createTaskForm: FormGroup | any;
  public taskList: any = [];
  public statusList: any = [];
  public updateTask: boolean = false;
  public editTaskList: any = [];
  public isSubmitted: boolean = false;
  public id: any;

  constructor(private router: Router, private todoService: TodoService, private route: ActivatedRoute) {
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      status: new FormControl('')
    })
  }

  ngOnInit(): void {

    this.statusList = [
      {
        id: 0,
        value: 'To Do'
      },
      {
        id: 1,
        value: 'In Progress'
      },
      {
        id: 2,
        value: 'Done'
      }];

    this.getTaskById()

  }

  get title() {
    return this.createTaskForm.get('title')!;
  }

  getTaskById() {
    if (localStorage.getItem('TodoId')) {
      this.id = JSON.parse(localStorage.getItem('TodoId') || '')
      this.todoService.getTaskById(this.id?.todoId).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.updateTask = true;
          let title = res.responseData?.todoTitle
          let description = res.responseData?.description
          let status = res.responseData?.status
          this.createTaskForm.get('title').setValue(title)
          this.createTaskForm.get('description').setValue(description)
          this.createTaskForm.get('status').setValue(status)
        }
        else {
          this.updateTask = false;
        }

      })
    }


  }

  submit() {
    this.isSubmitted = true;
    if (this.createTaskForm.valid) {

      if (this.updateTask) {
        let model = {
          todoId: this.id?.todoId,
          todoTitle: this.createTaskForm.get('title')?.value,
          description: this.createTaskForm.get('description')?.value,
          status: this.createTaskForm.get('status')?.value
        }
        this.todoService.postAddTask(model).subscribe((res) => {
        })
      }
      else {
        let model = {
          todoTitle: this.createTaskForm.get('title')?.value,
          description: this.createTaskForm.get('description')?.value,
          status: this.createTaskForm.get('status')?.value
        }
        this.todoService.postAddTask(model).subscribe((res) => {
        })
      }
      localStorage.removeItem('TodoId')
      this.createTaskForm.reset();

      Swal.fire({
        icon: "success",
        title: "Your task has been saved successfully",
        showConfirmButton: false,
        timer: 1500
      });
      this.todoService.notifyOther({ refresh: true });

      this.router.navigate(['/todo-list'])

    }
  }
}
