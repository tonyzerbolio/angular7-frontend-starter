/**
 * service1.component.ts is a catch-all component used to display
 * data returned by the http-api.services.ts service.
 * 
 * It handles output for both the "Accounts" and "Customers" services.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ApiService } from '../core/services/http-api.service';
import { environment } from '../../environments/environment';
import { SvcResult } from '../core/models/serviceData.model';

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit, OnDestroy {

  Results: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;
  Service1String = `${environment.service1_str}`;
  Service2String = `${environment.service2_str}`;

  svcToCall: string;

  selectedItem: SvcResult;

  navigationSubscription;

  currentPage = this.router.url;

  list = false; // Sets list/grid view
  showAll = false; // showing all or showing single customer
  showAccount = false; // if user clicks an account-related, show account info
  showAccountTitle = false;

  constructor(
    public svcApi: ApiService,
    private router: Router
  ) {
    /**
     * This subscription to router events allows currently active
     * routes to be reused so that data can be redisplayed as needed.
     */
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        if ( !this.showAccount ) {
          this.getCustomers();
        } else {
          this.getAccounts();
        }
      }
    });
  }

  /**
   * onSelect() is used to open an editing interface when the user
   * clicks on the 'edit' link or the account/customer name.
   * 
   * It passes the selected customer or account object to the editing
   * interface to populate the form fields. The user can edit those
   * items and they will be reflected immeditely when the user closes
   * the editing screen.
   * 
   * IMPORTANT - The editing screen DOES NOT PROVIDE ACTUAL EDITING
   * of the underlying data. While the changes you make are reflected
   * when you return to the normal view, if you navigate away from the
   * page and return, the data will return to it's original state.
   * 
   * @todo Create actual CRUD functions that will update the actual
   * database entries.
   * 
   * @param {object} result the selected item (customer or account)
   */
  onSelect(result: SvcResult): void {
    this.selectedItem = result;
  }

  /**
   * getCustomer(result: SvcResult) {}
   * 
   * Sets showAll to true so the "Show All" link is shown and the user
   * can click it to return the screen to showing all customers after
   * being in a single customer's view or edit mode.
   * 
   * @param {object} result Takes currently selected customer and submits
   * it to the http-api.service to retrieve a single customer's details.
   * 
   * It this instance, it is using the customer's name.
   */
  getCustomer(result: SvcResult): void {
    this.showAll = true;
    this.getData(this.Service1String + 'customer/' + result.name);
  }

  /**
   * getCustomers() {}
   * 
   * Sets 'showAccount' to false to indicate we are viewing customers
   * Sets 'showAll' to false to reset hide the "Show All" option
   * Calls the getData() function passing the proper service endpoint
   * url and parameters to return all customers.
   */
  getCustomers(): void {
    this.showAccount = false;
    this.showAll = false;
    this.getData(this.Service1String + 'customers');
  }

  /**
   * getAccounts() {}
   * 
   * Sets 'showAccountTitle' to true to allow the component title to change
   * Sets 'showAccount' to true to indicate we are viewing accounts
   * Sets 'showAll' to false to reset hide the "Show All" option
   * Calls the getData() function passing the proper service endpoint
   * url and parameters to return all accounts.
   */
  getAccounts(): void {
    this.showAccountTitle = true;
    this.showAccount = true;
    this.showAll = false;
    this.getData(this.Service2String + 'accounts');
  }

  /**
   * getAccount(result: SvcResult) {}
   * 
   * Sets showAccount to true to indicate we are viewing accounts.
   * Sets showAll to true so the "Show All" link is shown and the user
   * can click it to return the screen to showing all accounts after
   * being in a single account's view or edit mode.
   * 
   * @param {object} result Takes currently selected account and submits
   * it to the http-api.service to retrieve a single account's details.
   * 
   * In this case, it is using the 'pesel' data column to return all accounts
   * that share a common pesel value.
   */
  getAccount(result: SvcResult): void {
    this.showAccount = true;
    this.showAll = true;
    this.getData(this.Service2String + 'pesel/' + result.pesel);
  }

  // Toggles list/grid view by setting list variable to true or false
  toggleList(): void {
    if ( !this.list ) {
      this.list = true;
    } else {
      this.list = false;
    }
  }

  // Toggle to show all after user selects a single customer
  toggleShowAll(): void {
    if ( !this.showAll ) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

  // Toggle to show account info if user clicks Pesel
  toggleShowAccount(): void {
    if ( !this.showAll ) {
      if ( this.currentPage === '/customers' ) {
        this.showAccountTitle = false;
      } else {
        this.showAccountTitle = true;
      }
      this.showAccount = true;
    } else {
      this.showAccount = false;
    }
  }

  /**
   * showAllResults() {}
   * 
   * Initializes the page to showing all results qualified by either
   * 'customers' or 'accounts' depending on what the current view
   * state is.
   */
  showAllResults(): void {
    if ( this.currentPage === '/customers' ) {
      this.getCustomers();
    } else {
      this.getAccounts();
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

  /**
   * getData(svcName: string) {}
   * 
   * @param {string} svcName uses the http-api.service to retrieve data
   * 
   * @returns {JSON} A JSON object with customer or account data
   */
  getData(svcName: string) {
    return this.svcApi.getService(this.ServiceURL + this.ServicePORT, svcName).subscribe((data: {}) => {
        this.Results = data;
    })
  }

  ngOnInit() {
    this.showAllResults();
  }

}
