import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  constructor(
    private fileService: FileService
  ) { }

  content = '';

  ngOnInit() {
    this.content = this.replaceAll(this.fileService.currentFileData, this.fileService.currentSearchTerm);
    this.fileService.olderSearchTerms.forEach(searchTerm => {
      this.content = this.replaceAll(this.content, searchTerm, 'secondaryHighlight');
    });
  }

  replaceAll(data, searchTerm, color = 'searchTermHighlight') {

    const reg = `(${searchTerm})`;
    const regex: RegExp = new RegExp(reg, 'i');
    return data.split(regex).filter(v => !v.match(regex))
      .join(`<mark class="${color}">${searchTerm}</mark>`);
  }

}
