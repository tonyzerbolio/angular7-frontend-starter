import { Component, OnInit } from '@angular/core';
import { CustomersApiService } from "../core/services/customers.service";
import { Service1ApiService } from "../core/services/service1Api.service";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  Customer: any = [];
  ServiceURL = `${environment.customers_url}`;
  ServicePORT = `${environment.customers_port}`;
  ServiceString = `${environment.customers_str}`;

  constructor(
    public svcApi: Service1ApiService
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    return this.svcApi.getService1(this.ServiceURL + this.ServicePORT, this.ServiceString).subscribe((data: {}) => {
        this.Customer = data;
    })
  }

}
