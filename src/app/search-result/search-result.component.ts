import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FileService } from '../file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() textMatches: any = {};

  @Input() searchParam = '';

  constructor(
    private apiService: ApiService,
    private fileService: FileService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  showCode() {
    if (this.searchParam === '') {
      return (this.textMatches.map(t => t.fragment).join(' '));
    } else {
      return (this.textMatches.map(t => this.buildResults(t)).join(' '));

    }
  }

  openFileHandler() {
    this.apiService.getRawN(this.textMatches[0].object_url, this.fileService.currentSearchTerm).subscribe(data => {
      console.log(data);
      this.fileService.currentFileData = data.code;
      this.fileService.downloadUrl = data.url;
      this.fileService.olderSearchTerms = data.olderSearchTerms.filter(o => o !== this.fileService.currentSearchTerm);
      this.router.navigateByUrl('/file');
    });
  }

  buildResults(itemdata) {
    let result = '';
    const indexPairs = itemdata.matches.map(match => match.indices);

    indexPairs.forEach(indexPair => {
      result = result + this.textReplace(itemdata.fragment, indexPair[0], indexPair[1]);
    });

    return result;



  }

  textReplace(item, startIndex, endIndex) {
    const originalTextFoundByRegex = item.substring(startIndex, endIndex);

    return item.substr(0, startIndex) + '<mark class="highlight">' + originalTextFoundByRegex
      + '</mark>' + item.substr(endIndex, item.length);

  }

}
