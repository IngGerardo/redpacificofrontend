import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[onlyNumbers]'
})
export class OnlyNumbers {

  constructor(private _el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
  if (e.keyCode < 48 || e.keyCode > 57 ) {
    e.preventDefault();
  }
}
}