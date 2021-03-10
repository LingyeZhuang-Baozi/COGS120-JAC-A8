'use strict';

/*
 * Require database.
 */
var data = require('../JSON/data.json');
/*
profile:
	email, password, name, icon.
classes:
    class, classID,
    readings:
        title, readingID, upload_method, file.
questions:
    question, questionID, class, op, icon, reading, passage,
    comments:
        comment, questionID, commentID, user, icon.
*/

/*
 * Get forum page.
 */
exports.view = function(req, res){
	console.log (data.questions);  // debug msg
	res.render('forum', data);
};

/*
 * Get forum → ask question page.
 */
exports.question = function(req, res){
	console.log ("inputting new question");  // debug msg

	/* Get and set default class and reading info */
	var ID = -1;  // initialize variable
	if (req.query.ID) {  // [classID, readingID]
		var ID = req.query.classID;
		/*var classID = ID[0];
		var readingID = ID[1];
		ID = {
			"classID": classID,
			"readingID": readingID
		}*/
	}
	console.log({"ID": ID, "data": data});
	res.render('forum_question', {"ID": ID, "data": data});  // for setting default
};

/*
 * Posted question and comments page.
 */
exports.viewPost = function(req, res){
	var questionID = req.query.ID;
	var questionIndex = questionID - 1;
	var question_data = data.questions[questionIndex];
	console.log (question_data);
	res.render('forum_post', question_data);
};

/*
 * Upload new question.
 */
exports.uploading = function(req, res){
	console.log("question uploading");  // debug msgs
	console.log (newQuestion);

	/* Construct the question's JSON object */
	var question = req.query.question;
	//var questionID = Object.keys(data.questions).length + 1;
	var questionID = data.questions.length + 1;
	var className = req.query.className;
	var op = data.profile.name;
	var icon = data.profile.icon;
	var readingName = req.query.readingName;
	var passage = "[no passage attatched]";
	if (req.query.passage) {
		passage = req.query.passage;
	}
	//JSONObject person =  jsonArray.getJSONObject(0).getJSONObject("person");
	//person.put("name", "Sammie");

	/* Post object for forum. */
	var newQuestion = {
		"question": question,
		"questionID": questionID,
		"class": className,
		"op": op,
		"icon": icon,
		"reading": readingName,
		"passage": passage,
		"comments": [""]  // ignore empty comments when looping
	};

	/* Push question to database. */
	data.questions.push(newQuestion);
	res.render('forum', data);
};

/*
 * Comment.
 */
exports.commenting = function(req, res){
	console.log("comment submitted");  // debug message
	/* Construct the comment's JSON object */
	var commentText = req.query.commentText;
	var questionID = req.query.questionID;
	var commentID = data.questions[questionID-1].comments.length + 1;
	var name = "";
	var icon = "📕";
	if (req.query.showname == "anonymous") {
		if (Math.random() <= 0.25) {
			icon = "📕";
		} else if (Math.random() <= 0.5) {
			icon = "📗";
		} else if (Math.random() <= 0.75) {
			icon = "📘";
		} else {
			icon = "📙";
		}
	} else {
		name = data.profile.name;
		icon = data.profile.icon;
	}
	var commentPost = {
			"comment": commentText,
			"questionID": questionID,
			"commentID": commentID,
			"user": name,
			"icon": icon
	};

	/* Push comment to database. */
	data.questions[questionID-1].comments.push(commentPost);
	res.render('forum_post', data.questions[questionID-1]);  // update data
};