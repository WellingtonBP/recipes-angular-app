import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';

interface response{
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean;
}

function errorHandler(err: HttpErrorResponse): string{
   switch(err.error.error.message){
      case 'EMAIL_EXISTS':
         return 'This email already exists';
      case 'EMAIL_NOT_FOUND':
         return 'Email not found';
      case 'INVALID_PASSWORD':
         return 'Invalid password';
      case 'USER_DISABLED':
         return 'Banned';
      default:
         return 'An error ocurred';
   }
}

function  authHandler(authData: {email, localId, idToken, expiresIn}, redirect = true): any{
   const {email, localId, idToken, expiresIn} = authData;
   const expires = new Date(new Date().getTime() + +expiresIn * 1000);
   const userObj = new User(email, localId, idToken, expires);
   if(!!userObj.token){
      localStorage.setItem('userData', JSON.stringify(userObj));
      return AuthActions.auth({user: userObj, redirect});
   }
   return {type: 'NOTHING'};
}

@Injectable()
export class AuthEffects{
   authLogin$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap((action) => {
               return this.httpClient.post<response>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', {
                  email: action.email,
                  password: action.password,
                  returnSecureToken: true
               }).pipe(
                  map(resData => {
                     return authHandler(resData);
                  }),
                  catchError(err => of(AuthActions.authError({errorMsg: errorHandler(err)})))
               )
            })
         )
   );

   authSignup$ = createEffect(
      () => 
         this.actions$.pipe(
            ofType(AuthActions.signupStart),
            switchMap((action) => {
               return this.httpClient.post<response>('https://identitytoolkit.googleapis.com/v1/accounts:signUp', {
                  email: action.email,
                  password: action.password,
                  returnSecureToken: true
               }).pipe(
                  map(resData => {
                     return authHandler(resData);
                  }),
                  catchError(error => of(AuthActions.authError({errorMsg: errorHandler(error)})))
               )
            })
         )
   );
   
   autoLogin$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            map(() => {
               const userData = JSON.parse(localStorage.getItem('userData')) as User;
               if(userData){
                  const expiresIn = (new Date(userData._expiration).getTime() - new Date().getTime())/1000;
                  return authHandler({email: userData.email, localId: userData.id, idToken: userData._token, expiresIn}, false);
               }
               return {type: 'NOTHING'};
            })
         )
   );
   
   authSuccess$ = createEffect(
      () => 
         this.actions$.pipe(
            ofType(AuthActions.auth),
            tap((action) => {
               if(action.redirect){
                  this.router.navigate(['/recipes']);
               }
            })
         ),
         {dispatch: false}
   );
   
   authLogout$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
               localStorage.clear();
               this.router.navigate(['/auth']);
            })
         ),
         {dispatch: false}
   );
  

   constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router){}

}