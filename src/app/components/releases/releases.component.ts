import { Component, OnInit } from '@angular/core';

import { ReleasesService } from './../../services/releases.service';
import { Release } from './../../models/release.model';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  constructor(private releasesService: ReleasesService) { }

  releases: Array<Release> = [];

  ngOnInit(): void {
    this.releasesService.readReleases()
      .subscribe(success => this.releases = success.data.content);
  }

}
