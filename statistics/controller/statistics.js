var mongoose = require('mongoose');
var Call = mongoose.model('Call');

/*
[
    {
        "date": <yyyy-mm-dd>,
        "duration": <number> - in minutes,
        "callsCount": <number>,
        "inboundCallsCount": <number>,
        "outboundCallsCount": <number>,
        "callsCost": <number>
    },
    ...
]
*/
module.exports.countCalls = (type) => {
    var filter = {}
    if (type) {
        filter = {'type': type}
    }
    return Call.countDocuments(filter).exec();
}

module.exports.getStatistics = ()=>{
    return Call.aggregate([
        {
            "$group": {
                "_id": { 
                    "date": {
                        "$dateToString": {"format": "%Y-%m-%d", "date": "$start"}
                    }
                },
                "duration": {
                    "$sum": {
                        "$divide": [{"$subtract": ["$end", "$start"]}, 1000*60] //converting milliseconds to minutes
                    }
                },
                "callsCount": {"$sum": 1},
                "inboundCallsCount": {
                    "$sum": {
                        "$cond": [
                            {"$eq": ["$type", "Inbound"]},
                            1,
                            0
                        ]
                    }
                },
                "outboundCallsCount": {
                    "$sum": {
                        "$cond": [
                            {"$eq": ["$type", "Outbound"]},
                            1,
                            0
                        ]
                    }
                },
                "callsCost": {
                    "$sum": {
                        "$cond": [
                            {"$eq": ["$type", "Outbound"]}, //if type==outbound
                            {"$cond": [
                                {"$gt": [{"$subtract": [{"$divide": [{"$subtract": ["$end", "$start"]}, 1000*60]}, 5]}, 0]}, //if duration > 5 mins
                                {"$sum": [{"$multiply": [{"$subtract": [{"$divide": [{"$subtract": ["$end", "$start"]}, 1000*60]}, 5]}, 0.05]}, 0.10]}, //sum the first 5 minutes of call * 10 cents (50 cents) and the remaining minutes * 5 cents
                                0.1 //else sum 10 cents
                            ]},
                            0 //else callsCost doesn't increment
                        ]
                    }
                }
            }
        }, 
        {
            "$project": {
                "date": "$_id.date", "duration": "$duration", "callsCount": "$callsCount", "inboundCallsCount": "$inboundCallsCount", "outboundCallsCount": "$outboundCallsCount", "callsCost": "$callsCost", "_id": 0
            } 
        }
    ]).exec();
};
