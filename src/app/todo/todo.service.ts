import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();
  constructor(private http: HttpClient) { }

  /**
   * method to show loader across application
   * @param data boolean
   */
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  /**
   * POST call to create/update Todo
   * @param data boolean
   */
  postAddTask(body: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/todo/CreateUpdateTodo`, body)
  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/todo/GetTodoList`)
  }

  getTaskById(id: any): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/todo/GetTodoDetails/${id}`)
  }

  deleteTaskById(id: any): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/todo/RemoveTodoItem/${id}`)
  }

  postLogin(email:string, password:string): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/todo/Login` , {email, password})
  }
}
