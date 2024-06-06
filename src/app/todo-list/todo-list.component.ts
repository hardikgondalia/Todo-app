import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodoService } from '../todo.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  public taskData: any = [];
  public status: any[] = [
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

  public isLoading: boolean = false;
  public message: any

  constructor(private router: Router, private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTaskData()
    localStorage.removeItem('TodoId')

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
      if(res.isSuccess){
        this.taskData = res.responseData
        this.isLoading = false
      }
     })

  }

  createTask() {
    this.router.navigate(['/'])
  }

  onChangeStatus(event: any) {
    let temp = event.target.value
    if(temp === 'All'){
      this.getTaskData();
    }
    else{
      let status = Number(temp)
      this.todoService.getAllTasks().subscribe((res: any) => {
        this.taskData = res.responseData
        this.taskData = this.taskData?.filter((i:any) =>i.status === status)

      })

    }
  }

  editTask(id: any) {
    let body = {
      todoId: id
    }
    localStorage.setItem('TodoId', JSON.stringify(body))
    this.router.navigate(['/'])
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
