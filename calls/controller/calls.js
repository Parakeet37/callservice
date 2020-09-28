var mongoose = require('mongoose');
var Call = mongoose.model('Call');

/*
Get the calls with pagination, and being able to filter or sort by any of the parameters
*/
module.exports.getCalls = (offset, limit, filter) =>{
    return Call.find(filter)
    .skip(offset)
    .limit(limit)
    .exec();
}