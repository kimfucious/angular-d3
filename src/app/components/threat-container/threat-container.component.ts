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
      console.log(res);
      if (res.breakpoints[Breakpoints.XSmall]) {
        console.log("I'm extra small!");
        this.titleClasses = {
          "display-4": true,
          "mt-3": true
        };
        this.titleStyles = {
          "font-size": "24px"
        };
      } else if (res.breakpoints[Breakpoints.Small]) {
        console.log("I'm small!");
        this.titleClasses = {
          "display-4": true,
          "mt-5": true
        };
        this.titleStyles = {
          "font-size": "36px"
        };
      } else {
        console.log("Look how big I am!");
        this.titleClasses = {
          "display-4": true,
          "mt-5": true
        };
      }
    });
  }
}
