import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-login',
  templateUrl: './todo-login.component.html',
  styleUrl: './todo-login.component.scss'
})
export class TodoLoginComponent implements OnInit {

  public loginForm: FormGroup | any;
  public title: string = '';
  public loginDummyData: any[] = [
    {
      email: 'abc@gmail.com',
      password: 'abc@123'
    },
    {
      email: 'xyz@gmail.com',
      password: 'xyz@456'
    },
    {
      email: 'john@gmail.com',
      password: 'john@1234'
    },
    {
      email: 'smith@gmail.com',
      password: 'smith@12345'
    }
  ];

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  login() {
    let body = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

   this.loginDummyData.filter((i:any) => i.email == body.email && i.password == body.password)
   let temp = this.loginDummyData.filter((element:any) => {
      if( element.email != body.email &&  element.password == body.password){
        this.title = 'Incorrect Email ID'
      }
      else if( element.email == body.email &&  element.password != body.password){
        this.title = 'Incorrect Password'
      }
      else if( element.email != body.email &&  element.password != body.password){
        this.title = 'Incorrect Email ID And Password'
      }
      else{
        this.title = ''
      }

      return element.email == body.email && element.password == body.password
    })
    if(temp?.length > 0){
      this.router.navigate(['/list'])
    }
    else{
      Swal.fire({
        icon: "error",
        title: this.title ,
        text: "Please Enter Correct Details",
      });
    }

  }
}
