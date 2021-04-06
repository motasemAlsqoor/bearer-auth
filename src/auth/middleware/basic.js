'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {//headers.authorization must be provided in the request
    res.status(403).send('Invalid Login');
  }
  //ex : req.headers.authorization = Basic dGVzdDp0ZXN0;
  let basic = req.headers.authorization.split(' ').pop();
  //ex : base64.decode(basic) = test:test
  //array destructure : now user and pass are seperated variables
  let [user, pass] = base64.decode(basic).split(':');
  try {
    //authenticatebasic static function
    req.user = await User.authenticateBasic(user,pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
  
}