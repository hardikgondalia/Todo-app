import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any;
  public title: string = '';
  public isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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

    if (this.loginForm.valid) {

      let email = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value

      this.authService.login(email, password).subscribe((res: any) => {
        if (res.isSuccess) {
          this.router.navigate(['/todo/list'])
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message,
          });
          this.loginForm.reset()
          this.isLoggedIn = false
        }

      })
    }

  }
}
