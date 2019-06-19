import { Component, OnInit } from '@angular/core';
import { Service1ApiService } from "../core/services/service1Api.service";

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit {

  Customer: any = [];
  ServiceString = '/svc1/customers';

  constructor(
    public svcApi: Service1ApiService
  ) { }

  ngOnInit() {
    this.getData()
  }
 
  getData() {
    return this.svcApi.getService1(this.ServiceString).subscribe((data: {}) => {
        this.Customer = data;
    })
  }

}
