import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CommonAlerts } from 'src/app/common-alerts';
import { ConstantsService } from '../constant-service/constants.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UsersService {

  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantsService, private handleErrors: CommonAlerts) {
  }

  loginUser(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "users/login", body, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getByHash(hashUser: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "users/getByHash?hashUser=" + hashUser, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  deleteUser(hashUser: any): Observable<any> {
    return this.httpClient.delete(this.constantServiceProvider.server + "users/delete?hashUser=" + hashUser, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  addUser(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "users/add", body, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateUser(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "users/update", body, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getAllUsers(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "users/getAll", body, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  changePassword(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "users/changePassword", body, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
