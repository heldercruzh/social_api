import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  https://bezkoder.com/angular-11-jwt-auth/
*/


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 

  isLoggedIn = false;
  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      //this.isLoggedIn = !!this.tokenStorageService.getToken();
      
      if (this.tokenStorageService.getToken()) { 
          return true;
      }
      
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
