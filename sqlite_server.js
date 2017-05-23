// Require the sqlite3 library. Use the 'verbose()'-flag to show stack traces while running queries.
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

// middleware для обработки данных в формате JSON 
var jsonParser = bodyParser.json();
var textParser = bodyParser.text(); 


// Setup database:
var dbFile = './workforce.sqlite';
//var dbExists = fs.existsSync(dbFile);
//console.log(dbExists);

// Initialize the database:
var db = new sqlite3.Database(dbFile);

var express = require('express');
var restapi = express();

restapi.use(cors());

restapi.use(jsonParser); 
restapi.use(textParser);

// middleware для обработки тела запроса в кодировке urlencoded 
restapi.use(bodyParser.urlencoded({ extended: true })); 

var secret = 'some_Very_SECRET_secret';

restapi.post('/authenticate', function(req, res){

	//console.log(req.body);

	db.get("SELECT id, first_name, last_name, role FROM user WHERE email = ? AND password = ?", req.body.mail, req.body.password, function(err, row) {
        //console.log(row);
		if (err){
            console.log(err);
            res.status(500);
        }
        else if(!row){
        	console.log('Wrong email/password or no such user!');
        	res.status(202).send({success: false, msg: 'Wrong email/password or no such user!'});
        }
        else {
        	//console.log(row.id, row.first_name, row.last_name, row.role);

        	var payload = row.id +";"+ row.role;

        	console.log("payload = ", payload);
            
            var token = jwt.encode(payload, secret);
            res.json({success: true, token: token, role: row.role});
        }
        res.end();
	});

});

restapi.post('/skill', function(req, res){

    //console.log(req.body);

    var user_id = jwt.decode(req.body.token, secret).split(';')[0];

    console.log('user_id = ', user_id);

    db.all("SELECT task.title, task.id FROM task JOIN skill WHERE task.id = skill.task_id AND skill.user_id = ?", user_id, function(err, rows) {

        /*rows.forEach(function (row) {  
            console.log(row);  
        }) */ 

        //console.log(rows);

        if (err){
            console.log(err);
            res.status(500);
        }
        else if(rows.length == 0){
            console.log('No skills in employee profile!');
            res.status(202).send({success: false, msg: 'You don`t have any skills, please contact your SV or administrator!'});
        }
        else {
            res.json({success: true, skills: rows});
        }
        res.end();
    });

});

restapi.post('/log', function(req, res){

    //console.log(req.body);

    var user_id = jwt.decode(req.body.token, secret).split(';')[0];
    var task_id = req.body.task;
    var created = Date.now();

    //console.log('user_id = ', user_id);
    //console.log('task_id = ', task_id);
    //console.log('created = ', created);

    db.run("INSERT INTO log VALUES (NULL, ?, ?, ?, NULL)", user_id, task_id, created, function(err) {

        if (err){
            console.log(err);
            console.log('Cant insert data!');
            res.status(202).send({success: false, msg: 'Status logging failed!'});
        }
        else {
            console.log('Data inserted!');

            db.run("UPDATE user SET online = 1 WHERE id = ?", user_id, function(err) {
                if (err){
                    console.log(err);
                    console.log('Cant set online status for user!');
                }
                else {
                    console.log('User is online!');
                }
            });

            res.json({success: true, msg: 'Successful status logging!'});
        }
        res.end();
    });

});

restapi.get('/status', function(req, res){

    //console.log(req.body);

    db.all(`SELECT log.user_id, log.task_id, MAX(log.created_at) AS created_at, task.title AS status, user.first_name, user.last_name, user.team
            FROM log 
            JOIN task ON log.task_id = task.id 
            JOIN user ON log.user_id = user.id
            WHERE user.online = 1 
            GROUP BY log.user_id`, function(err, rows) {

        /*rows.forEach(function (row) {  
            console.log(row);  
        }) */ 

        //console.log(rows);

        if (err){
            console.log(err);
            res.status(500);
        }
        else if(rows.length == 0){
            console.log('No users online!');
            res.status(202).send({success: false, msg: 'No users online!'});
        }
        else {
            res.json({success: true, skills: rows});
        }
        res.end();
    });

});

restapi.get('/users', function(req, res){

    //console.log(req.body);

    db.all(`SELECT id, first_name, last_name FROM user WHERE role = 3`, function(err, rows) {

        /*rows.forEach(function (row) {  
            console.log(row);  
        }) */ 

        //console.log(rows);

        if (err){
            console.log(err);
            res.status(500);
        }
        else if(rows.length == 0){
            console.log('No users in database!');
            res.status(202).send({success: false, msg: 'No users in database!'});
        }
        else {
            res.json({success: true, users: rows});
        }
        res.end();
    });

});

restapi.post('/offline', function(req, res){

    //console.log(req.body);

    var user_id = jwt.decode(req.body.token, secret).split(';')[0];

    console.log('user_id = ', user_id);

    db.run("UPDATE user SET online = 0 WHERE id = ?", user_id, function(err){

        if (err){
            console.log(err);
            console.log('Cant set offline status for user!');
            res.json({success: false, msg: 'Cant set offline status for user!'});
        }
        else {
            res.json({success: true, msg: 'Now user is offline!'});
        }
        res.end();
    });

});

restapi.listen(3333, function(){
	console.log('server is running on 3333 port');
});