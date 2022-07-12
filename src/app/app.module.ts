import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { FullComponent } from './layouts/full.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { CommonAlerts } from './common-alerts';
import { UsersService } from './providers/users-service/users.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AuthInterceptorService } from './providers/bearer-token.interceptor';

@NgModule({
  declarations: [
    FullComponent,
    AppComponent,
    HeaderComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [CommonAlerts, UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
   },],
  bootstrap: [AppComponent]
})
export class AppModule { }
