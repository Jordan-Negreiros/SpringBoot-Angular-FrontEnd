import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioServiceService} from './usuario-service.service';

@Injectable({
  providedIn: 'root'
})

export class GuardRoutersGuard implements CanActivate {

  constructor(private userService: UsuarioServiceService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.usuarioAutenticado();
  }

}
