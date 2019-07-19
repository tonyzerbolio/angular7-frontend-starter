import { Component, OnInit } from '@angular/core';

import { ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { Account } from '../core/models/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  Accounts: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  ServiceString = `${environment.service2_str}`;

  svcToCall: string;

  selectedAccount: Account;

  list = true; // << Set to false to make default view grid, true for list

  constructor(
    public svcApi: ApiService
  ) { }

  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
  
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
