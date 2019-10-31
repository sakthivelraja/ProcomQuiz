import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { jackInTheBox } from 'ng-animate';
import { bounceInUp } from 'ng-animate';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('jackInTheBox', [transition('* => *', useAnimation(jackInTheBox, {
      params: { timing: 5 , delay: 0 }
    }))]),
    trigger('flash', [transition('* => *', useAnimation(bounceInUp, {
      params: { timing: 5 , delay: 0}
    }))])
  ],
})
export class WelcomeComponent implements OnInit {

  flash:any;
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

}
