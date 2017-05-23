"use strict";
// let Date = require('date');
const express = require('express');
const router = express.Router();


let mockOnline = [
  {
    id: '1',
    name: 'John Dove 1',
    task: 'venues',
    since: '13132156468841'
  }, {
    id: '2',
    name: 'John Dove 2',
    task: 'venues',
    since: '13132156468842'
  }, {
    id: '3',
    name: 'John Dove 3',
    task: 'venues',
    since: '13132156468843'
  }, {
    id: '4',
    name: 'John Dove 5',
    task: 'venues',
    since: '13132156468844'
  }, {
    id: '5',
    name: 'John Dove 5',
    task: 'venues',
    since: '13132156468845'
  },
];

router.get('/', (req, res, next) => {
  res.send(mockOnline);
});

module.exports = router;

/*
 [{
 (id): string;
 name :  Lname, fname = string
 task
 since
 }]
 */
