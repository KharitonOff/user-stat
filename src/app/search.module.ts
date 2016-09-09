import { NgModule }           from '@angular/core'
import { BrowserModule }      from '@angular/platform-browser'
import { FormsModule }        from '@angular/forms'
import { HttpModule }         from '@angular/http'
import { SearchComponent }    from './search.component'
import { TypeaheadModule, TypeaheadContainerComponent } from 'ng2-bootstrap/components/typeahead'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TypeaheadModule
  ],
  declarations: [
    SearchComponent
  ],
  bootstrap: [ SearchComponent ]
})
export class SearchModule { }