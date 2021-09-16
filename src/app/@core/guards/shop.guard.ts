import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router, CanActivate
} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Primero comprobar que existe sesión

    // Comprobar que no esta caducado el token

    // El role de usuario debe ser ADMIN

    if (this.auth.getSession() !== null){
      console.log('Estamos Logueados');

      const dataDecode: any = this.decodeToken();
      if (dataDecode.exp < new Date().getTime() / 1000){
        console.log('Sesion no iniciada');
        return this.redirect();
      }
      return true;
    }
    return this.redirect();
  }

  redirect(){
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken(){
    return jwtDecode(this.auth.getSession().token);
  }
}
