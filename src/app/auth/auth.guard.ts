import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
   constructor(private store: Store<fromApp.AppState>, private router: Router, private actions$: Actions){}

   canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
      return this.store.select('auth').pipe(map((authState) => {
         return !!authState.user ? true : this.router.createUrlTree(['/auth']);
      }));
   }
}
