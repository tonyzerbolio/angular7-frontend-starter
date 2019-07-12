import { Component, OnInit } from '@angular/core';
import { Service1ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { Customer } from '../core/models/customer.model';

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit {

  Customers: any = [];
  ServiceURL = `${environment.service1_url}`;
  ServicePORT = `${environment.service1_port}`;
  ServiceString = `${environment.service1_str}`;

  selectedCustomer: Customer;

  list = false;

  constructor(
    public svcApi: Service1ApiService
  ) { }

  // Opens/Closes record edit menu (CRUD)
  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  // Toggles list/grid view by setting list variable to true or false
  toggleList(): void {
    if ( !this.list ) {
      this.list = true;
    } else {
      this.list = false;
    }
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    return this.svcApi.getService1(this.ServiceURL + this.ServicePORT, this.ServiceString).subscribe((data: {}) => {
        this.Customers = data;
    })
  }

}
