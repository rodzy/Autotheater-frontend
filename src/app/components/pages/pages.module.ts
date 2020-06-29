import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UIModule } from '../UI/ui.module';

const declarations: any[] = [IndexComponent, PageNotFoundComponent, UIModule];

const exports: any[] = [IndexComponent, PageNotFoundComponent];

const imports: any[] = [CommonModule, UIModule];

@NgModule({
  declarations: [...declarations],
  exports: [...exports],
  imports: [...imports],
})
export class PagesModule {}
