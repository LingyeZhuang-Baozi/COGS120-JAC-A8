
/*
 * Get upload page.
 */
var data = require('../JSON/data.json');
exports.view = function(req, res){
  res.render('upload', data);
};

exports.url = function(req, res){
  res.render('upload_url');
};

exports.scan = function(req, res){
  res.render('upload_scan');
};

exports.file = function(req, res){
  res.render('upload_file');
};

exports.success = function(req, res){
  res.render('upload_success');
};
