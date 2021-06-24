import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-popover-options",
  templateUrl: "./popover-options.component.html",
  styleUrls: ["./popover-options.component.scss"],
})
export class PopoverOptionsComponent implements OnInit {
  constructor(public readonly popover: PopoverController) {}

  @Input() options = [];

  ngOnInit() {}

  option(o) {
    this.popover.dismiss(o);
  }
}
