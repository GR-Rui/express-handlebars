var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var basketballPlayers = [
    {name: 'Lebron James', team: 'the Heat'},
    {name: 'Kevin Durant', team: 'the Thunder'},
    {name: 'Kobe Jordan',  team: 'the Lakers'}
  ];

  var days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  var data = {
    basketballPlayers: basketballPlayers,
    days: days
  };

  res.render('loop', data);
});

module.exports = router;
