import { Component, OnInit } from '@angular/core';
import { CustomersApiService } from "../core/services/customers.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  Customer: any = [];

  constructor(
    public restApi: CustomersApiService
  ) { }

  ngOnInit() {
    this.loadCustomers()
  }

  // Get customers list
  loadCustomers() {
    return this.restApi.getCustomers().subscribe((data: {}) => {
      this.Customer = data;
    })
  }

}
