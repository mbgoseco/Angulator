import { Component, Input, Output, EventEmitter } from '@angular/core';

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

    @Input() public displayNum;
    @Output() public displayEvent = new EventEmitter();
    public currentNum = '0';
    public num1 = 0;
    public operator = '';
    public lastOperator = '';
    public lastNum = '';

    constructor() {

    }

    checkDisplay() {
        if (this.displayNum != this.currentNum) {
            this.currentNum = this.displayNum;
            this.lastNum = this.currentNum;
        }
    }

    updateNum(event) {
        console.log(`DN before update ${this.displayNum}`);
        this.checkDisplay();
        this.lastOperator = '';
        if (parseInt(this.displayNum) === 0 && !this.displayNum.includes('.')) {
            this.currentNum = '';
        }
        if (parseFloat(this.displayNum) < 0) {
            console.log(`DN inside < 0 update ${this.displayNum}`);
            this.currentNum = (this.currentNum + event.target.innerHTML).slice(0, 17);
        } else {
            console.log(`DN inside else update ${this.displayNum}`);
            this.currentNum = (this.currentNum + event.target.innerHTML).slice(0, 16);
        }
        this.lastNum = this.currentNum;
        this.displayNum = this.currentNum;
        this.displayEvent.emit(this.currentNum);
        console.log(`DN after update ${this.displayNum}`);
    }

    negate() {
        this.lastOperator = '';
        this.checkDisplay();
        if (this.currentNum == '') {
            this.currentNum = '0';
            this.lastNum = this.currentNum;
            this.displayNum = this.currentNum;
            this.displayEvent.emit('0');
        } else {
            this.currentNum = (-(parseFloat(this.currentNum))).toString();
            this.lastNum = this.currentNum;
            this.displayNum = this.currentNum;
            this.displayEvent.emit(this.currentNum);
        }
    }

    useDecimal() {
        this.lastOperator = '';
        this.checkDisplay();
        this.currentNum += '.';
        this.currentNum = this.currentNum.replace(/(\..*)\./g, '$1');
        this.lastNum = this.currentNum;
        this.displayNum = this.currentNum;
        this.displayEvent.emit(this.currentNum);
    }

    clearEntry() {
        this.currentNum = '0';
        this.displayNum = this.currentNum;
        this.displayEvent.emit(this.currentNum);
    }

    clearAll() {
        this.displayNum = '0';
        this.currentNum = '0';
        this.num1 = 0;
        this.operator = '';
        this.lastOperator = '';
        this.lastNum = '';
        this.displayEvent.emit(this.currentNum);
    }

    operate(event) {
        console.log(`CN before chain case ${this.currentNum}`);
        console.log(`N1 before chain case ${this.num1}`);
        if (this.operator != '' && (!isNaN(parseFloat(this.currentNum))) && this.currentNum != '') {  // Chain operations
            this.equals();
        }
        this.checkDisplay();
        this.operator = event.target.innerHTML;
        if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') {
            this.currentNum = (this.num1).toString();
        }
        this.num1 = parseFloat(this.currentNum);
        this.currentNum = '';
        this.displayNum = '';
        this.lastOperator = '';
        this.displayNum = this.currentNum;
        console.log(`CN at end of operate ${this.currentNum}`);
        console.log(`N1 at end of operate ${this.num1}`);
    }

    equals() {
        this.checkDisplay();
        if (this.lastOperator != '') {  // Chain equals with last used operator and number
            this.operator = this.lastOperator;
            this.num1 = parseFloat(this.currentNum);
            this.currentNum = this.lastNum;
        }
        switch (this.operator) {
            case '+':
                if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') { this.currentNum = this.num1.toString(); }
                this.currentNum = (this.num1 + parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case '-':
                if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') { this.currentNum = this.num1.toString(); }
                this.currentNum = (this.num1 - parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case 'X':
                if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') { this.currentNum = this.num1.toString(); }
                this.currentNum = (this.num1 * parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case '/':
                if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') { this.currentNum = this.num1.toString(); }
                this.currentNum = (this.num1 / parseFloat(this.currentNum)).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            case 'x^y':
                if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') { this.currentNum = this.num1.toString(); }
                this.currentNum = (Math.pow(this.num1, parseFloat(this.currentNum))).toString();
                this.displayEvent.emit(this.currentNum);
                break;
            default:
        }
        this.displayNum = this.currentNum;
        this.lastOperator = this.operator;
        this.operator = '';
        console.log(`DN at end of equals() ${this.displayNum}`);
        console.log(`CN at end of equals() ${this.currentNum}`);
        console.log(`N1 at end of equals() ${this.num1}`);
    }
}
