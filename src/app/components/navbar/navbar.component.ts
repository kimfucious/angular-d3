import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import "rxjs/add/operator/takeUntil";
import { BreakpointsService } from "src/app/services/breakpoints.service";
import { Breakpoints } from "@angular/cdk/layout";
import { Location } from "@angular/common";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isLoggedIn: boolean;
  isXSmallScreen: boolean;
  loggedInUser: string;
  ngUnsubscribe: Subject<void> = new Subject();
  path: string;

  constructor(
    private authService: AuthService,
    private breakpointsService: BreakpointsService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.location.onUrlChange(res => {
      this.path = res;
    });
    this.breakpointsService.breakpoints.subscribe(res => {
      if (res.breakpoints[Breakpoints.XSmall]) {
        this.isXSmallScreen = true;
      } else {
        this.isXSmallScreen = false;
      }
    });
    this.authService
      .getAuth()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(auth => {
        if (auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
          this.loggedInUser = "";
        }
      });
  }
  handleLogout() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.authService.logout();
    this.router.navigate(["/login"]);
    this.isCollapsed = true;
  }
}
