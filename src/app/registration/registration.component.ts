import { Component, OnInit } from '@angular/core';
import { Registration } from '../Models/Registration';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registrationDetails: Registration = { userName:"", password:"", confirmPassword:""};

  constructor(private snackBar: MatSnackBar) { 

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }

  submitForm() {
    this.openSnackBar("New user registration successful!!! 👍🏾👍🏾👍🏾👍🏾", "Dismiss", 10000);
  }

  openSnackBar(message: string, action: string, showDuration: number) {
    this.snackBar.open(message, action, {
      duration: showDuration,
    });
  }



}