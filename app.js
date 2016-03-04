'use strict';

var http = require('http');
var moment = require('moment');
var fs = require('fs');
var md5 = require('md5');

const PORT = 8000;

//cade's suggestion for cross-origin solution
//fs.read - read from one server
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
          console.log(square.toString());
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
          var sentence = decodeURI(urlParts[0]).toLowerCase();
          var stats = {}
          console.log('sentence:', sentence);
            var letterMatch = sentence.match(/[a-z]/ig) || [];
            stats.letterCount = letterMatch.length;
            stats.wordCount = sentence.split(' ').length;
            stats.avgWordCount = stats.letterCount / stats.wordCount;
          res.write( JSON.stringify(stats) );

        case 'bday':
          var bday = urlParts;
          var month = bday[0];
          var day = bday[1];
          var year = bday[2];
          var date = year + month + day;
          var bdayObj = {};
          var date = moment(date, 'YYYY/MM/DD');
          var month = date.format('MMMM');
          var day = date.format('D');
          var year = date.format('YYYY');
          var dayName = date.format('dddd');
          var formatted = dayName + ", " + month + " " + day + ", " + year;
          bdayObj.date = formatted;
          bdayObj = JSON.stringify(bdayObj);
          console.log('bdayObj', bdayObj);
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
