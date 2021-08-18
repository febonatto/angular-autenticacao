import { Component, OnInit } from '@angular/core';

import { ReleasesService } from './../../services/releases.service';
import { Release } from './../../models/release.model';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  releases: Array<Release> = [];
  currentDatetime: string = '';

  constructor(private releasesService: ReleasesService) { }
  

  ngOnInit(): void {
    this.releasesService.readReleases()
      .subscribe(
        success => this.releases = success.data.content,
        err => console.log(err)
      );
  }

  downloadCSV(): void {
    this.releasesService.downloadCSV(this.releases);
  }

  downloadPDF(): void {
    this.releasesService.downloadPDF(this.releases);
  }

}
