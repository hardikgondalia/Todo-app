import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;
  public title: string = '';
  public isLoggedIn :boolean = false;
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
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    //  password: new FormControl('', [Validators.required,Validators.pattern( "/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/")])
    })
  }

  ngOnInit(): void {

  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  login() {
    this.isLoggedIn = true;

    if(this.loginForm.valid){
      let body = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      let temp = this.loginDummyData.filter((i:any) => i.email == body.email && i.password == body.password)
      if(temp?.length > 0){
        this.router.navigate(['/list'])
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Incorrect Email ID Or Password",
          text: "Please Enter Correct Details",
        });
        this.loginForm.reset();
      }


    }
   }
}
