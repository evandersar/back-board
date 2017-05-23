"use strict";
const express = require('express');
const router = express.Router();

//todo refactor db import
const sqlite3 = require('sqlite3').verbose();
const dbFile = './workforce.sqlite';
const db = new sqlite3.Database(dbFile);

let allData = {
  users: null
};

router.get('/', function (req, res, next) {

  db.all(`SELECT user.id, user.first_name, user.last_name, user.team, team.title as team_title 
          FROM user 
          JOIN team 
          ON user.team = team.id 
          WHERE (user.role = 3 AND user.active = 1) 
          ORDER BY user.id`, function (err, rows) {
    //console.log(rows);
    if (err) {
      console.log(err);
      res.status(500);
    }
    else if (!rows) {
      console.log('No active employees in DB!');
      res.status(202).send({success: false, msg: 'No active employees in DB!'});
    }
    else {
      //console.log(row);
      //res.json({success: true, data: row});
      allData.users = rows;
      //console.log('allData after select', allData);

      db.all(`SELECT skill.user_id, task.id as skill_id, task.title as task_title, spec.id as spec_id 
              FROM task 
              JOIN skill ON task.id = skill.task_id 
              JOIN spec ON task.spec_id = spec.id
              ORDER BY skill.user_id`, function (err, rows) {

        //console.log(rows);

        if (err) {
          console.log(err);
          res.status(500);
        }
        else if (rows.length == 0) {
          console.log('No skills in active employees profiles!');
          allData.skills = [];
          //console.log('allData while no skills', allData);
          res.status(202).send({
            success: false,
            msg: ' There are no employee with any working skills, please contact SV or administrator!',
            allData: allData
          });
          res.end();
        }
        else {

          for (let user of allData.users) {
            user['skills'] = [];
            user['skillsMap'] = {};
            for (let skill of rows) {
              if (user.id == skill.user_id) {
                user.skills.push(skill);
                user.skillsMap[skill.skill_id] = true;
              }
            }
          }

          //console.log('allData before response', allData);
          res.json({success: true, allData: allData});
          res.end();
          allData = {
            users: null
          };
        }

      });
    }
  });

});

module.exports = router;
