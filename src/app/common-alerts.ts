import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
@Injectable()
export class CommonAlerts {
  constructor(private _snackBar: MatSnackBar) { }


  showToastError(error: any, position: any = 'top-center') {
    this._snackBar.open(error, "Ok", {
      duration: 2000,
      panelClass: ['snackbarerror']
    });
  }

  showSuccess(meesage: any, position: any = 'top-center') {
    this._snackBar.open(meesage, "Ok", {
      duration: 2000,
      panelClass: ['snackbarsuccess']
    });
  }


  showWarnning(meesage: any, position: any = 'top-center') {
    this._snackBar.open(meesage, "Ok", {
      duration: 2000,
      panelClass: ['snackbarwarn']
    });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
