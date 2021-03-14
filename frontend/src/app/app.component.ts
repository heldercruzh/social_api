import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/helpers/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    isLoggedIn = false;
    
    constructor(
      private tokenStorageService: TokenStorageService,
      private router: Router) { }    

    ngOnInit(): void {
      if(!!this.tokenStorageService.getToken()){
        this.isLoggedIn = true;
        this.router.navigate(['/'])
      }
    }
    
}
