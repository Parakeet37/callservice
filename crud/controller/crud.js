var mongoose = require('mongoose');
var Call = mongoose.model('Call');

module.exports.createCalls = (calls) => {
    return Call.insertMany(calls).then(docs=>{
        return docs ;
    }).catch((err)=>{
        return err;
    });
};

module.exports.deleteCall = (id) => {
    return Call.deleteOne({'_id': id}).exec();
};

//more CRUD operations can be implemented
