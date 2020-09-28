var express = require('express');
var router = express.Router();
var Crud = require('../controller/crud');

/* 
############################################
THE CALLS CREATION POST REQUEST BODY HAS THE FOLLOWING STRUCTURE

{
    calls: [
        {...},
        ...
    ]
}
############################################
*/
router.post('/create', function(req, res, next) {
  Crud.createCalls(req.body.calls).then(calls=>{
    res.send(calls);
  });
});

//delete calls
router.post('/delete', function(req, res, next) {
  Crud.deleteCall(req.body.id).then(del=>{
    res.send(del);
  });
});

module.exports = router;
