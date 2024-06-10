import { Injectable } from '@angular/core';
import { TodoService } from '../todo/todo.service';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private todoService:TodoService, private router:Router) {
    const token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!token)
   }

  login(email:string, password:string){
    return this.todoService.postLogin(email, password).pipe(
      tap((response:any) => {
        if(response.responseData !== null){
          this._isLoggedIn$.next(true)
          localStorage.setItem('token', JSON.stringify(response.responseData))
        }

      })
    )
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth'])
  }
}
