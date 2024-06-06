import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public notify = new BehaviorSubject<any>('');

  notifyObservable$ = this.notify.asObservable();


  constructor(private http: HttpClient) { }


  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  postAddTask(body: any): Observable<any> {
    return this.http.post('http://todo.truppler.com/todo/CreateUpdateTodo', body)
  }

  getAllTasks(): Observable<any> {
    return this.http.get('http://todo.truppler.com/todo/GetTodoList')
  }

  getTaskById(id: any): Observable<any> {
    return this.http.get(`http://todo.truppler.com/todo/GetTodoDetails/${id}`)
  }

  deleteTaskById(id: any): Observable<any> {
    return this.http.delete(`http://todo.truppler.com/todo/RemoveTodoItem/${id}`)
  }
}
