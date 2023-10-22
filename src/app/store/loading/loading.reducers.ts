import { createReducer } from "@ngrx/store";
import { hide, show } from "./loading.actions";

const reducer = createReducer({},

on(show,() = > {
    return {}; 
}),
on(hide, ()=>{
    return {};
})
);

export function loadingReducer(state,action) {
    return reducer(state, action)
}