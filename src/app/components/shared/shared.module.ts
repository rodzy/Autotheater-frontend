import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UndernavComponent } from './undernav/undernav.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UndernavComponent],
  exports: [HeaderComponent, FooterComponent, UndernavComponent],
  imports: [MatMenuModule, MatIconModule],
})
export class SharedModule {}
