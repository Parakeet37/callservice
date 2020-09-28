var express = require('express');
var router = express.Router();
var Calls = require('../controller/calls');

/*
THE GET REQUEST'S BODY HAS THE FOLLOWING STRUCTURE
{
  filter: {...} -> filter by type (inbound or outbound) -> default no filter
  offset: <number> -> starting point -> default 0
  limit: <number> -> limit of calls to fetch -> default 10
}
*/

router.get('/', function(req, res, next) {
  var offset = 0;
  var limit = 10;
  var filter = {};
  if(req.query.offset) offset = new Number(req.query.offset);
  if(req.query.limit) limit = new Number(req.query.limit);
  if(req.query.filter) filter = {"type": req.query.filter};
  Calls.getCalls(offset, limit, filter).then(result=>{
    res.send(result);
  });
});

module.exports = router;
