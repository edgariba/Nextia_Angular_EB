import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonAlerts } from 'src/app/common-alerts';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { UsersService } from 'src/app/providers/users-service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading: boolean = false;
  isLoaded: boolean = false;
  usuarios: any[] = []

  limit: number = 10;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 20];
  emailUser: any
  hashUser: any
  public displayedColumns = ['email', 'action'];
  constructor(private common: CommonAlerts, private userService: UsersService, private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUsersPagination(0, this.limit)
  }

  goToEditUser(hashUser: any) {
    this.router.navigate(['/usuarios/editar/' + hashUser])
  }

  getAllUsersPagination(page: any, maxResults: any) {
    var param = {
      page: page,
      maxResults: maxResults
    }
    this.loadSpinner()
    let body = JSON.stringify(param);    
    this.userService.getAllUsers(body).subscribe({
      next: (response) => {
        if (response.header.code == 200) {
          if (response.header.code == 200) {
            this.usuarios = response.data.content;
            this.totalLength = response.data.totalElements;
            this.isLoaded = true;
          } else {
            this.common.showWarnning(response.header.message)
          }
        } else {
          this.common.showWarnning(response.header.message)
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.common.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    })
  }

  cleanData() {
    this.isLoaded = false;
    this.usuarios = []
  }

  openDialogDelete(element: any): void {
    const title = element.email
    const message = `¿Estás seguro de eliminar el usuario?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig'],
      data: {
        tittle: title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.deleteUsuario(element.hashUser)
      }
    });
  }

  deleteUsuario(hashUser: any) {
    this.loadSpinner()
    this.userService.deleteUser(hashUser).subscribe({
      next: (response) => {        
        if (response.code == 200) {
          this.common.showSuccess(response.message)
          this.getAllUsersPagination(this.pageIndex, this.limit)
        } else {
          this.common.showWarnning(response.message)
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.common.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    }
    )
  }

  changePage(event: any) {    
    this.getAllUsersPagination(event.pageIndex, event.pageSize);
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

}
