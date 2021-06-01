import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "category-card",
  templateUrl: "./category-card.component.html",
  styleUrls: ["./category-card.component.scss"],
})
export class CategoryCardComponent implements OnInit {
  @Input() category;

  constructor() {}

  ngOnInit() {}
}
