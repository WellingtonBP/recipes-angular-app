import { Action, createReducer, on } from '@ngrx/store';

import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
   user: User;
   error: string;
   loading: boolean;
};

const initialState: State = { 
   user: null,
   error: null,
   loading: false,
};

const _authReducer = createReducer(
   initialState,
   on(
      AuthActions.loginStart,
      AuthActions.signupStart,
      (state) => (
         {
            ...state,
            loading: true,
            error: null
         }
      )
   ),
   on(
      AuthActions.loginStart,
      (state) => state
   ),
   on(
      AuthActions.auth,
      (state, action) => (
         {
            ...state,
            user: action.user,
            loading: false,
            error: null
         }
      )
   ),
   on(
      AuthActions.authError,
      (state, action) => (
         {
            ...state,
            loading: false,
            error: action.errorMsg
         }
      )
   ),
   on(
      AuthActions.logout,
      (state) => (
         {
            ...state,
            user: null
         }
      )
   )
);

export function authReducer(state: State, action: Action){
   return _authReducer(state, action);
}