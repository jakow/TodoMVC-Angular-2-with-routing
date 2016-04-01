import {Directive, Input, ElementRef, Inject} from 'angular2/core';

@Directive({
    selector: '[todoFocus]'
})
export class FocusDirective {
    @Input()
    todoFocus:boolean;
    constructor(private element: ElementRef) {
      console.log("Created a focus directive");
    }
    protected ngOnChanges() {
        console.log("Now focusing on "+ this.element.nativeElement);
        this.element.nativeElement.focus();
    }
}
