import { Injectable } from '@angular/core';

@Injectable()
export class LibraryService {

    constructor() { }


    /**
     * Returns true of d1 and d2 are on same day.
     * @param d1 Date 1
     * @param d2 DAte 2
     */
    isEqualDates(d1, d2): boolean {
        if (!d1 || !d2) return false;
        if (typeof d1.getFullYear === void 0) return false;
        if (typeof d1.getFullYear === void 0) return false;
        return d1.getFullYear() == d2.getFullYear()
            && d1.getMonth() == d2.getMonth()
            && d1.getDate() == d2.getDate();
    }

    /**
     * It gets milliseconds and return true if it is today.
     * @param ms Milliseconds to check if it is on today.
     */
    isToday(ms): boolean {
        if (typeof ms === 'string') ms = parseInt(ms);
        let d1 = new Date(ms);
        let d2 = new Date();
        return this.isEqualDates(d1, d2);
    }


    isCordova(): boolean {
        if (window['cordova']) return true;
        if (document.URL.indexOf('http://') === -1
            && document.URL.indexOf('https://') === -1) return true;
        return false;
    }
}