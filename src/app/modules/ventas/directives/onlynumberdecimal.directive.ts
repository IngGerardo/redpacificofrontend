import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[onlyNumbersDecimal]'
})
export class OnlyNumbersDecimal {

  constructor(private _el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
  if ((e.keyCode < 46 || e.keyCode > 57) || e.keyCode == 47) {
    e.preventDefault();
  }
}
}