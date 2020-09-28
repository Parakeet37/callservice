var mongoose = require('mongoose');

var Schema = mongoose.Schema;

function dateValidator(end) {
    return end>this.start;
}

function cellVerification(number) {
    return number.toString().length == 9;
}

var CallSchema = new Schema({
    caller: {type: Number, required: true, validate: [cellVerification, 'Invalid caller number']},
    callee: {type: Number, required: true, validate: [cellVerification, 'Invalid callee number']},
    start: {type: Date, required: true},
    end: {type: Date, required: true, validate: [dateValidator, 'End Date should be after the Start Date']},
    type: {type: String, enum: ['Inbound', 'Outbound'], required: true}
});

module.exports = mongoose.model('Call', CallSchema, 'calls');

