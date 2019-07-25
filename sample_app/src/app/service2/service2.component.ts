import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { SvcResult } from '../core/models/serviceData.model';

@Component({
  selector: 'app-service2',
  templateUrl: './service2.component.html',
  styleUrls: ['./service2.component.scss']
})
export class Service2Component implements OnInit, OnDestroy {

  Accounts: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  ServiceString = `${environment.service2_str}`;

  svcToCall: string;

  selectedAccount: SvcResult;

  navigationSubscription;

  list = true; // Sets list/grid view
  showAll = false; // showing all or showing single account

  constructor(
    public svcApi: ApiService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getAccounts();
      }
    });
  }

  // Opens/Closes record edit menu (CRUD)
  onSelect(account: SvcResult): void {
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

  // Returns data on single account by pesel
  getAccount(account: SvcResult): void {
    this.showAll = true;
    this.getData('pesel/' + account.pesel);
  }

  // Resets/Reloads all accounts
  getAccounts(): void {
    this.showAll = false;
    this.getData('accounts');
  }

  toggleShowAll(): void {
    if ( !this.showAll ) {
      this.showAll = true;
    } else {
      this.showAll = false;
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
    this.svcToCall = this.ServiceString + svcName;
    return this.svcApi.getService(this.ServiceURL + this.ServicePORT, this.svcToCall).subscribe((data: {}) => {
        this.Accounts = data;
    })
  }

  ngOnInit() {
    this.getData('accounts');
  }

}
