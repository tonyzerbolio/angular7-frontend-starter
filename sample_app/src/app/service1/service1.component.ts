import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Service1ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { SvcResult } from '../core/models/serviceData.model';

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit, OnDestroy {

  Customers: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  ServiceString = `${environment.service1_str}`;

  svcToCall: string;

  selectedCustomer: SvcResult;

  navigationSubscription;

  list = false; // Sets list/grid view
  showAll = false; // showing all or showing single customer

  constructor(
    public svcApi: Service1ApiService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getCustomers();
      }
    });
  }

  // Opens/Closes record edit menu (CRUD)
  onSelect(customer: SvcResult): void {
    this.selectedCustomer = customer;
  }

  // Returns data on single customer by name
  getCustomer(customer: SvcResult): void {
    this.showAll = true;
    this.getData('customer/' + customer.name);
  }

  // Resets/Reloads all customers
  getCustomers(): void {
    this.showAll = false;
    this.getData('customers');
  }

  // Toggles list/grid view by setting list variable to true or false
  toggleList(): void {
    if ( !this.list ) {
      this.list = true;
    } else {
      this.list = false;
    }
  }

  toggleShowAll(): void {
    if ( !this.showAll ) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  getData(svcName: string) {
    this.svcToCall = this.ServiceString + svcName;
    return this.svcApi.getService1(this.ServiceURL + this.ServicePORT, this.svcToCall).subscribe((data: {}) => {
        this.Customers = data;
    })
  }

  ngOnInit() {
    this.getData('customers');
  }

}
