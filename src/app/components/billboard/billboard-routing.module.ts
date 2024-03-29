import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillboardindexComponent } from './billboardindex/billboardindex.component';

const routes: Routes = [
  {
    path: 'billboard',
    pathMatch: 'full',
    component: BillboardindexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillboardRoutingModule {}
