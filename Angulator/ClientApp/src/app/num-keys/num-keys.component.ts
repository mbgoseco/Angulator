import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-num-keys',
    template: `
      <section class="container">
        <h2>7</h2><h2>8</h2><h2>9</h2>
        <h2>4</h2><h2>5</h2><h2>6</h2>
        <h2>1</h2><h2>2</h2><h2>3</h2>
        <h2>0</h2><h2>+/-</h2><h2>.</h2>
      </section>
    `,
    styleUrls: ['./num-keys.component.css']
})

export class NumKeysComponent {

    @Input() public currentNum;

    constructor() {

    }


}
