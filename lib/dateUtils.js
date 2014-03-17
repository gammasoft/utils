'use strict';

module.exports.unixTime = function(date, onlyDate) {
    if(typeof date === 'undefined') {
        date = new Date();
    }

    if(typeof onlyDate === 'undefined') {
        onlyDate = false;
    }

    if(onlyDate) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    } else {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
};