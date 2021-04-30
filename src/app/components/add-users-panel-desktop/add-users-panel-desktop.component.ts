import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "add-users-panel-desktop",
  templateUrl: "./add-users-panel-desktop.component.html",
  styleUrls: ["./add-users-panel-desktop.component.scss"],
})
export class AddUsersPanelDesktopComponent implements OnInit {
  /**
   * Solo es true si esta en la pagina del post
   */
  @Input() postPage: boolean = false;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe((data) => {
      this.query = data?.q || "";
    });
  }

  users: any[] = [];

  ngOnInit() {
    this.filter();
  }

  query = "";

  loading = false;
  filter(query = "") {
    this.query = query;
    this.loading = true;
    if (this.query == "") {
      this.mostPopular();
    } else {
      this.userService
        .queryUsers(this.query)
        .pipe(take(1))
        .subscribe(
          (users: User[]) => {
            this.users = users;
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
    }
  }
  mostPopular() {
    this.userService
      .mostPopulateUsers()
      .pipe(take(1))
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  seeAll() {
    this.router.navigate(["/search"], {
      queryParams: { query: this.query, type: "users" },
    });
  }
}
