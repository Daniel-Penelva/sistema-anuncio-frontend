import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../ng-zorro/demo-ng-zorro-antd.module';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientDashboardComponent,
    AdDetailComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ]
})
export class ClientModule { }
