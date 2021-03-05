/*
 * GET home page.
 */
var data = require('../JSON/data.json');
exports.view = function(req, res){
  console.log (data.classes);  // debug msg
  res.render("index", data);
};