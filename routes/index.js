var express = require('express');
var router = express.Router();


/* GET home page. */
/* old part
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
