import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UndernavComponent } from './undernav/undernav.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

const declarations: any[] = [
  HeaderComponent,
  FooterComponent,
  UndernavComponent,
  BreadcrumbsComponent,
];

const exports: any[] = [
  HeaderComponent,
  FooterComponent,
  UndernavComponent,
  BreadcrumbsComponent,
];

const imports: any[] = [MatMenuModule, MatIconModule, CommonModule];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class SharedModule {}
