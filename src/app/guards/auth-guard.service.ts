import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate(): boolean {
    if (!this.authService.getCurrentUserInfo()) {
      this.route.navigate(['/'], { queryParams: { auth: true } });
      return false;
    }
    return true;
  }
}
