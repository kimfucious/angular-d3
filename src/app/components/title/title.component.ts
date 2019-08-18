import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointsService } from "src/app/services/breakpoints.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.css"]
})
export class TitleComponent implements OnInit, OnDestroy {
  doughnutStyles = {};
  operatorStyles = {};
  titleImageStyles = {};
  ngUnsubscribe: Subject<void> = new Subject();
  constructor(private breakpointsService: BreakpointsService) {}
  ngOnInit() {
    this.breakpointsService.breakpoints
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
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
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
