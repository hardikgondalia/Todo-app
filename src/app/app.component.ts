import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'todo';

  public showLoader:boolean = true;
  public userLoggedIn:boolean = false;
  constructor(private router:Router, public authService:AuthService, private todoService:TodoService){
      }

  ngOnInit(): void {
    setTimeout(()=>{
      this.showLoader = false;
     },3000)

     this.authService.isLoggedIn$.subscribe((res) => {
      this.userLoggedIn = res
    })

}

  logout(){
    this.authService.logout();
    this.userLoggedIn = false;
  }
}
