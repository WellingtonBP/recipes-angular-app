import { createAction, props } from "@ngrx/store";

import { User } from "../user.model";

export const loginStart = createAction(
   '[Auth] Login Start',
   props<{email: string, password: string}>()
);

export const auth = createAction(
   '[Auth] Auth Success',
   props<{user: User, redirect: boolean}>()
);

export const authError = createAction(
   '[Auth] Auth Error',
   props<{errorMsg: string}>()
);

export const autoLogin = createAction(
   '[Auth] Auto Login'
);

export const logout = createAction(
   '[Auth] Logout'
);

export const signupStart = createAction(
   '[Auth] Signup Start',
   props<{email: string, password: string}>()
);