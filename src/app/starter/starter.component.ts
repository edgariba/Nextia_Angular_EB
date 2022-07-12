import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  userForm: FormGroup;
  isLoading: boolean = false
  hide = true;
  constructor(public fb: FormBuilder,
    private router: Router) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }


  login() {
    if (this.userForm.invalid) {
      return;
    }
    this.loadSpinner()
    var param = {
      email: this.userForm.value.email,
      password: this.userForm.value.password
    };
    let body = JSON.stringify(param);
    this.terminateSpinner()
  }

  addOrRemoveClass() {
    $("#layout").removeClass("page-start");
    $("#layout").addClass("page-wrapper");
  }
}
