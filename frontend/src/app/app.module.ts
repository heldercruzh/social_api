import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// To validated form
import { ReactiveFormsModule } from '@angular/forms';

// for dont refresh form
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

//modal
import { BsModalService } from 'ngx-bootstrap/modal';


// ngx-bootstrap imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { ClienteCadComponent } from './admin/admin-pages/cliente-cad/cliente-cad.component';
import { ClienteListComponent } from './admin/admin-pages/cliente-list/cliente-list.component';
import { PagamentoComponent } from './admin/admin-pages/pagamento/pagamento.component';
import { HomeComponent } from './admin/admin-pages/home/home.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { SharedModule } from './shared/shared.module';
import { authInterceptorProviders } from './auth/helpers/auth.interceptor';

// To use captcha
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';



@NgModule({
  declarations: [
    AppComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    ClienteCadComponent,
    ClienteListComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ForgetpasswordComponent,
    PagamentoComponent,
  ],
  exports: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TextMaskModule, 
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TextMaskModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SocialLoginModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1018977001682-rsl0j4f0aaar7iposnq55418mfgisaf9.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ ConfirmModalComponent, AlertModalComponent ]
})
export class AppModule { }
