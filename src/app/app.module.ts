import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { FirebaseService } from "./services/firebase.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FormComponent } from "./components/threat-form/form.component";
import { GraphComponent } from "./components/threat-doughnut/graph.component";
import { GrowSpinnerComponent } from "./components/shared/grow-spinner/grow-spinner.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SpinnerComponent } from "./components/shared/spinner/spinner.component";
import { ThreatContainerComponent } from "./components/threat-container/threat-container.component";
import { TitleComponent } from "./components/title/title.component";
import { TooltipComponent } from "./components/shared/tooltip/tooltip.component";
import { OctocatComponent } from './components/octocat/octocat.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    FormComponent,
    LoginComponent,
    HomeComponent,
    SpinnerComponent,
    TooltipComponent,
    NavbarComponent,
    ThreatContainerComponent,
    TitleComponent,
    NotFoundComponent,
    GrowSpinnerComponent,
    OctocatComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, FirebaseService, BreakpointObserver ],
  bootstrap: [AppComponent]
})
export class AppModule {}
