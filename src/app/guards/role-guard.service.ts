import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate(): boolean {
    if (this.authService.getCurrentUserInfo().user.role_id !== 1) {
      this.route.navigate(['/'], { queryParams: { role: 'true' } });
      return false;
    }

    return true;
  }
}
