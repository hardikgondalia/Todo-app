import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodoService } from '../todo.service';
import { filter } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

enum status {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done'
}


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  public taskData: any = [];
  public searchString: any = '';
  public status: any[] = Object.values(status)

  public isLoading: boolean = false;
  public message: any

  constructor(private router: Router, private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTaskData()

    this.todoService.notifyObservable$.subscribe(res => {
      if (res.refresh) {
        this.todoService.getAllTasks().subscribe((res: any) => {
          this.taskData = res.responseData
        })
      }
    })

  }

  getTaskData() {
    this.isLoading = true;

      this.todoService.getAllTasks().subscribe((res: any) => {
        if (res.isSuccess) {
          this.taskData = res.responseData
          this.isLoading = false
        }
      })

  }

  createTask() {
    this.router.navigate(['/todo/create'])
  }

  inputValue() {
    if (this.searchString && this.searchString.trim() !== '') {
      this.taskData = this.taskData.filter((i: any) => {
        return (i.todoTitle.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1);
      })

    }
    else {
      this.todoService.getAllTasks().subscribe((res: any) => {
        if (res.isSuccess) {
          this.taskData = res.responseData
        }
      })
    }
  }

  onChangeStatus(event: any) {
    let temp = event.target.value
    if (temp === 'All') {
      this.todoService.getAllTasks().subscribe((res: any) => {
        this.taskData = res.responseData
      })
    }
    else {
      let status = Number(temp)
      this.todoService.getAllTasks().subscribe((res: any) => {
        this.taskData = res.responseData
        this.taskData = this.taskData?.filter((i: any) => i.status === status)
      })

    }
  }

  editTask(id: any) {
    let todoId = id
    this.router.navigate(['/create'], { queryParams: { id: todoId } })
  }

  deleteTask(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTaskById(id).subscribe((res: any) => {
          this.getTaskData();
        })

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
      }
    });

  }
}
