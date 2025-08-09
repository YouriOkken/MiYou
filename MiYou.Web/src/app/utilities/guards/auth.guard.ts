import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/admin/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // Eerst gebruiker van server laden (async functie omzetten naar Observable met from())
    return from(this.authService.loadUserFromServer()).pipe(
      switchMap(() => this.authService.currentUser$),
      map(user => {
        if (user) {
          return true; // toegang toegestaan
        } else {
          this.router.navigate(['admin/login']);
          return false;
        }
      })
    );
  }
}