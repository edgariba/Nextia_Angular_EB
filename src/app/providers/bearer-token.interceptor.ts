import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable, catchError, throwError } from "rxjs";
import { CommonAlerts } from "../common-alerts";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router, private toastr: CommonAlerts) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('jwt')

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { Authorization: `${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403 || err.status == 401) {
            console.warn("END JWT")
            // redirect user to the logout page
            this.router.navigate(['/login']);
            this.showWarning("Tu sesión expiro");                          
          }
        }
        return throwError(() => {
          this.cookieService.deleteAll()
          //return "Tu sesión expiro...";
        });
      })
    )
  }

  showWarning(msg: any) {
    this.toastr.showWarnning(msg);
  }
}
