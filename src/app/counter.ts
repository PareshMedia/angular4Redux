import { Action } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const ADDCITY = 'ADDCITY';

export function counterReducer(city = {}, action: Action) {

  switch (action.type) {

    case ADDCITY:
      return action.city;
  }
}