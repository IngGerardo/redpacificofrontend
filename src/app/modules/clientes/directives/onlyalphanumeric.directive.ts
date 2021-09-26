import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[onlyAlphanumeric]'
})
export class OnlyAlphanumeric {

  constructor(private _el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (((e.keyCode < 65 || e.keyCode > 90)) && (e.keyCode < 97 || e.keyCode > 122) 
    && (e.keyCode < 32 || e.keyCode > 32) && (e.keyCode < 48 || e.keyCode > 57 )) {
      e.preventDefault();
    }
  }
}