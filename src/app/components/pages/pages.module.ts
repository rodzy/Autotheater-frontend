import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const declarations: any[] = [IndexComponent, PageNotFoundComponent];

const exports: any[] = [IndexComponent, PageNotFoundComponent];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [CommonModule],
})
export class PagesModule {}
