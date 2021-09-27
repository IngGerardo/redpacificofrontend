import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[onlyUppercase]'
})
export class OnlyUppercase {

  constructor(private ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event) {
    this.ref.nativeElement.value = event.target.value.toUpperCase();
 }
}