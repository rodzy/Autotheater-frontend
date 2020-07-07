import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UndernavComponent } from './undernav/undernav.component';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BottomnavComponent } from './bottomnav/bottomnav.component';

const declarations: any[] = [
  HeaderComponent,
  FooterComponent,
  UndernavComponent,
  BottomnavComponent,
];

const exports: any[] = [
  HeaderComponent,
  FooterComponent,
  UndernavComponent,
  BottomnavComponent,
];

const imports: any[] = [
  MatMenuModule,
  MatIconModule,
  CommonModule,
  RouterModule,
];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class SharedModule {}
