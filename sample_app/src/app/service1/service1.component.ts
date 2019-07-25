import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { SvcResult } from '../core/models/serviceData.model';

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit, OnDestroy {

  Results: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  Service1String = `${environment.service1_str}`;
  Service2String = `${environment.service2_str}`;

  svcToCall: string;

  selectedItem: SvcResult;

  navigationSubscription;

  list = false; // Sets list/grid view
  showAll = false; // showing all or showing single customer
  showAccount = false; // if user clicks Pesel number, show account info

  constructor(
    public svcApi: ApiService,
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
  onSelect(result: SvcResult): void {
    this.selectedItem = result;
  }

  // Returns data on single customer by name
  getCustomer(result: SvcResult): void {
    this.showAll = true;
    this.getData(this.Service1String + 'customer/' + result.name);
  }

  // Gets all customers and Resets/Reloads all customers
  getCustomers(): void {
    this.showAccount = false;
    this.showAll = false;
    this.getData(this.Service1String + 'customers');
  }

  // Returns data for an customer's account
  getAccount(result: SvcResult): void {
    this.showAccount = true;
    this.showAll = true;
    this.getData(this.Service2String + 'pesel/' + result.pesel);
  }

  // Toggles list/grid view by setting list variable to true or false
  toggleList(): void {
    if ( !this.list ) {
      this.list = true;
    } else {
      this.list = false;
    }
  }

  // Toggle to show all after user selects a single customer
  toggleShowAll(): void {
    if ( !this.showAll ) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

  // Toggle to show account info if user clicks Pesel
  toggleShowAccount(): void {
    if ( !this.showAll ) {
      this.showAccount = true;
    } else {
      this.showAccount = false;
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
    return this.svcApi.getService(this.ServiceURL + this.ServicePORT, svcName).subscribe((data: {}) => {
        this.Results = data;
    })
  }

  ngOnInit() {
    this.getCustomers();
  }

}
