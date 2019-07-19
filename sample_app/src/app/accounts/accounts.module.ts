import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountsComponent } from './accounts.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule
    ],
    declarations: [
      AccountsComponent
    ],
    exports: [
      AccountsComponent
    ]
  })
  export class AccountsModule {}
