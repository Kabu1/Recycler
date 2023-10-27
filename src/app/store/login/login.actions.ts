import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user";

export const recoverPassword = createAction("[Recover password]", props<{email: string}>());
console.log('are we here', recoverPassword)

export const recoverPasswordSuccess = createAction("[Recover password] success");
console.log('are we here', recoverPasswordSuccess)

export const recoverPasswordFail = createAction("[Recover password] fail", props<{error: any}>());
console.log('are we here', recoverPasswordFail)


export const login = createAction('[Login]');
export const loginSuccess = createAction('[Login] success', props<{user: User}>());
export const loginFail = createAction('[Login] fail', props<{error: any}>());
