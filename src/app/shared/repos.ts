import { Headers, Http, Response }  from '@angular/http'
import { Injectable }               from '@angular/core'
import { Store }                    from '@ngrx/store'
import { Observable }               from 'rxjs/Observable'
import { AppStore }                 from './store'

export interface Repo {
  id: number
  name: string
}

//-------------------------------------------------------------------
// REPO STORE
//-------------------------------------------------------------------
export const repoReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_ITEMS':
      return payload
    default:
      return state
  }
}


//-------------------------------------------------------------------
// REPO SERVICE
//-------------------------------------------------------------------
@Injectable()
export class RepoService {
  repos: Observable<Repo[]>
  headers: Headers
  constructor(
    private store: Store<AppStore>,
    private http: Http
  ) {
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Authorization', 'Token 617745825bc64903e76663cc6833653be929d004')

    this.repos = store.select('repos') as Observable<Repo[]>
  }

  loadRepos() {
    let newRepos: Repo[];

    this.http.get('https://api.github.com/repositories', { headers: this.headers }).subscribe((res) => {
      newRepos = res.json();
      this.store.dispatch({type: 'ADD_ITEMS', payload: newRepos})
    })

  }
}