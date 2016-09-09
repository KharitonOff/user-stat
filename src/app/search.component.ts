import { Component, Output, EventEmitter } from '@angular/core'
import { User } from './shared/user'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'search-user',
  template: `
    <input [(ngModel)]="user.name"
      [typeahead]="users"
      [typeaheadOptionField]="'login'"
      [typeaheadMinLength]="0"
      (typeaheadOnSelect)="selected.emit(user)"
      (input)="search(searchField.value)"
      placeholder="name" #searchField>
    `
})
export class SearchComponent {
  @Output() selected = new EventEmitter();

  public users: Array<any> = []
  private user = {}
  private wait = false

  constructor(private http: Http) {
    this.getUser('')
  }


  getUser(query): void {
    let queryUrl = 'https://api.github.com/search/users?q=' + query + '+type:user'

    this.wait = this.wait ? false : (() => {
      this.callGithubSearchUrl(queryUrl);
      setTimeout(() => { this.wait = false }, 1000)
      return true
    })()
  }

  search(query): void {
    this.getUser(query)
  }
  private callGithubSearchUrl(url: string): void{
    this.http.get(url)
      .map(response => {
        return response.json().items as Array<User>
      })
      .subscribe(res => {
        this.users = res
      })
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
