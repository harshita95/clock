export class Clock {
    constructor(date) {
        this._date = date;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    updateTime(date = new Date()) {
        this._date = date;
        setTimeout(this.updateTime.bind(this), 1000);
    }
}