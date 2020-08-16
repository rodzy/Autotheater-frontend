import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { UsersModule } from './components/users/users.module';
import { BillboardModule } from './components/billboard/billboard.module';
import { MoviesModule } from './components/movies/movies.module';
import { ProductsModule } from './components/products/products.module';
import { AdministrationModule } from './components/administration/administration.module';
import { ReservationsModule } from './components/reservations/reservations.module';

const declarations: any[] = [AppComponent];

const imports: any[] = [
  BrowserModule,
  AppRoutingModule,
  AdministrationModule,
  BrowserAnimationsModule,
  HttpClientModule,
  SharedModule,
  PagesModule,
  UsersModule,
  BillboardModule,
  MoviesModule,
  ProductsModule,
  ReservationsModule,
  ToastrModule.forRoot(),
];

@NgModule({
  declarations: [...declarations ],
  imports: [...imports],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
