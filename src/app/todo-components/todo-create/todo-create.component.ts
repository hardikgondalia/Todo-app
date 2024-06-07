import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodoService } from '../todo.service';

enum status {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done'
}

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss'
})



export class TodoCreateComponent implements OnInit {

  public createTaskForm: FormGroup | any;
  public taskList: any = [];
  public statusList: any[] = Object.values(status)
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
    this.route.queryParams.subscribe((param: any) => {
      this.id = param.id
    })
    if(this.id){
      this.getTaskById()
    }

  }

  get title() {
    return this.createTaskForm.get('title');
  }

  goToTodoList() {
    this.router.navigate(['/list'])
  }

  getTaskById() {

    this.todoService.getTaskById(this.id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.updateTask = true;
        let title = res.responseData?.todoTitle
        let description = res.responseData?.description
        let status = res.responseData?.status

        this.createTaskForm.get('title').setValue(title)
        this.createTaskForm.get('description').setValue(description);
        this.createTaskForm.get('status').setValue(status)

      }
      else {
        this.updateTask = false;
      }
    })
  }

  submitTodo() {
    this.isSubmitted = true;

    if (this.createTaskForm.valid) {

      if (this.updateTask) {
        let model = {
          todoId: this.id,
          todoTitle: this.createTaskForm.get('title')?.value,
          description: this.createTaskForm.get('description')?.value,
          status: this.createTaskForm.get('status')?.value
        }
        this.todoService.postAddTask(model).subscribe((res) => {
          this.todoService.notifyOther({ refresh: true });
        })
      }
      else {
        let model = {
          todoTitle: this.createTaskForm.get('title')?.value,
          description: this.createTaskForm.get('description')?.value,
          status: this.createTaskForm.get('status')?.value
        }
        this.todoService.postAddTask(model).subscribe((res) => {
          this.todoService.notifyOther({ refresh: true });
        })
      }

      this.createTaskForm.reset();

      Swal.fire({
        icon: "success",
        title: "Your task has been saved successfully",
        showConfirmButton: false,
        timer: 1500
      });


      this.router.navigate(['/list'])

    }
  }
}
