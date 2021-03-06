import { Injectable } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BreakpointsService {
  breakpoints: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoints = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]);
  }
}
