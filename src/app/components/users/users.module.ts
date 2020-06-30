import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

const declarations: any[] = [DashboardComponent, RegisterComponent];
const exports: any[] = [DashboardComponent, RegisterComponent];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [CommonModule],
})
export class UsersModule {}
