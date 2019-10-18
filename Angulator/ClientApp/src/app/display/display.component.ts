import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-display',
    template: `
      <section>
        <input [(ngModel)]="num" (input)="sendNum($event)" type="text" maxlength="16" autofocus>
      </section>
    `,
    styleUrls: ['./display.component.css']
})

export class DisplayComponent {

    @Input('currentNum') public num;
    @Output() public displayEvent = new EventEmitter();

    constructor() {

    }

    sendNum(event) {
        console.log(`value before replace:   ${event.target.value}`);
        event.target.value = event.target.value.replace(/[^0-9.-]/g, '').replace(/(\..*)\./g, '$1').replace(/(\-.*|[0-9].*)\-/g, '$1');
        console.log(`value after replace:   ${event.target.value}`);
        this.num = event.target.value;
        this.displayEvent.emit(event.target.value);
    }
}
