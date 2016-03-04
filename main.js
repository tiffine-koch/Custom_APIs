'use strict';

$(document).ready(init);

var email, square, sum;

function init() {
  $('#emailClick').on('click', getEmail);
  $('#squareClick').on('click', getSquare);
  $('#sumClick').on('click', getSum);
  $('#sentClick').on('click', getSent);
  $('#bdayClick').on('click', getBday);
}


function getEmail() {
  console.log('email click');
  var emailUrl = $('#email').val();
  var location = "http://localhost3000/gravatar/"
  var url = location + emailUrl;

  $.ajax({
    url: url,
    type: "GET",
    succcess: function(data) {
      data = JSON.parse(data);
      var image = data.url;
      var $image = $("<img>").attr("src", image).addClass("image");
      $image.appendTo($("#gravatar"));
    }
  })
}

function getSquare() {
  var squareUrl = $('#square').val();
  var url = squareUrl;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      $("#squareOutput").html(data);

    }
  })
}

function getSum() {
  var sumUrl = $('#sum').val();
  var url = sumUrl;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      $("#sumOutput").html(data);
    }
  })
}

function getSent() {
  var sentUrl = $("#sent").val()
  var location = "http://localhost:3000/sentence/"
  var url = location + sentUrl;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      $("#wordOutput").html("Total words: " + data.wordCount)
      $("#letterOuput").html("Total letters: " + data.letterCount)
      $("#avgOutput").html("Average words: " + Math.round(data.avgWordCount * 100) / 100)
    }
  })
}

function getBday() {
  var bday = $("#bday").val();
  var location = "http://localhost:3000/birthday/";
  var url = location + bday;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      $("#date").html("Date: " + data.date);
    }
  })
}
