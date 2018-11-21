import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  currentFileData = '';
  downloadUrl = '';
  currentSearchTerm = '';
  olderSearchTerms = [];

  constructor() { }
}
