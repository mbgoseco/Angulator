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

    @Input('displayNum') public num;
    @Output() public displayEvent = new EventEmitter();

    constructor() {

    }

    sendNum(event) {
        event.target.value = event.target.value.replace(/[^0-9.-]/g, '').replace(/(\..*)\./g, '$1').replace(/(\-.*|[0-9].*)\-/g, '$1');
        this.num = event.target.value;
        this.displayEvent.emit(event.target.value);
    }
}
