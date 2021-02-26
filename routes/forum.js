/* Database. */
var forum_data = require('../JSON/forum_data.json');
var library_data = require('../JSON/library_data.json');
var post_data = require("../JSON/post_data.json");

/*
 * Get forum page.
 */
exports.view = function(req, res){
	console.log (forum_data);  // debug msg
	res.render('forum', forum_data);
};

/*
 * Get forum → ask question page.
 */
exports.question = function(req, res){
	res.render('forum_question', library_data);
};

/*
 * Posted question and comments page.
 */
exports.viewPost = function(req, res){
	res.render('forum_post', post_data);
};

/*
 * Upload new question.
 */
exports.uploading = function(req, res){
	console.log("question uploading");  // debug message

	/* Construct the question's JSON object */
	var question = req.query.question;
	var className = req.query.className;
	var readingName = req.query.readingName;
	var passage = "[no passage attatched]";
	if (req.query.passage) {
		passage = req.query.passage;
	}
	var name = "me";

	/* Question object for post. */
	var questionPost = {
			"question": question,
			"class": className,
			"reading": readingName,
			"passage": passage,
			"name": name
	};
	/* Post object for forum. */
	var postDetail = {
		"title": question,
		"class": className,
		"op": "😊me"
    }

	/* Push question to database. */
	forum_data.questions.push(postDetail);
	console.log (forum_data);  // debug msg
	res.render('forum_post', questionPost);  // update data
};

/*
 * Comment.
 */
exports.commenting = function(req, res){
	console.log("comment submitted");  // debug message

	/* Construct the comment's JSON object */
	var commentText = req.query.comment;
	var name = "anonymous";
	if (name.length != 0) {
		name = req.query.name;
	}
	var commentPost = {
			"comment": commentText,
			"name": name
	};

	/* Push comment to database. */
	post_data.commentPost.push(commentPost);
	res.render('forum_post', post_data);  // update data
};