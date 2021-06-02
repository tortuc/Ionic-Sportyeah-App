import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

enum Texts {
  see = "division_options.see",
  edit = "division_options.edit",
  delete = "division_options.delete",
  cancel = "cancel",
}

@Component({
  selector: "app-division-options",
  templateUrl: "./division-options.component.html",
  styleUrls: ["./division-options.component.scss"],
})
export class DivisionOptionsComponent implements OnInit {
  public readonly Texts = Texts;

  constructor(public readonly popover: PopoverController) {}

  options = [
    {
      icon: "eye-outline",
      text: Texts.see,
      action: "see",
    },
    {
      icon: "create-outline",
      text: Texts.edit,
      action: "edit",
    },
    {
      icon: "trash-bin-outline",
      text: Texts.delete,
      action: "delete",
    },
  ];

  ngOnInit() {}

  option(o) {
    this.popover.dismiss(o);
  }
}
