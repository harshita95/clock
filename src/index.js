import {AlarmClock} from "./alarmClock";

let clock, time, hoursField, minutesField, messageField, boxField, repeatField, alarmButton;

function formatTime(i) {
    i = parseInt(i, 10);
    return (i < 10) ? ("0" + i) : i;
}

function showTime() {
    let h = formatTime(clock.date.getHours()),
        m = formatTime(clock.date.getMinutes()),
        s = formatTime(clock.date.getSeconds());
    time.innerText = h + ":" + m + ":" + s;

    setTimeout(function () {
        showTime();
    }, 1000);
};

function ringAlarm() {
    let h = formatTime(clock.date.getHours()),
        m = formatTime(clock.date.getMinutes()),
        message;
    message = clock.getAlarm(h, m);
    if (message) {
        window.alert(message);
    }
    setTimeout(function () {
        ringAlarm();
    }, 60000);
};


function validateAlarm(hours, minutes) {
    if (isInt(hours) && isInt(minutes)) {
        return true;
    }
    console.log("Invalid Alarm");
    return false;
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function saveAlarm() {
    let hours, minutes, message, repeat;
    hours = hoursField.value;
    minutes = minutesField.value;
    if (validateAlarm(hours, minutes)) {
        hours = formatTime(hours);
        minutes = formatTime(minutes);

        message = messageField.value;
        repeat = (repeatField.checked) ? true : false;
        clock.setAlarm(hours, minutes, message, repeat);
        displayAlarms();
    }
};

function displayAlarms() {
    var html = "<table border='1' class='alarms'>", i;
    html += "<tr>";
    html += "<th>Hours</th>";
    html += "<th>Minutes</th>";
    html += "<th>Message</th>";
    html += "</tr>";
    html += "<tr>";
    for (var key of clock.alarms.keys()) {
        let alarm = clock.alarms.get(key);
        html += "<td>" + alarm.hours + "</td>";
        html += "<td>" + alarm.minutes + "</td>";
        html += "<td>" + alarm.message + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    boxField.innerHTML = html;
};

function onLoad() {

    clock = new AlarmClock(new Date()),
        time = document.querySelector('.time'),
        hoursField = document.querySelector(".hours"),
        minutesField = document.querySelector(".minutes"),
        messageField = document.querySelector(".message"),
        repeatField = document.querySelector(".repeat"),
        alarmButton = document.querySelector(".setAlarm"),
        boxField = document.querySelector(".box");

    clock.updateTime();
    alarmButton.addEventListener('click', saveAlarm);
    showTime();
    ringAlarm();

}

window.addEventListener('load', onLoad, false);