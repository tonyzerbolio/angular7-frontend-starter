import { Component, OnInit } from '@angular/core';
import { Service1ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { Customer } from '../core/models/customer.model';

@Component({
  selector: 'app-service1',
  templateUrl: './service2.component.html',
  styleUrls: ['./service2.component.scss']
})
export class Service2Component implements OnInit {

  Accounts: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  ServiceString = `${environment.service2_str}`;

  svcToCall: string;

  selectedAccount: Account;

  list = true; // << Set to false to make default view grid, true for list

  constructor(
    public svcApi: Service1ApiService
  ) { }

  // Opens/Closes record edit menu (CRUD)
  onSelect(account: Account): void {
    this.selectedAccount = account;
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
    this.getData('accounts');
  }

  getData(svcName: string) {
    this.svcToCall = this.ServiceString + svcName;
    return this.svcApi.getService1(this.ServiceURL + this.ServicePORT, this.svcToCall).subscribe((data: {}) => {
        this.Accounts = data;
    })
  }

}
