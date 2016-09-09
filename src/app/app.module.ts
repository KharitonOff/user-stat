import { NgModule }                                     from '@angular/core'
import { BrowserModule }                                from '@angular/platform-browser'
import { FormsModule }                                  from '@angular/forms'
import { HttpModule }                                   from '@angular/http'

import { StoreModule }                                  from '@ngrx/store'

import { AppComponent }                                 from './app.component'
import { SearchComponent }                              from './search.component'
import { repoReducer, RepoService }                                  from './shared/repos';
import { userReducer }                                  from './shared/user';
import { TypeaheadModule, TypeaheadContainerComponent } from 'ng2-bootstrap/components/typeahead'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TypeaheadModule,
    StoreModule.provideStore({repos: repoReducer, user: userReducer})
  ],
  providers: [
    RepoService
  ],
  declarations: [
    AppComponent,
    SearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }