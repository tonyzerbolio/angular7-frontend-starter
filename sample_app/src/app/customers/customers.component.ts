/**
 * Customers Component
 */
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { Customer } from '../core/models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  Customers: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  ServiceString = `${environment.service1_str}`;

  svcToCall: string;

  selectedCustomer: Customer;

  list = false; // << Set to false to make default view grid, true for list

  constructor(
    public svcApi: ApiService
  ) { }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  toggleList(): void {
    if ( !this.list ) {
      this.list = true;
    } else {
      this.list = false;
    }
  }

  ngOnInit() {
    this.getData('customers');
  }

  getData(svcName: string) {
    this.svcToCall = this.ServiceString + svcName;
    return this.svcApi.getService1(this.ServiceURL + this.ServicePORT, this.svcToCall).subscribe((data: {}) => {
        this.Customers = data;
    })
  }
}
