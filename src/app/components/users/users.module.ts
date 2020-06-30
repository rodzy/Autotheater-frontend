import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const declarations: any[] = [
  DashboardComponent,
  RegisterComponent,
  LoginComponent,
];
const exports: any[] = [DashboardComponent, RegisterComponent, LoginComponent];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [CommonModule],
})
export class UsersModule {}
