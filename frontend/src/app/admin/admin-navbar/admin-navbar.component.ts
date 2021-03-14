import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../auth/helpers/token-storage.service';
import { SocialAuthService } from "angularx-social-login";


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'cliente-cad', title: 'Cadastrar Clientes',  icon: 'fa-user-plus', class: '' },
  { path: 'cliente-list', title: 'Consultar Clientes',  icon: 'fa-users', class: '' }
];

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  
  public menuItems?: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    public tokenStorageService: TokenStorageService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  public logout(): void {
    this.tokenStorageService.signOut();
    this.socialAuthService.signOut();
    window.location.reload();
    this.router.navigate(['/auth']);
  }

}
