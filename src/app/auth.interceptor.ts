import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError as observableThrowError, Observable, BehaviorSubject, of} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    private handleAuthError(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<any> {
        if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
                case 400:
                    return this.handle400Error(error);
                default:
                    return observableThrowError(error);
            }
        } else {
            return observableThrowError(error);
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isToken = this.getLoggedToken();
        const isApiUrl = req.url.startsWith(environment.BASE_URL);
        if (isToken && isApiUrl) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${isToken}` }
            });
        }
        return next.handle(req).pipe(catchError(x => this.handleAuthError(req, next, x)));
    }

    getLoggedToken(){
        let result;
        try {
            result = JSON.parse(localStorage.getItem('token')|| '');
          } catch (err) {
          }
          console.log(result)
          return result;
    }

    handle400Error(error: HttpErrorResponse) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return this.logoutUser();
        }
        return observableThrowError(error);
    }

    logoutUser() {
        localStorage.clear();
        this.router.navigate(['/auth']);
        return of('');
    }
}
