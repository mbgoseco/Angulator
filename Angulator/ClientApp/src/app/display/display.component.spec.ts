import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { DisplayComponent } from './display.component';

let component: DisplayComponent;
let fixture: ComponentFixture<DisplayComponent>;

describe('display component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DisplayComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(DisplayComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
