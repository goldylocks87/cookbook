import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false; // adds or removes the 'open' class

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}