import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UndernavComponent } from './undernav/undernav.component';
import { CommonModule } from '@angular/common';

const declarations: any[] = [
  HeaderComponent,
  FooterComponent,
  UndernavComponent,
];

const exports: any[] = [HeaderComponent, FooterComponent, UndernavComponent];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [MatMenuModule, MatIconModule, CommonModule],
})
export class SharedModule {}
