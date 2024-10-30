import { Component } from '@angular/core';
import { InputCounter } from 'flowbite';
import type { InputCounterOptions, InputCounterInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-bet-settings',
  templateUrl: './bet-settings.component.html',
  styleUrl: './bet-settings.component.css'
})


export class BetSettingsComponent {
  betAmount: number = 1.00;
  minAmount: number = 0.01;
  maxAmount: number = 50.00;
  public step: number = 0.01;

  increment() {
    if(this.betAmount>=1 && this.betAmount<5){

      this.step=0.2
    }
    else if(this.betAmount>5 && this.betAmount<25){

      this.step=0.8
    }
    else if(this.betAmount>5 && this.betAmount<25){

      this.step=0.8
    }
    else{
      this.step=1.75
    }

    if (this.betAmount + this.step <= this.maxAmount) {
      this.betAmount = this.roundToTwo(this.betAmount + this.step);
    }
    else{
      this.betAmount = 50.00
    }
  }

  decrement() {
    if(this.betAmount>0 && this.betAmount<0.3){

      this.step=0.02
    }
    else if(this.betAmount<0.3){

      this.step=0.02
    }
    else if(this.betAmount<=1){

      this.step=0.08
    }
    else if(this.betAmount>1 && this.betAmount<5){

      this.step=0.2
    }
    else if(this.betAmount>5 && this.betAmount<25){

      this.step=0.8
    }
    else if(this.betAmount>5 && this.betAmount<25){

      this.step=0.8
    }
    else if(this.betAmount>25 ){
      this.step=1.75
    }
    if (this.betAmount - this.step >= this.minAmount) {
      this.betAmount = this.roundToTwo(this.betAmount - this.step);
    }
    else{
      this.betAmount = 0.01
    }
  }

  onInputChange(event: Event) {
    
    const input = event.target as HTMLInputElement;
    let value = parseFloat(input.value);


    if (isNaN(value)) {
      this.betAmount = this.minAmount;
    } else {
      value = this.roundToTwo(value);
      if (value < this.minAmount) {
        value = this.minAmount;
      } else if (value > this.maxAmount) {
        value = this.maxAmount;
      }
      this.betAmount = value;
    }
  }

  roundToTwo(num: number): number {
    return Math.round(num * 100) / 100;
  }
}
