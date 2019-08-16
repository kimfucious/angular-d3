import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = "";
  showSpinner: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  handleLogin(value) {
    this.showSpinner = true;
    this.authService.login(value.email, value.password).then(
      res => {
        this.router.navigate([""]);
        this.showSpinner = false;
      },
      err => {
        console.log(err);
        this.showSpinner = false;
        this.errorMessage = err.message;
        this.flashMessage.show(err.message, {
          cssClass: "alert-danger",
          timeout: "4000"
        });
      }
    );
  }
}
