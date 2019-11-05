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
import { AuthorsResult } from '../core/models/authors.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  Results: any = [];
  ServiceURL = `${environment.service_url}`;
  ServicePORT = `${environment.service_port}`;

  // get data functions
  get_pictures: '/pictures';
  get_comments: '/comments';

  svcToCall: string;

  selectedItem: AuthorsResult;

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
        if ( this.currentPage === '/customers' ) {
          this.getAuthors();
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
  onSelect(result: AuthorsResult): void {
    this.selectedItem = result;
  }

  /**
   * getAuthors() {}
   *
   * Sets 'showAccountTitle' to true to allow the component title to change
   * Sets 'showAccount' to true to indicate we are viewing authors
   * Sets 'showAll' to false to reset hide the "Show All" option
   * Calls the getData() function passing the proper service endpoint
   * url and parameters to return all authors.
   */
  getAuthors(): void {
    this.showAll = false;
    this.getData('/authors');
  }

  /**
   * getAuthor(result: SvcResult) {}
   *
   * Displays the data for a single author and sets showAll to true so
   * the "Show All" link is shown and the user can click it to return the
   * screen to showing all authors.
   *
   * @param {object} result The currently selected author to submit to
   * the http-api.service in order to retrieve a single author's details.
   *
   * It this instance, it is using the author's name.
   */
  getAuthor(result: AuthorsResult): void {
    this.showAll = true;
    this.getData('/authors?id=' + result.id);
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
   * @returns {JSON} A JSON object with author data
   */
  getData(svcName: string) {
    return this.svcApi.getService(this.ServiceURL + this.ServicePORT, svcName).subscribe((data: {}) => {
        this.Results = data;
    })
  }

  ngOnInit() {
    this.getAuthors();
  }

}
