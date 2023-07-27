import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appViewCard]'
})
export class ViewCardDirective {
  @Input('appViewCard') index: number = -1;

  constructor(private router: Router) { }

  @HostListener('click') onClick(): void {
    if (this.index >= 0) {
      this.router.navigate(['/card-single', this.index]);
    }
    console.log(this.index);
  }
}
