import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    CommonModule,
        NzButtonModule,
        NzCardModule,
        NzFormModule,
        NzGridModule,
        NzInputModule,
        NzLayoutModule,
        NzPageHeaderModule,
        NzTableModule,
        NzSpinModule,
  ]
})
export class DemoNgZorroAntdModule { }
