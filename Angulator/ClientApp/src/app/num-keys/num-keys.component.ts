import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-num-keys',
    template: `
      <section class="container">
        <h2 (click)="updateNum($event)">7</h2><h2 (click)="updateNum($event)">8</h2><h2 (click)="updateNum($event)">9</h2>
        <h2 (click)="updateNum($event)">4</h2><h2 (click)="updateNum($event)">5</h2><h2 (click)="updateNum($event)">6</h2>
        <h2 (click)="updateNum($event)">1</h2><h2 (click)="updateNum($event)">2</h2><h2 (click)="updateNum($event)">3</h2>
        <h2 (click)="updateNum($event)">0</h2><h2 (click)="negate()">+/-</h2><h2 (click)="useDecimal()">.</h2>
      </section>
    `,
    styleUrls: ['./num-keys.component.css']
})

export class NumKeysComponent {

    @Input() public currentNum;
    @Output() public displayEvent = new EventEmitter();
    public digit: number;
    public decimalUsed = false;

    constructor() {

    }

    updateNum(event) {
        this.digit = parseInt(event.target.innerHTML);
        console.log(`number updated with digit ${this.digit}`);
        this.displayEvent.emit((this.currentNum * 10) + this.digit);
        // TODO: Add case for right side decimal updating
    }

    negate() {

    }

    useDecimal() {

    }
}
