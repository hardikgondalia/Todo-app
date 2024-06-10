import { Injectable } from '@angular/core';
import { TodoService } from '../todo/todo.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private todoService:TodoService) {
    const token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!token)
   }

  login(email:string, password:string){
    return this.todoService.postLogin(email, password).pipe(
      tap((response:any) => {
        this._isLoggedIn$.next(true);
        console.log(JSON.stringify(response.responseData))
        localStorage.setItem('token', JSON.stringify(response.responseData))
      })
    )
  }
}
