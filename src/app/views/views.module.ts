import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutes } from './views-routing.module';
import { LoadingComponent } from '../loading';
import { UsersComponent } from './userComponents/users/users.component';
import { ActionsUsersComponent } from './userComponents/actions-users/actions-users.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesComponent } from './filesComponentes/files/files.component';


@NgModule({
  declarations: [LoadingComponent, UsersComponent, ActionsUsersComponent, FilesComponent],
  imports: [
    DemoMaterialModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ViewsRoutes),
  ],
  exports: [
    LoadingComponent
  ]
})
export class ViewsModule { }
