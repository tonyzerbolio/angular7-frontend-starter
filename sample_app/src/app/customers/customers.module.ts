import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule
    ],
    declarations: [
        CustomersComponent
    ],
    exports: [
        CustomersComponent
  ]
  })
  export class CustomersModule {}
