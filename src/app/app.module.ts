import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; /* Requisições Ajax */
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HttpInterceptorModule} from './service/header-interceptor.service';
import {UsuarioComponent} from './componente/usuario/usuario.component';
import {UsuarioAddComponent} from './componente/usuario/usuario-add/usuario-add.component';
import {GuardRoutersGuard} from './service/guard-routers.guard';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxCurrencyModule} from 'ngx-currency';

export const appRouters: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [GuardRoutersGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardRoutersGuard]},
  {path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardRoutersGuard]},
  {path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardRoutersGuard]}
  ];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);
export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
