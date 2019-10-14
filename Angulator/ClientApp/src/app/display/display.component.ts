import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-display',
    template: `
      <section>
        <input [(ngModel)]="num" (input)="sendNum(num)" type="number">
        {{num}}
      </section>
    `,
    styleUrls: ['./display.component.css']
})

export class DisplayComponent {

    @Input('currentNum') public num;
    @Output() public displayEvent = new EventEmitter();

    constructor() {

    }

    sendNum(num) {
        console.log('value changed!')
        this.displayEvent.emit(num);
    }
}
