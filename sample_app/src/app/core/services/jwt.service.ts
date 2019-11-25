/**
 * NOT CURRENTLY IN USE - BUT PROBABLY SHOULD BE (07/25/2019)
 * This handles storage, creation and destruction of an access_token
 */
import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): string {
    return window.sessionStorage['access_token'];
  }

  saveToken(token: string) {
    window.sessionStorage['access_token'] = token;
  }

  destroyToken() {
    window.sessionStorage.removeItem('access_token');
  }

}
