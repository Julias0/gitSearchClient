import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }


  searchGit(searchTerms, language, owner, repo, page) {
    return this.httpClient.get<any>('http://127.0.0.1:8000/searchGit', {
      params: {
        searchTerms,
        language,
        owner,
        repo,
        page
      }
    });
  }

  getRawN(objectUrl, searchTerm) {
    return this.httpClient.get<any>('http://127.0.0.1:8000/getRawFile', {
      params: {
        objectUrl,
        searchTerm
      }
    });

  }

  getRawFromHistory(url) {
    return this.httpClient.get<any>('http://127.0.0.1:8000/getRawFileFromHistory', {
      params: {
        url
      }
    });
  }

  getPrevOpenedFiles() {
    return this.httpClient.get<any>('http://127.0.0.1:8000/getPrevOpenedFiles');
  }

}
