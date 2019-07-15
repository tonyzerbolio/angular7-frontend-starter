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
