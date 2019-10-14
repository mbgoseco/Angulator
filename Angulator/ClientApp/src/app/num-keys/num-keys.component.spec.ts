import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { NumKeysComponent } from './num-keys.component';

let component: NumKeysComponent;
let fixture: ComponentFixture<NumKeysComponent>;

describe('num-keys component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NumKeysComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(NumKeysComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
