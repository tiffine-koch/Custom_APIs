'use strict';

var http = require('http');
var moment = require('moment');
var fs = require('fs');
var md5 = require('md5');
// var util = require('./util');

const PORT = 3000;

//cade's suggestion for cross-origin solution
var server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);

    var urlParts = req.url.match(/[^/]+/g);

    if(urlParts) {
      var path = urlParts.shift();
      switch(path) {
        case 'email':
          var data = {};
          var email = urlParts[0];
          var emailHash = md5(email);
          data.url = ('http://www.gravatar.com/avatar/' + emailHash + '\n');
          res.write(JSON.stringify(data));
          console.log(parseInt(emailHash));
          break;

        case 'square':
          var num = parseInt(urlParts[0]);
          var square = Math.pow(num, 2);
          square = square.toString();
          res.write(square);
          break;

        case 'sum':
          var sum = urlParts.reduce(function(sum, num) {
              return sum + parseInt(num);
          }, 0);
          sum = sum.toString();
          console.log(sum.toString());
          res.write(sum);
          break;

        case 'sentence':
          var sentence = decodeURI(urlParts[0]);
          var statsObj = {}
          console.log('sentence:', sentence);
          res.write( JSON.stringify(statsObj) );
          var letterMatch = sentence.match(/[a-z]/ig) || [];
          stats.letterCount = letterMatch.length;
          stats.wordCount = sentence.split(' ').length;
          stats.avgWordCount = stats.letterCount / stats.wordCount;
          var data = JSON.stringify(data);
          res.write(data);

        case 'bday':
          // var timestamp = Date.now();
          // res.write(timestamp + '\n');
          var bday = urlParts;
          var month = bday[0];
          var day = bday[1];
          var year = bday[2];
          var date = year + month + day;
          var bdayObj = {};
          bdayObj.date = moment(date, 'L');
          bdayObj = JSON.stringify(bdayObj);
          res.write(bdayObj)
          break;

        }
      }

    res.end(); //hang up the phone
});

server.listen(PORT, function(err) {
  console.log(`Server listening on port ${PORT}`);
});

// curl -X POST localhost:3000/square

// case 'bday':
//   // var timestamp = Date.now();
//   // res.write(timestamp + '\n');
//   var birthday = urlParts;
//   var month = birthday[0];
//   var day = birthday[1];
//   var year = birthday[2];
//   var dateString = year + month + day;
//   var bdayObj = {};
//   var date = moment(dateString, 'YYYY/MM/DD');
//   var month = date.format('MMMM');
//   var day = date.format('D');
//   var year = date.format('YYYY');
//   var dayName = date.format('dddd');
//   var formatted = dayName + ", " + month + " " + day + ", " + year;
//   dateObj.date = formatted;
//   bdayObj = JSON.stringify(bdayObj);
//   res.write(bdayObj)
//   break;
//
// }
// }