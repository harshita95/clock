import {Clock} from "./clock";
import {Alarm} from "./alarm";


export class AlarmClock extends Clock {
    constructor(date) {
        super(date);
        this.alarms = new Map();
    }

    setAlarm(hours, minutes, message, repeat) {
        let newAlarm, that = this;

        newAlarm = new Alarm(hours, minutes, message, repeat);
        let key = hours + minutes;
        this.alarms.set(key, newAlarm);
    }

    getAlarm(hours, minutes) {
        let key = hours + minutes;
        if(this.alarms.has(key)) {
            let alarm = this.alarms.get(key);
            if (alarm.repeat === false) {
                this.alarms.delete(key);
            }
            return alarm.message;
        }
        return false;
    }
}