import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // we are injecting these because for certain types of error we are going to redirect to some page for for the other ones we are
  // going to use the toastr to display the error message
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modalStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if(typeof(error.error) === 'object') {
                this.toastr.error(error.statusText, error.status);
              } else {
                this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              this.toastr.error(error.statusText, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const naviagtionExtras: NavigationExtras = {state: {error: error.error}}
              this.router.navigateByUrl('/server-error', naviagtionExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              break;    
          }
        }
        return throwError(error);
      })
    )
  }
}
