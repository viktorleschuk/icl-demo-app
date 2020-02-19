import { AfterContentChecked, Directive, ElementRef, Injectable, Input } from '@angular/core';

@Directive({
    selector: '[apiValidation]'
})

export class ApiValidationDirective implements AfterContentChecked {
    @Input('apiValidation') apiValidation: any;

    constructor(private element: ElementRef) {
    }

    ngAfterContentChecked() {
        if (this.apiValidation && this.apiValidation.errors && this.apiValidation.errors['custom']) {

            this.element.nativeElement.style.display = 'block';
            // this.element.nativeElement.style.position = 'relative';
            // this.element.nativeElement.style.top = '-15px';
            // this.element.nativeElement.style.font_size = '12px';
            this.element.nativeElement.innerHTML = this.apiValidation.errors['custom'];
        } else {

            this.element.nativeElement.style.display = 'none';

        }
    }
}
