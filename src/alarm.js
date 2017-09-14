export class Alarm {
    constructor (hours, minutes, message, repeat) {
        this._hours = hours;
        this._minutes = minutes;
        this._message = message || "Wake Up";
        this._repeat = repeat;
    }

    get hours() {
        return this._hours;
    }
    get minutes() {
        return this._minutes;
    }
    get message() {
        return this._message;
    }
    get repeat() {
        return this._repeat;
    }
}