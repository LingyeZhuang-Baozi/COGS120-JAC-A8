/*
 * GET class library page.
 */
var data = require('../JSON/data.json');
exports.viewReadings = function(req, res){
  var classID = req.query.ID;
  var reading_data;
  for (var i = 0; i < data.classes.length; i++) {
  	if (data.classes[i].classID == classID) {
  	  reading_data = data.classes[i];
  	}
  }
  console.log (reading_data);  // debug msg
  res.render("library", reading_data);
};