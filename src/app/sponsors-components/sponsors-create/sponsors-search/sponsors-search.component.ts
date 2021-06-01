import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ISponsor } from "src/app/models/ISponsor";
import { User } from "src/app/models/IUser";
import { SponsorService } from "src/app/service";

@Component({
  selector: "sponsors-search",
  templateUrl: "./sponsors-search.component.html",
  styleUrls: ["./sponsors-search.component.scss"],
})
export class SponsorsSearchComponent implements OnInit {
  constructor(private readonly sponsorService: SponsorService) {}

  ngOnInit() {}

  public sponsors: User[] = [];
 
  public searching: boolean = false;

  lastQuery = "";

  /**
   * Busca patrocinadores por una query
   */
  filter(ev) {
    const { value } = ev.detail;
    this.lastQuery = value;
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

  @Output() selected = new EventEmitter<User>();
  /**
   * Se emite el evento selected con el sponsor clickeado
   */
  select(sponsor) {
    this.selected.emit(sponsor);
  }
}
