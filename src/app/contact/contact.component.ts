import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }
  
  not_submitted: boolean;
  submitted: boolean;
  myform: FormGroup;
  name: FormControl;
  email: FormControl;
  phone: FormControl;
  message: FormControl;

  ngOnInit() {
    this.submitted = false;
    this.createFormControls();
    this.message = new FormControl();
    this.createForm();
  }
  
  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted!");
      console.log(this.myform.value);
      this.myform.reset();
      this.submitted = true;
    }
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.message = new FormControl('', Validators.required);
    this.phone = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern('^[0-9]*$')]);
  }

  createForm() {
    this.myform = new FormGroup({
      name: this.name,
      email: this.email,
      message: this.message,
      phone: this.phone
    });
  }
}
