import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducer';

@Injectable()
export class AuthInterceptService implements HttpInterceptor{

   constructor(private store: Store<fromApp.AppState>){}

   intercept(req: HttpRequest<any>, next: HttpHandler){
      let interceptedRequest = req;
      if(req.url === 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' || 
      req.url === 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'){
         interceptedRequest = req.clone({params: new HttpParams().append('key', environment.firebaseAPIKey)});
      }else if(req.url === 'https://ng-course-recipe-book-fb4d9-default-rtdb.firebaseio.com/recipes.json'){
         let token;
         this.store.select('auth').pipe(take(1)).subscribe((authState: fromAuth.State)=> {
            token = authState.user.token;
         })
         interceptedRequest = req.clone({params: new HttpParams().append('auth', token)});
      }
      return next.handle(interceptedRequest);
   }
}