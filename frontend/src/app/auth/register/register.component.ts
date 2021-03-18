import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { TokenStorageService } from '../helpers/token-storage.service';
import { AppConstants } from '../../shared/app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({});
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error = '';

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage?: string = '';
  currentUser: any;

  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private modal: AlertModalService,
      private tokenStorage: TokenStorageService
  ) {
      // redirect to home if already logged in
      /*if (this.authService.currentUserValue) {
          this.router.navigate(['/']);
      }*/
  }

  ngOnInit() {
    this.clearForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  
  onSubmit() {
    this.submitted = true;
   

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
     
    this.authService.register(this.registerForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.user);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    
  }

  private clearForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordconfirmation: ['', Validators.required],
      agreePrivacyPolicy: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  public goLogin(): void {
    this.router.navigate(['/auth']);
  }

  private reloadPage(): void {
    window.location.reload();
  }
}

