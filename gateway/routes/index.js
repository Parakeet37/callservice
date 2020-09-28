var express = require('express');
var router = express.Router();
var axios = require('axios');
var cors = require('cors');

/* GET all calls - with pagination and filter by type */
router.get('/', cors(), function(req, res, next) {
  axios.get('http://calls:4000/', {
    params: req.query
  }).then(response => {
    res.send(response.data);
  });
});

/* GET statistics about the stored calls */
router.get('/statistics', cors(), function(req, res, next) {
  axios.get('http://statistics:5000/')
  .then(response => {
    res.send(response.data);
  });
});

/* POST to register one or more new calls */
router.post('/create', cors(), function(req, res, next) {
  axios.post('http://crud:6000/create', {
    calls: req.body.calls
  }).then(response => {
    res.send(response.data);
  });
});

/* POST to delete a call */
router.post('/delete', cors(), function(req, res, next) {
  axios.post('http://crud:6000/delete', {
    id: req.body.id
  }).then(response => {
    res.send(response.data);
  });
});

router.get('/callsCount', cors(), function(req, res, next) {
  axios.get('http://statistics:5000/callsCount', {
    params: req.query
  })
  .then(response=>{
    res.send(response.data.toString());
  })
})

module.exports = router;
