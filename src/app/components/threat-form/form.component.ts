import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";
import { Threat, ThreatId } from "../../models/ThreatDoughnut";
import { Subject } from "rxjs";
import "rxjs/add/operator/takeUntil";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  itemForm: FormGroup;
  threats: ThreatId[];
  threatSeed: Threat[];
  isLoading: boolean;
  ngUnsubscribe: Subject<void> = new Subject();
  validationMessages = {
    name: [{ type: "required", message: "Name is required." }],
    code: [{ type: "maxlength", message: "Max code length: 4 digits" }],
    value: [{ type: "required", message: "Incidents is required." }]
  };

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.threatSeed = [
      {
        name: "Click-jacking",
        code: "cwe-451",
        value: 20
      },
      {
        name: "Content-spoofing",
        code: "cwe-345",
        value: 10
      },
      {
        name: "Open-redirect",
        code: "cwe-601",
        value: 30
      },
      {
        name: "Cross-site Request Forgery",
        code: "cwe-352",
        value: 30
      },
      {
        name: "Other",
        code: "",
        value: 20
      }
    ];
    this.createForm();
    this.firebaseService
      .getThreats()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(threats => {
        this.threats = threats;
        this.isLoading = false;
      });
  }

  OnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  createForm() {
    this.itemForm = this.fb.group({
      name: ["", Validators.required],
      code: ["", Validators.maxLength(4)],
      value: ["", Validators.required]
    });
  }

  resetFields() {
    this.itemForm = this.fb.group({
      name: new FormControl("", Validators.required),
      code: new FormControl("", Validators.maxLength(4)),
      value: new FormControl("", Validators.required)
    });
  }

  onSubmit(formData) {
    this.firebaseService.addThreat(formData).then(res => {
      this.resetFields();
    });
  }

  handleSeedThreats() {
    this.firebaseService.seedThreats(this.threatSeed);
  }
}
