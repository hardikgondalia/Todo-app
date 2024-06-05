import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private router: Router) {
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      status: new FormControl('')
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('tasks')) {
      this.taskList = JSON.parse(localStorage.getItem('tasks') || '')
    }
    this.statusList = ['To Do', 'In Progress', 'Done'];

    if (localStorage.getItem('editItem')) {
      this.editTaskList = JSON.parse(localStorage.getItem('editItem') || '')
      if (this.editTaskList) {
        this.updateTask = true;
        const temp = this.taskList.find((item: any) => item?.id === this.editTaskList?.id)
        this.createTaskForm.get('title').setValue(temp?.title)
        this.createTaskForm.get('description').setValue(temp?.description)
        this.createTaskForm.get('status').setValue(temp?.status)
      }

    }
  }

  get title() {
    return this.createTaskForm.get('title')!;
  }

  submit() {
    this.isSubmitted = true;
    if (this.createTaskForm.valid) {
      const date = new Date();
      const timeStamp = date.getTime()
      let model = {
        id: timeStamp,
        title: this.createTaskForm.get('title')?.value,
        description: this.createTaskForm.get('description')?.value,
        status: this.createTaskForm.get('status')?.value

      }

      const index = this.taskList.findIndex((item: any) => item.id === this.editTaskList?.id)
      if (index >= 0) {
        this.taskList.splice(index, 1)
      }

      this.taskList.push(model)
      this.createTaskForm.reset();
      localStorage.removeItem('editItem')
      localStorage.setItem('tasks', JSON.stringify(this.taskList))


      if(this.updateTask){
        Swal.fire({
          icon: "success",
          title: "Your task has been updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
      else{
        Swal.fire({
          icon: "success",
          title: "Your task has been saved successfully",
          showConfirmButton: false,
          timer: 1500
        });

      }

      this.router.navigate(['/todo-list'])

    }
  }
}
