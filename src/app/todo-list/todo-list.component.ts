import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  public taskData: any = [];
  public status: any[] = ['All', 'To Do', 'In Progress', 'Done']
  public isLoading:boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getTaskData()
    }

  getTaskData() {
    if (localStorage.getItem('tasks')) {
      this.taskData = JSON.parse(localStorage.getItem('tasks') || '')
    }

}

  createTask() {
    this.router.navigate(['/'])
  }

  onChangeStatus(event: any) {
    let temp = event.target.value
    if (temp === 'All') {
      this.getTaskData()
    }
    else {
      this.getTaskData();
      this.taskData = this.taskData.filter((i: any) => i?.status == temp.toString())
    }

  }

  editTask(item: any) {
    localStorage.setItem('editItem', JSON.stringify(item))
    this.router.navigate(['/'])
  }

  deleteTask(i: any) {
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
        this.taskData.splice(i, 1);

        if(this.taskData?.length === 0){
          localStorage.removeItem('tasks')
        }
        else{
          localStorage.setItem('tasks', JSON.stringify(this.taskData))
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
      }
    });

  }
}
