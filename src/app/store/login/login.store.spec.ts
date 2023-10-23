import { User } from "src/app/model/user/user";
import { AppInitialState } from "../AppInitialState";
import { LoginState } from "./LoginState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducer";

describe('Login store', ()=>{
    it('recoverPassword', ()=>{
        const initialState: LoginState = AppInitialState.login
        const newState = loginReducer(initialState, recoverPassword());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    }),
    it('recoverPasswordSuccess', ()=>{
        const initialState: LoginState = AppInitialState.login
        const newState = loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        });
    }),
    it('recoverPasswordFail', ()=>{
        const initialState: LoginState = AppInitialState.login
        const error = {error: 'error'}
        const newState = loginReducer(initialState, recoverPasswordFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    })
    it('Login', () => {
        const initialState:LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, login());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        })
    }),
    it('LoginSuccess', () => {
        const initialState:LoginState = {
            ...AppInitialState.login,
            isLoggingIn: true,
        
        }
        const user = new User();
        user.id = 'anyId'
        const newState = loginReducer(initialState, loginSuccess({user}));
        expect(newState).toEqual({
            ...initialState,
            isLoggedIn: true,
            isLoggingIn: false
        })
    }),
    it('LoginFail', () => {
        const initialState:LoginState = {
            ...AppInitialState.login,
            isLoggingIn: true,
        
        }
        const error = {error: 'error'}
        const newState = loginReducer(initialState, loginFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isLoggedIn: false,
            isLoggingIn: false
        })
    })
})