import { Component, OnInit } from '@angular/core';
import { ISponsor } from 'src/app/models/ISponsor';
import { SponsorService } from 'src/app/service';

@Component({
  selector: 'sponsors-search',
  templateUrl: './sponsors-search.component.html',
  styleUrls: ['./sponsors-search.component.scss']
})
export class SponsorsSearchComponent implements OnInit {

  constructor(
    private readonly sponsorService:SponsorService
  ) { }

  ngOnInit() {
  }

  public sponsors: ISponsor[] = [];

  public searching: boolean = false;
  filter(ev) {
    const { value } = ev.detail;
    if (value) {
      this.searching = true;
      this.sponsorService.getSponsorsUsersByQuery(value).subscribe(
        (sponsors) => {
          this.searching = false;
          this.sponsors = sponsors;
        },
        () => {
          this.searching = false;
        }
      );
    } else {
      this.sponsors = [];
    }
  }

}
