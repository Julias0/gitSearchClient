import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FileService } from '../file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-history',
  templateUrl: './file-history.component.html',
  styleUrls: ['./file-history.component.scss']
})
export class FileHistoryComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private fileService: FileService,
    private router: Router
  ) {
  }

  fileUrls = [];

  ngOnInit() {
    this.apiService.getPrevOpenedFiles().subscribe(data => {
      this.fileUrls = data.prev.map(v => v.fileUrl);
      console.log(this.fileUrls);
    });



  }


  clickHandler(fileUrl) {
    this.apiService.getRawFromHistory(fileUrl).subscribe(data => {
      this.fileService.currentSearchTerm = null;
      this.fileService.olderSearchTerms = data.olderSearchTerms;
      this.fileService.downloadUrl = fileUrl;
      this.fileService.currentFileData = data.code;
      this.router.navigateByUrl('/file');
    });
  }

}
