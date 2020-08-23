import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';

import { AppService } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  canActivate() {
    console.log('AuthGuard');
    if (this.appService.isLoggedIn) {
        console.log('Access granted');
      return true;
    } else {
        console.log('Access denied');
        this.router.navigate([''], { relativeTo: this.route });
        return false;
    }
  }
}
