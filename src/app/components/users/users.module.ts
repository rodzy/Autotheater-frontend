import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

const declarations: any[] = [
  DashboardComponent,
  RegisterComponent,
  LoginComponent,
];
const exports: any[] = [DashboardComponent, RegisterComponent, LoginComponent];

const imports: any[] = [
  CommonModule,
  UsersRoutingModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class UsersModule {}
