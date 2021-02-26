/*
 * GET home page.
 */
var class_data = require('../JSON/library_data.json');
exports.view = function(req, res){
  console.log (class_data);  // debug msg
  res.render("index", class_data);
};