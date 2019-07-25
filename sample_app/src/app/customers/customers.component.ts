import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  Customer: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  ServiceString = `${environment.service2_str}`;

  constructor(
    public svcApi: ApiService
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    return this.svcApi.getService(this.ServiceURL + this.ServicePORT, this.ServiceString).subscribe((data: {}) => {
        this.Customer = data;
    })
  }

}
