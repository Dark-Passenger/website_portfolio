import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  error: boolean;
  submitted: boolean;
  myform: FormGroup;
  name: FormControl;
  email: FormControl;
  phone: FormControl;
  message: FormControl;

  ngOnInit() {
    this.submitted = false;
    this.error = false;
    this.createFormControls();
    this.message = new FormControl();
    this.createForm();
  }
  
  onSubmit() {
      console.log(this.myform.value);
      this.http.post("http://api.happybrain.coach", this.myform.value)
                    .subscribe(
                      data => this.submitted = true,
                      error => this.error = true
                    );
                    
      this.myform.reset();
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
