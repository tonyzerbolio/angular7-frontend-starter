import { Component, OnInit } from '@angular/core';
import { Service1ApiService } from "../core/services/service1Api.service";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit {

  Customer: any = [];
  ServiceURL = `${environment.service1_url}`;
  ServicePORT = `${environment.service1_port}`;
  ServiceString = `${environment.service1_str}`;
  
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
