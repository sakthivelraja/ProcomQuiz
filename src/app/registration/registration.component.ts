import { Component, OnInit } from '@angular/core';
import { Registration } from '../Models/QuizStructure';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registrationDetails: Registration;
  constructor() { 

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }

  validateUserName() {
    if(registrationDetails.userName) {

    }
  }

  validatePassword() {

  }

  validateConfirmPassword() {

  }

}