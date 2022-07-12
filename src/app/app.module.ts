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
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    FullComponent,
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [CommonAlerts, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
