import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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
}
