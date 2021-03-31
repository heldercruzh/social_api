import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../helpers/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from '../../shared/alert-modal.service';
import { AppConstants } from '../../shared/app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  loading = false;
  submitted = false;
  roles: string[] = [];

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage?: string = '';
  currentUser: any;

  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  
  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modal: AlertModalService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
   
    this.clearForm();
       
  	if (this.route.snapshot.queryParamMap.get('token')) {
      this.tokenStorage.saveToken(this.route.snapshot.queryParamMap.get('token') || '');
      this.currentUser = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.reloadPage();
    } else {
      this.errorMessage = this.route.snapshot.queryParamMap.get('error') || '';
	    this.isLoginFailed = true;
    }
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
        
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.user);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.modal.showAlertDanger(err.error.message || "Erro não identificado, contate o administrador!");
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }
 
  private clearForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: [''],
      captcha: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
  }

  public goRegister(): void {
    this.router.navigate(['/register']);
  }

  public goKeycloak(): void {
    this.authService.keycloak().subscribe(
      data => {
        this.modal.showAlertSuccess("OK, Token gerado: "+data);
      },
      err => {
        this.modal.showAlertDanger("Erro não identificado, contate o administrador: "+ err.error.message);
      }
    );
  }

  public goForgetPassword(): void {
    this.router.navigate(['/forgetpassword']);
  }

  private reloadPage(): void {
    window.location.reload();
  }

}