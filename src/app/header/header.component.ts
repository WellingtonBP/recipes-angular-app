import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
   public userSbs: Subscription;
   public isLogged = false;

   constructor(private store: Store<fromApp.AppState>){}

   ngOnInit(){
      this.userSbs = this.store.select('auth').subscribe((authState: fromAuth.State) => {
         this.isLogged = !!authState.user;
      })
   }

   onLogout(){
      this.store.dispatch(AuthActions.logout());
   }

   ngOnDestroy(){
      this.userSbs.unsubscribe();
   }
}