import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ClienteCadComponent } from './admin/admin-pages/cliente-cad/cliente-cad.component';
import { ClienteListComponent } from './admin/admin-pages/cliente-list/cliente-list.component';
import { PagamentoComponent } from './admin/admin-pages/pagamento/pagamento.component';
import { HomeComponent } from './admin/admin-pages/home/home.component';
import { AuthGuard } from './auth/helpers/auth.guard';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  
  {
    path: 'auth',
    component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pagamento/:id',
    component: PagamentoComponent,
    canActivate: [AuthGuard]},
  {
    path: 'cliente-cad',
    component: ClienteCadComponent,
    canActivate: [AuthGuard]},
  {
    path: 'cliente-list',
    component: ClienteListComponent,
    canActivate: [AuthGuard]},
  {
     path: 'cliente-edit/:id',
      component: ClienteCadComponent,
      canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
