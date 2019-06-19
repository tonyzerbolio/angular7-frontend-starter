import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Service1Component } from './service1/service1.component';
import { PeopleComponent } from './people/people.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: 'service1', component: Service1Component },
  { path: 'people', component: PeopleComponent },
  { path: 'customers', component: CustomersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

