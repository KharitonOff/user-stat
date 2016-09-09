import { Component, Output, EventEmitter } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'
import { AppStore } from './shared/store';
import { SearchComponent } from './search.component'
import { Repo, RepoService } from './shared/repos';

import 'rxjs/add/operator/toPromise'

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <search-user (selected)="user = $event"></search-user>
    <button (click)="callApi()" class="btn ">Search</button>
    <h2>{{user.name}} details!</h2>
    <li *ngFor="let repo of repos | async"><a href="{{repo.html_url}}">{{repo.full_name}}</a>
        <ul>
            <li *ngFor="let contributor of contributorList[repo.full_name]">
                {{contributor.author.login}} {{contributor.total}}
            </li>
        </ul>
    </li>
    `
})
export class AppComponent {
    title = "User Statistics"
    repos: Observable<Array<Repo>>
    contributorList = {}
    public user = {}
    private headers: Headers
    constructor(
        private http: Http,
        private repoService: RepoService,
        private store: Store<AppStore>
    ) {
        this.headers = new Headers()
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Authorization', 'Token 617745825bc64903e76663cc6833653be929d004')

        this.repos = repoService.repos
        repoService.loadRepos();
    }

    callApi(): void{
                console.log('clicked')
        // this.allRepos()
        //     .map((res) => {
        //         this.repos = res.json()
        //         this.repos.forEach((repo) => {
        //             this.contributors(repo.owner.login, repo.name).subscribe((res) => {
        //                 this.contributorList[repo.full_name] = res.json()
        //                 // console.log(this.contributorList)
        //             })
        //         })
        //     }).subscribe()
    }
    // getAllRepos
    allRepos(): Observable<Response>{
        return this.http.get('https://api.github.com/repositories', {headers: this.headers})
    }
    // list contributors with statistics /repos/:owner/:repo/stats/contributors
    contributors(owner:string, repo:string): Observable<Response>{
        return this.http.get('https://api.github.com/repos/' + owner + '/' + repo + '/stats/contributors', {headers: this.headers})
    }
    // GET /repos/:owner/:repo/languages
    languages(owner:string, repo:string): Observable<Response>{
        return this.http.get('https://api.github.com/repos/' + owner + '/' + repo + '/languages', {headers: this.headers})
    }
    // detectLanguage(fileName: string, content: string): Observable<Response>{
    //     let body = JSON.stringify({ fileName: fileName, content: content });
    //     return this.http.post('http://localhost:4000/api/v0/language', body)
    // }
}