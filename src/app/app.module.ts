import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { UsersModule } from './components/users/users.module';


const declarations: any[] = [AppComponent, LoginComponent];

const imports: any[] = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  SharedModule,
  PagesModule,
  UsersModule
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
