import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardServiceService } from 'src/app/_services/authguardService/auth-guard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  

  constructor (private AuthGuardService: AuthGuardServiceService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
    if (!this.AuthGuardService.gettoken()) {  
      this.router.navigateByUrl("/login");  
      return false;
    }  
    return true;
    
  }
  
}
