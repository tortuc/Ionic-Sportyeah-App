import { IExperience } from "./../../models/IExperience";
import { Subject } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { ExperienceService } from "src/app/service/experience.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.page.html",
  styleUrls: ["./experience.page.scss"],
})
export class ExperiencePage implements OnInit {
  @Input() public id: string;

  experiences$: Subject<IExperience[]>;
  constructor(
    public experienceService: ExperienceService,
    public userService: UserService
  ) {}

  ngOnInit(){
    this.experiences$ = this.experienceService.experiences$;
    this.experienceService.getExperiences(this.id);
  } 

 
}
