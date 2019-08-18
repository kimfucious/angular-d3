import { Component, OnInit } from "@angular/core";
import { BreakpointsService } from "src/app/services/breakpoints.service";
import { Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-threat-container",
  templateUrl: "./threat-container.component.html",
  styleUrls: ["./threat-container.component.css"]
})
export class ThreatContainerComponent implements OnInit {
  isXSmallScreen: boolean;
  isSmallScreen: boolean;
  titleStyles: {};
  titleClasses: {};
  constructor(private breakpointsService: BreakpointsService) {}

  ngOnInit() {
    this.breakpointsService.breakpoints.subscribe(res => {
      if (res.breakpoints[Breakpoints.XSmall]) {
        this.titleClasses = {
          "display-4": true,
          "mt-3": true
        };
        this.titleStyles = {
          "font-size": "24px"
        };
      } else if (res.breakpoints[Breakpoints.Small]) {
        this.titleClasses = {
          "display-4": true,
          "mt-5": true
        };
        this.titleStyles = {
          "font-size": "36px"
        };
      } else {
        this.titleClasses = {
          "display-4": true,
          "mt-5": true
        };
        this.titleStyles = {
          "font-size": "56px"
        };
      }
    });
  }
}
