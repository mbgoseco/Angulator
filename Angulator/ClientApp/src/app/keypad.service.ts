import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IKeypad } from './keypad';

@Injectable()
export class KeypadService {
    private _url: string = "/assets/data/keypad.json";

    constructor(private http: HttpClient) {
    }

    getKeypad() {
        return this.http.get<IKeypad[]>(this._url)
    }
}
