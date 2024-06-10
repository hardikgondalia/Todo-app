import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIConstant } from '../constant/api';

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
    const url = `${APIConstant.postAddTask}`;
    return this.http.post(url, body)
  }

  getAllTasks(): Observable<any> {
    const url = `${APIConstant.getAllTasks}`;
    return this.http.get(url)
  }

  getTaskById(id: any): Observable<any> {
    const url = `${APIConstant.getTaskById}`;
    return this.http.get(url.replace('{id}', id))
  }

  deleteTaskById(id: any): Observable<any> {
    const url = `${APIConstant.deleteTaskById}`;
    return this.http.delete(url.replace('{id}', id))
  }

  postLogin(email: string, password: string): Observable<any> {
    const url = `${APIConstant.postLogin}`;
    return this.http.post(url, { email, password })
  }
}
