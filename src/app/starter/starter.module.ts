import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../material-module';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewsModule } from '../views/views.module';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule, ViewsModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [StarterComponent]
})
export class StarterModule {}
