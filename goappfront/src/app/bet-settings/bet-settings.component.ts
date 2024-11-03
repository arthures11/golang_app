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
  potentialWin: string = '6,666.00';

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

    this.potentialWin = this.formatNumberString((this.betAmount * 6666.00).toFixed(2));

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
    this.potentialWin = this.formatNumberString((this.betAmount * 6666.00).toFixed(2));

  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;

    // Remove any dots after the first one
    const dotIndex = inputValue.indexOf('.');
    if (dotIndex !== -1) {
      const beforeDot = inputValue.substring(0, dotIndex);
      const afterDot = inputValue.substring(dotIndex + 1).replace(/\./g, '');
      // Limit decimal places to 2
      const limitedAfterDot = afterDot.substring(0, 2);
      inputValue = beforeDot + '.' + limitedAfterDot;
      input.value = inputValue;
    }

    // Handle empty input
    if (inputValue === '') {
      this.betAmount = 0;
      return;
    }

    // Handle single dot input
    if (inputValue === '.') {
      this.betAmount = 0;
      input.value = '0.';
      return;
    }

    // Handle inputs starting with dot
    if (inputValue.startsWith('.')) {
      inputValue = `0${inputValue}`;
      input.value = inputValue;
    }

    // Allow single leading zero for decimal numbers
    if (inputValue === '0') {
      this.betAmount = 0;
      return;
    }

    // If still typing decimals or starting with 0, don't format yet
    if (inputValue.endsWith('.') ||
      (inputValue.startsWith('0') && inputValue.includes('.') && !isNaN(parseFloat(inputValue)) && inputValue.length <= 4)) {
      this.betAmount = parseFloat(inputValue) || 0;
      this.potentialWin = this.formatNumberString((this.betAmount * 6666.00).toFixed(2));
      return;
    }

    let value = parseFloat(inputValue);

    if (isNaN(value)) {
      this.betAmount = this.minAmount;
      input.value = this.minAmount.toString();
    } else {
      value = this.roundToTwo(value);

      // Only apply min amount check if we're not in the middle of typing a valid decimal
      const isTypingDecimal = inputValue.includes('.') || inputValue === '0';
      if (!isTypingDecimal && value < this.minAmount) {
        value = this.minAmount;
      } else if (value > this.maxAmount) {
        value = this.maxAmount;
      }

      this.betAmount = value;
      input.value = value.toString();
      this.potentialWin = this.formatNumberString((this.betAmount * 6666.00).toFixed(2));
    }
  }

  roundToTwo(num: number): number {
    return Math.round(num * 100) / 100;
  }

  formatNumberString = (str: string): string => {
    const [integerPart, decimalPart] = str.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${formattedInteger}.${decimalPart.padEnd(2, '0')}` : `${formattedInteger}.00`;
  };
}
