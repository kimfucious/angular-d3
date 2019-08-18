import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointsService } from "src/app/services/breakpoints.service";

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.css"]
})
export class TitleComponent implements OnInit {
  doughnutStyles = {};
  operatorStyles = {};
  titleImageStyles = {};
  constructor(private breakpointsService: BreakpointsService) {}
  ngOnInit() {
    this.breakpointsService.breakpoints.subscribe(res => {
      const isSmall = res.matches;
      this.titleImageStyles = {
        height: isSmall ? "72px" : "128px",
        width: isSmall ? "72px" : "128px"
      };
      this.doughnutStyles = {
        "font-size": isSmall ? "64px" : "120px"
      };
      this.operatorStyles = {
        "font-size": isSmall ? "28px" : "56px"
      };
    });
  }
}
