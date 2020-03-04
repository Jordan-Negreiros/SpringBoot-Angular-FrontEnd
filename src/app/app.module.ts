import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; /* Requisições Ajax */
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HttpInterceptorModule} from './service/header-interceptor.service';
import {UsuarioComponent} from './componente/usuario/usuario.component';
import {UsuarioAddComponent} from './componente/usuario/usuario-add/usuario-add.component';

export const appRouters: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'usuarioList', component: UsuarioComponent},
  {path: 'usuarioAdd', component: UsuarioAddComponent},
  {path: 'usuarioAdd/:id', component: UsuarioAddComponent}
  ];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

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
    HttpInterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
