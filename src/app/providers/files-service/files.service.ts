import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CommonAlerts } from 'src/app/common-alerts';
import { ConstantsService } from '../constant-service/constants.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantsService, private handleErrors: CommonAlerts) {
  }

  getAllFiles(): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "files/loadAllFiles", this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  deleteFile(fileName: any): Observable<any> {
    return this.httpClient.delete(this.constantServiceProvider.server + "files/delete/" + fileName, this.constantServiceProvider.getHeaders()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  uploadFiles(formData: FormData): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "files/upload", formData, this.constantServiceProvider.getHeadersFile()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  downloadFile(fileName: any): any {
		return this.httpClient.get(this.constantServiceProvider.server + "files/get/" + fileName, {responseType: 'blob'});
  }
  
}
