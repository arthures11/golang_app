import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'goappfront';
  constructor() {}
  ngOnInit():void  {
    initFlowbite();
    document.documentElement.classList.toggle(
      'dark',
      localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }





}


