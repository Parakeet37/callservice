var express = require('express');
var router = express.Router();
var Statistics = require('../controller/statistics');

router.get('/', function(req, res, next) {
  Statistics.getStatistics().then((result)=>{
    res.send(result);
  });
});

router.get('/callsCount', function(req, res, next) {
  Statistics.countCalls(req.query.filter).then((result)=>{
    res.send(result.toString());
  }); 
});
module.exports = router;
