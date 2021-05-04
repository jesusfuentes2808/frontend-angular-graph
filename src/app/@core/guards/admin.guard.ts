import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivateChild(
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
        this.redirect();
      }
      if (dataDecode.user.role === 'ADMIN'){
        console.log('Somos ADMIN');
        return true;
      }
      console.log('NO Somos ADMIN');

      this.redirect();
    }
  }

  redirect(){
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken(){
    return jwtDecode(this.auth.getSession().token);
  }
}
