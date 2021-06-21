import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'aoo-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  public loginMode = true;
  public isLoading = false;
  public error = null;
  private storeSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private titleService: Title
  ) {}

  ngOnInit(): void {
     this.titleService.setTitle('Auth')
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.error;
    });
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.error = null;
      if (!this.loginMode) {
        this.store.dispatch(
          AuthActions.signupStart({
            email: form.value.email,
            password: form.value.password,
          })
        );
      } else {
        this.store.dispatch(
          AuthActions.loginStart({
            email: form.value.email,
            password: form.value.password,
          })
        );
      }
      form.reset();
    }
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}