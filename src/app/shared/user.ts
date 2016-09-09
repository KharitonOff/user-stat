import { Store }      from '@ngrx/store'
import { Injectable } from '@angular/core'

export interface User {
  id: number
  login: string
  name: string
}

//-------------------------------------------------------------------
// USER STORE
//-------------------------------------------------------------------
export const userReducer = (state: User = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_ITEM':
      return payload
    default:
      return state
  }
}


//-------------------------------------------------------------------
// USER SERVICE
//-------------------------------------------------------------------
@Injectable()
export class UserService {

}