import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isNumber } from 'util';

@Component({
    selector: 'app-num-keys',
    template: `
      <section class="container">
        <h2 class="funcs" (click)="operate($event)">x^y</h2><h2 class="funcs" (click)="clearEntry()">CE</h2><h2 class="funcs" (click)="clearAll()">C</h2><h2 class="funcs" (click)="operate($event)">/</h2>
        <h2 class="nums" (click)="updateNum($event)">7</h2><h2 class="nums" (click)="updateNum($event)">8</h2><h2 class="nums" (click)="updateNum($event)">9</h2><h2 class="funcs" (click)="operate($event)">X</h2>
        <h2 class="nums" (click)="updateNum($event)">4</h2><h2 class="nums" (click)="updateNum($event)">5</h2><h2 class="nums" (click)="updateNum($event)">6</h2><h2 class="funcs" (click)="operate($event)">-</h2>
        <h2 class="nums" (click)="updateNum($event)">1</h2><h2 class="nums" (click)="updateNum($event)">2</h2><h2 class="nums" (click)="updateNum($event)">3</h2><h2 class="funcs" (click)="operate($event)">+</h2>
        <h2 class="nums" (click)="updateNum($event)">0</h2><h2 class="nums" (click)="negate()">+/-</h2><h2 class="nums" (click)="useDecimal()">.</h2><h2 id="equals" (click)="equals()">=</h2>
      </section>
    `,
    styleUrls: ['./num-keys.component.css']
})

export class NumKeysComponent {

    @Input() public currentNum;
    @Output() public displayEvent = new EventEmitter();
    public num1 = 0;
    public operator = '';

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

    clearEntry() {
        this.currentNum = '0';
        this.displayEvent.emit(this.currentNum);
    }

    clearAll() {
        this.currentNum = '0';
        this.num1 = 0;
        this.operator = '';
        this.displayEvent.emit(this.currentNum);
    }

    operate(event) {
        if (this.operator != '' && (!isNaN(this.currentNum)) && this.currentNum != '') {  // In case of chain operations
            this.equals();
        }
        this.operator = event.target.innerHTML;
        if (isNaN(this.currentNum) || this.currentNum == '') {
            this.currentNum = this.num1.toString();
        }
        this.num1 = parseFloat(this.currentNum);
        this.currentNum = '';
    }

    equals() {
        switch (this.operator) {
            case '+':
                if (isNaN(this.currentNum) || this.currentNum == '') { this.currentNum = this.num1; }
                this.currentNum = (this.num1 + parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case '-':
                if (isNaN(this.currentNum) || this.currentNum == '') { this.currentNum = this.num1; }
                this.currentNum = (this.num1 - parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case 'X':
                if (isNaN(this.currentNum) || this.currentNum == '') { this.currentNum = this.num1; }
                this.currentNum = (this.num1 * parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case '/':
                if (isNaN(this.currentNum) || this.currentNum == '') { this.currentNum = this.num1; }
                this.currentNum = (this.num1 / parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case 'x^y':
                if (isNaN(this.currentNum) || this.currentNum == '') { this.currentNum = this.num1; }
                this.currentNum = (Math.pow(this.num1, parseFloat(this.currentNum))).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            default:
        }
        this.operator = '';
    }
}
