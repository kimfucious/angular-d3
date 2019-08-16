import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import "rxjs/add/operator/takeUntil";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  isLoggedIn: boolean;
  loggedInUser: string;
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
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
  }
}
