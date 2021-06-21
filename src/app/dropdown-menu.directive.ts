import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownMenu]',
})
export class DropdownMenuDirective {
  show = false; 

  @HostListener('document:click', ['$event']) onClick(event: Event): void {
    this.show = !this.show && this.elRef.nativeElement.contains(event.target);
    const display = this.show ? 'block' : 'none';
    this.renderer.setStyle(this.renderer.nextSibling(this.elRef.nativeElement), 'display', display);
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

}
