import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { KeypadService } from '../keypad.service';

@Component({
    selector: 'app-num-keys',
    template: `
      <section class="container">
        <h2 class="funcs" (click)="operate(4)">x^y</h2><h2 class="funcs" (click)="clearEntry()">CE</h2><h2 class="funcs" (click)="clearAll()">C</h2><h2 class="funcs" (click)="operate(0)">/</h2>
        <h2 class="nums" (click)="updateNum(7)">7</h2><h2 class="nums" (click)="updateNum(8)">8</h2><h2 class="nums" (click)="updateNum(9)">9</h2><h2 class="funcs" (click)="operate(1)">X</h2>
        <h2 class="nums" (click)="updateNum(4)">4</h2><h2 class="nums" (click)="updateNum(5)">5</h2><h2 class="nums" (click)="updateNum(6)">6</h2><h2 class="funcs" (click)="operate(2)">-</h2>
        <h2 class="nums" (click)="updateNum(1)">1</h2><h2 class="nums" (click)="updateNum(2)">2</h2><h2 class="nums" (click)="updateNum(3)">3</h2><h2 class="funcs" (click)="operate(3)">+</h2>
        <h2 class="nums" (click)="updateNum(0)">0</h2><h2 class="nums" (click)="negate()">+/-</h2><h2 class="nums" (click)="useDecimal()">.</h2><h2 id="equals" (click)="equals()">=</h2>
      </section>
    `,
    styleUrls: ['./num-keys.component.css']
})

export class NumKeysComponent implements OnInit {

    @Input() public displayNum;
    @Output() public displayEvent = new EventEmitter();
    public keypad = [];
    public newNum = false;
    public currentNum = '0';
    public num1 = 0;
    public operator = '';
    public lastOperator = '';
    public lastNum = '';

    constructor(private _keypadService: KeypadService) {
    }

    ngOnInit() {
        this._keypadService.getKeypad()
            .subscribe(data => this.keypad = data);
    }

    checkDisplay() {
        if (this.displayNum != this.currentNum) {
            this.currentNum = this.displayNum;
            this.lastNum = this.currentNum;
        }
    }

    clearNum() {
        if (this.newNum) {
            this.displayNum = '';
            this.currentNum = '';
            this.newNum = false;
        }
    }

    updateNum(idx) {
        this.checkDisplay();
        this.clearNum();
        this.lastOperator = '';
        if (parseInt(this.displayNum) === 0 && !this.displayNum.includes('.')) {
            this.currentNum = '';
        }
        if (parseFloat(this.displayNum) < 0) {
            this.currentNum = (this.currentNum + this.keypad[0].numkeys[idx]).slice(0, 17);
        } else {
            this.currentNum = (this.currentNum + this.keypad[0].numkeys[idx]).slice(0, 16);
        }
        this.lastNum = this.currentNum;
        this.displayNum = this.currentNum;
        this.displayEvent.emit(this.currentNum);
    }

    negate() {
        this.lastOperator = '';
        this.checkDisplay();
        this.clearNum();
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
        this.clearNum();
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

    operate(idx) {
        if (this.operator != '' && (!isNaN(parseFloat(this.currentNum))) && this.currentNum != '') {  // Chain operations
            this.equals();
        }
        this.newNum = true;
        this.checkDisplay();
        this.operator = this.keypad[0].operators[idx];
        if (isNaN(parseFloat(this.currentNum)) || this.currentNum == '') {
            this.currentNum = (this.num1).toString();
        }
        this.num1 = parseFloat(this.currentNum);
        this.lastOperator = '';
        this.clearNum();
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
        this.newNum = true;
    }
}
