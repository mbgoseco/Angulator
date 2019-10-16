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

    constructor() {

    }

    updateNum(event) {
        if (parseInt(this.currentNum) === 0 && !this.currentNum.includes('.')) {
            this.currentNum = '';
        }
        if (parseFloat(this.currentNum) < 0) {
            this.currentNum = (this.currentNum + event.target.innerHTML).slice(0, 17);
        } else {
            this.currentNum = (this.currentNum + event.target.innerHTML).slice(0, 16);
        }
        this.displayEvent.emit(this.currentNum);
    }

    negate() {
        if (this.currentNum === '') {
            this.displayEvent.emit('0');
        } else {
            this.displayEvent.emit((-(parseFloat(this.currentNum))).toString());
        }
    }

    useDecimal() {
        this.currentNum += '.';
        this.currentNum = this.currentNum.replace(/(\..*)\./g, '$1');
        this.displayEvent.emit(this.currentNum);
    }
}
