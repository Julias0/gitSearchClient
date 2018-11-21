import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private fileService: FileService
  ) { }

  fg: FormGroup;
  languages: string[] = ['Python', 'Javascript', 'C#'];
  currentPage = 1;
  textMatches = [];

  ngOnInit() {

    this.fg = this.fb.group({
      'search': [],
      'owner': [],
      'language': [],
      'repository': []
    });
  }

  searchClickHandler() {
    this.fileService.currentSearchTerm = this.fg.controls['search'].value;
    this.apiService.searchGit(this.fg.controls['search'].value,
      this.fg.controls['language'].value,
      this.fg.controls['owner'].value,
      this.fg.controls['repository'].value, this.currentPage).subscribe(data => {
        this.textMatches = data.items.map(v => v.text_matches);

      });
  }

}
